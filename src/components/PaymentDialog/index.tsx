import React, { useState } from 'react'
import classnames from 'classnames'

import ModalDialog from 'components/ModalDialog'

import EthereumLogo from 'assets/img/ethereum-eth-logo.svg'
import PolkadotLogo from 'assets/img/polkadot-new-dot-logo.svg'
import AdaLogo from 'assets/img/cardano-ada-logo.svg'
import BitcoinLogo from 'assets/img/bitcoin-btc-logo.svg'
import DogecoinLogo from 'assets/img/dogecoin-doge-logo.svg'
import MoneroLogo from 'assets/img/monero-xmr-logo.svg'

import s from './PaymentDialog.module.scss'

type PaymentDialogProps = {
    show: boolean
    handleClose: () => void
    setShowStat: () => void
    className?: string
}

const renderCoinlogo = (selectedCurrency: string) => {
    switch (selectedCurrency) {
        case 'ethereum':
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Ethereum Logo"
                    src={EthereumLogo}
                />
            )
        case 'polkadot':
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Polkadot Logo"
                    src={PolkadotLogo}
                />
            )
        case 'ada':
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Ada Logo"
                    src={AdaLogo}
                />
            )
        case 'bitcoin':
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Bitcoin Logo"
                    src={BitcoinLogo}
                />
            )
        case 'dogecoin':
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Dogecoin Logo"
                    src={DogecoinLogo}
                />
            )
        case 'monero':
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Monero Logo"
                    src={MoneroLogo}
                />
            )
        default:
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Bitcoin Logo"
                    src={BitcoinLogo}
                />
            )
    }
}

const onClickViewResult = (
    handleClose: () => void,
    setShowStat: () => void
) => {
    setShowStat()
    handleClose()
}

const renderPaymentSuccess = (
    selectedCurrency: string,
    setShowStat: () => void,
    handleClose: () => void
) => {
    return (
        <>
            <h5 className="text-center">Select your payment type</h5>
            <div className="d-flex flex-column align-items-center">
                {renderCoinlogo(selectedCurrency)}
                <span className="mt-3">
                    <i className="fa fa-check-circle-o mr-2" />
                    Payment Successful
                </span>
                <span className="mt-2">
                    Tx ID:
                    0f8167ebf5b4a76457d56734de9e9731c1eee30a98ba81985b3cafa48b
                    <i className="fa fa-clone ml-2" />
                </span>
                <button
                    className="btn btn-header-red"
                    onClick={() => onClickViewResult(handleClose, setShowStat)}>
                    View Results
                </button>
            </div>
        </>
    )
}

const PaymentDialog = ({
    show,
    handleClose,
    className,
    setShowStat,
}: PaymentDialogProps) => {
    const [selectedCurrency, setSelectedCurrency] = useState('')
    const cx: string = classnames(s.container, className)

    return (
        <ModalDialog show={show} handleClose={handleClose}>
            <div className={cx}>
                {!selectedCurrency.length ? (
                    <>
                        <h5 className="text-center">
                            Select your payment type
                        </h5>
                        <div className="d-flex flex-column justify-content-center justify-content-md-around coin-logos-wrapper">
                            <div className="d-flex justify-content-around">
                                <img
                                    className="coin-logo img-fluid"
                                    alt="Ethereum Logo"
                                    src={EthereumLogo}
                                    onClick={() =>
                                        setSelectedCurrency('ethereum')
                                    }
                                />
                                <img
                                    className="coin-logo img-fluid"
                                    alt="Polkadot Logo"
                                    src={PolkadotLogo}
                                    onClick={() =>
                                        setSelectedCurrency('polkadot')
                                    }
                                />
                                <img
                                    className="coin-logo img-fluid"
                                    alt="Ada Logo"
                                    src={AdaLogo}
                                    onClick={() => setSelectedCurrency('ada')}
                                />
                            </div>
                            <div className="d-flex justify-content-around mt-4">
                                <img
                                    className="coin-logo img-fluid"
                                    alt="Bitcoin Logo"
                                    src={BitcoinLogo}
                                    onClick={() =>
                                        setSelectedCurrency('bitcoin')
                                    }
                                />
                                <img
                                    className="coin-logo img-fluid"
                                    alt="Dogecoin Logo"
                                    src={DogecoinLogo}
                                    onClick={() =>
                                        setSelectedCurrency('dogecoin')
                                    }
                                />
                                <img
                                    className="coin-logo img-fluid"
                                    alt="Monero Logo"
                                    src={MoneroLogo}
                                    onClick={() =>
                                        setSelectedCurrency('monero')
                                    }
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    renderPaymentSuccess(
                        selectedCurrency,
                        setShowStat,
                        handleClose
                    )
                )}
            </div>
        </ModalDialog>
    )
}

export default PaymentDialog
