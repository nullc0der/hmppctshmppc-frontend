import { useEffect, useState } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'

import PaymentDialog from 'components/PaymentDialog'

import { getPaymentInfo, removePaymentInfo, setAccessToken } from 'utils/store'
import { checkPaymentStatus } from 'api/payment'

import { IPaymentSuccessInfo } from 'components/PaymentDialog/interfaces'

import HeaderBG from 'assets/img/Header-BG.jpg'
import s from './Header.module.scss'

type HeaderProps = {
    showPaymentDialog: boolean
    handlePaymentDialogShow: () => void
    handlePaymentDialogClose: () => void
    setShowStat: () => void
    className?: string
}

const Header = ({
    className,
    showPaymentDialog,
    handlePaymentDialogClose,
    handlePaymentDialogShow,
    setShowStat,
}: HeaderProps) => {
    const [defaultCurrentStep, setDefaultCurrentStep] =
        useState('currencySelect')
    const [defaultSelectedCurrency, setDefaultSelectedCurrency] = useState('')
    const [defaultPaymentSuccessInfo, setDefaultPaymentSuccessInfo] = useState<
        IPaymentSuccessInfo | undefined
    >(undefined)
    const cx: string = classnames(s.container, className)

    useEffect(() => {
        const paymentInfo = getPaymentInfo()
        if (paymentInfo.payment_id) {
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
                        setDefaultPaymentSuccessInfo({
                            tx_ids: get(response.data, 'tx_ids', []),
                            amount_received: get(
                                response.data,
                                'amount_received',
                                ''
                            ),
                        })
                        setDefaultCurrentStep('paymentSuccess')
                        setDefaultSelectedCurrency(paymentInfo.currency_name)
                        setShowStat()
                    } else {
                        if (response.status === 404) {
                            removePaymentInfo()
                        }
                    }
                }
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={cx} style={{ backgroundImage: `url(${HeaderBG})` }}>
            <p>Want to know how many people paid crypto to see</p>
            <p>how many people paid crypto?</p>
            <button
                className="btn btn-small btn-header-red"
                onClick={handlePaymentDialogShow}>
                {defaultCurrentStep === 'paymentSuccess'
                    ? "Show previous payment's tx id"
                    : 'Pay Crypto'}
            </button>
            <PaymentDialog
                show={showPaymentDialog}
                handleClose={handlePaymentDialogClose}
                setShowStat={setShowStat}
                defaultCurrentStep={defaultCurrentStep}
                defaultSelectedCurrency={defaultSelectedCurrency}
                defaultPaymentSuccessInfo={defaultPaymentSuccessInfo}
            />
        </div>
    )
}

export default Header
