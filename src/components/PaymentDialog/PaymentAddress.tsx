import { useState, useEffect, useRef } from 'react'

import get from 'lodash/get'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'
import { useMatomo } from '@datapunt/matomo-tracker-react'

import { initiatePayment, checkPaymentStatus } from 'api/payment'
import { setPaymentInfo, getPaymentInfo, setAccessToken } from 'utils/store'
import CURRENCY from 'constants/currency'

import CoinLogo from 'components/CoinLogo'

import { IPaymentSuccessInfo } from './interfaces'

type PaymentAddressProps = {
    selectedCurrency: string
    setCurrentStep: (currentStep: string) => void
    setPaymentSuccessInfo: (paymentSuccessInfo: IPaymentSuccessInfo) => void
}

const PaymentAddress = ({
    selectedCurrency,
    setCurrentStep,
    setPaymentSuccessInfo,
}: PaymentAddressProps) => {
    const [isCheckingPaymentStatus, setIsCheckingPaymentStatus] =
        useState(false)
    const [paymentAddress, setPaymentAddress] = useState('')
    const [paymentAddressFetchError, setPaymentAddressFetchError] =
        useState(false)
    const [
        showPaymentAddressCopiedTooltip,
        setShowPaymentAddressCopiedTooltip,
    ] = useState(false)
    const [showComingSoon, setShowComingSoon] = useState(false)
    const [currencyAmountPerUSD, setCurrencyAmountPerUSD] = useState(0)
    const pollPaymentStatusIntervalID = useRef<number | null>(null)
    const paymentAddressCopiedTooltipTarget = useRef(null)
    const { trackEvent } = useMatomo()

    // NOTE: Should we clear payment info from localstorage if expired ???
    const pollPaymentStatus = () => {
        setIsCheckingPaymentStatus(true)
        const paymentInfo = getPaymentInfo()
        pollPaymentStatusIntervalID.current = window.setInterval(
            () =>
                checkPaymentStatus({ payment_id: paymentInfo.payment_id }).then(
                    (response) => {
                        if (response.ok) {
                            setAccessToken({
                                access_token: get(
                                    response.data,
                                    'access_token',
                                    ''
                                ),
                            })
                            setPaymentSuccessInfo({
                                tx_ids: get(response.data, 'tx_ids', []),
                                amount_received: get(
                                    response.data,
                                    'amount_received',
                                    ''
                                ),
                            })
                            setCurrentStep('paymentSuccess')
                            trackEvent({
                                category: 'Payment Dialog',
                                action: 'Payment Success',
                                name: selectedCurrency,
                            })
                        }
                    }
                ),
            5000
        )
    }

    const onClickBack = () => {
        setCurrentStep('currencySelect')
    }

    useEffect(() => {
        if (['polkadot', 'ada', 'ethereum'].includes(selectedCurrency)) {
            setShowComingSoon(true)
        } else {
            initiatePayment({ currency: selectedCurrency }).then((response) => {
                if (response.ok) {
                    setPaymentAddress(get(response.data, 'wallet_address', ''))
                    setPaymentInfo({
                        payment_id: get(response.data, 'payment_id', ''),
                        payment_address: get(
                            response.data,
                            'wallet_address',
                            ''
                        ),
                        currency_name: selectedCurrency,
                    })
                    setCurrencyAmountPerUSD(
                        get(response.data, 'per_usd_amount', 0)
                    )
                } else {
                    setPaymentAddressFetchError(true)
                    trackEvent({
                        category: 'Payment Dialog',
                        action: 'Payment Address Generation Error',
                        name: selectedCurrency,
                    })
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCurrency])

    useEffect(
        () => () =>
            window.clearInterval(pollPaymentStatusIntervalID.current || 0),
        []
    )

    useEffect(() => {
        if (showPaymentAddressCopiedTooltip) {
            const timeOut = window.setTimeout(
                () => setShowPaymentAddressCopiedTooltip(false),
                3000
            )
            return () => window.clearTimeout(timeOut)
        }
    }, [showPaymentAddressCopiedTooltip])

    return (
        <div className="d-flex flex-column align-items-center justify-content-center payment-address-wrapper">
            <CoinLogo currencyName={selectedCurrency} />
            {!showComingSoon ? (
                <>
                    {currencyAmountPerUSD ? (
                        <span className="mt-3">
                            Suggested minimum amount of {selectedCurrency} to
                            send 
                            {currencyAmountPerUSD}
                            {CURRENCY[selectedCurrency]['ticker']} = $1USD
                        </span>
                    ) : (
                        <span className="mt-3">
                            Send a minimum crypto payment to the{' '}
                            {selectedCurrency} address below.
                        </span>
                    )}
                    <div className="alert alert-secondary mt-2">
                        {!paymentAddressFetchError ? (
                            paymentAddress ? (
                                <span>
                                    {paymentAddress}
                                    <CopyToClipboard
                                        text={paymentAddress}
                                        onCopy={() =>
                                            setShowPaymentAddressCopiedTooltip(
                                                true
                                            )
                                        }>
                                        <i
                                            className="fa fa-clone ml-2 copy-button"
                                            title="click to copy"
                                            ref={
                                                paymentAddressCopiedTooltipTarget
                                            }
                                        />
                                    </CopyToClipboard>
                                    <Overlay
                                        target={
                                            paymentAddressCopiedTooltipTarget.current
                                        }
                                        show={showPaymentAddressCopiedTooltip}
                                        placement="right">
                                        {(props) => (
                                            <Tooltip
                                                id="payment-address-copied-tooltip"
                                                {...props}>
                                                Address Copied
                                            </Tooltip>
                                        )}
                                    </Overlay>
                                </span>
                            ) : (
                                <span>
                                    Fetching payment address{' '}
                                    <i className="fa fa-spin fa-spinner ml-2" />
                                </span>
                            )
                        ) : (
                            <span>
                                There was an issue fetching a payment address,
                                please try later
                            </span>
                        )}
                    </div>
                    {!!paymentAddress && (
                        <button
                            className="btn btn-success"
                            onClick={pollPaymentStatus}
                            disabled={isCheckingPaymentStatus}>
                            {!isCheckingPaymentStatus ? (
                                "Click here once you're done sending"
                            ) : (
                                <>
                                    Checking payment confirmation
                                    <i className="fa fa-spinner fa-spin ml-2" />
                                </>
                            )}
                        </button>
                    )}
                </>
            ) : (
                <span className="mt-4">
                    This{' '}
                    {selectedCurrency === 'ethereum' ||
                    selectedCurrency === 'polkadot' ||
                    selectedCurrency === 'ada'
                        ? 'token'
                        : 'coin'}{' '}
                    is syncing currently, it will be available for payment soon
                </span>
            )}
            <button className="btn btn-link" onClick={onClickBack}>
                Go Back
            </button>
        </div>
    )
}

export default PaymentAddress
