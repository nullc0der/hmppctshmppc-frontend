import { useState, useRef } from 'react'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'

import CoinLogo from 'components/CoinLogo'

import { IPaymentSuccessInfo } from './interfaces'

type PaymentSuccessProps = {
    selectedCurrency: string
    paymentSuccessInfo?: IPaymentSuccessInfo
    setShowStat: () => void
    handleClose: () => void
}

const onClickViewResult = (
    handleClose: () => void,
    setShowStat: () => void
) => {
    setShowStat()
    handleClose()
}

const parseTxIds = (txIds: Array<string>): string => {
    let txIdsString = ''
    for (let i = 0; i < txIds.length; i++) {
        txIdsString += i === 0 ? txIds[i] : ',' + txIds[i]
    }
    return txIdsString
}

const PaymentSuccess = ({
    selectedCurrency,
    paymentSuccessInfo,
    setShowStat,
    handleClose,
}: PaymentSuccessProps) => {
    const [showTxIDCopiedTooltip, setShowTxIDCopiedTooltip] = useState(false)
    const txIDCopiedTooltipTarget = useRef(null)

    return (
        <div className="d-flex flex-column align-items-center">
            <CoinLogo currencyName={selectedCurrency} />
            <span className="mt-3">
                <i className="fa fa-check-circle-o mr-2 success-check-icon" />
                Congratulations Payment Successful!
            </span>
            <div className="alert alert-secondary my-2">
                <span>
                    Tx ID(s): {parseTxIds(paymentSuccessInfo?.tx_ids || [])}
                    <CopyToClipboard
                        text={parseTxIds(paymentSuccessInfo?.tx_ids || [])}
                        onCopy={() => setShowTxIDCopiedTooltip(true)}>
                        <i
                            className="fa fa-clone ml-2 copy-button"
                            title="click to copy"
                            ref={txIDCopiedTooltipTarget}
                        />
                    </CopyToClipboard>
                    <Overlay
                        target={txIDCopiedTooltipTarget.current}
                        show={showTxIDCopiedTooltip}
                        placement="right">
                        {(props) => (
                            <Tooltip id="tx-id-copied-tooltip" {...props}>
                                Tx ID Copied
                            </Tooltip>
                        )}
                    </Overlay>
                </span>
            </div>
            <span>Amount Received: {paymentSuccessInfo?.amount_received}</span>
            <button
                className="btn btn-header-red"
                onClick={() => onClickViewResult(handleClose, setShowStat)}>
                View Results
            </button>
        </div>
    )
}

export default PaymentSuccess
