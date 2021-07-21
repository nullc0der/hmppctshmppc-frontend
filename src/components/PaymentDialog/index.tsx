import { useState, useEffect } from 'react'
import classnames from 'classnames'

import ModalDialog from 'components/ModalDialog'

import CurrencySelect from 'components/PaymentDialog/CurrencySelect'
import PaymentAddress from 'components/PaymentDialog/PaymentAddress'
import PaymentSuccess from 'components/PaymentDialog/PaymentSuccess'

import { IPaymentSuccessInfo } from './interfaces'

import s from './PaymentDialog.module.scss'

type PaymentDialogProps = {
    show: boolean
    defaultCurrentStep: string
    defaultSelectedCurrency?: string
    defaultPaymentSuccessInfo?: IPaymentSuccessInfo
    className?: string
    handleClose: () => void
    setShowStat: () => void
}

const PaymentDialog = ({
    show,
    defaultCurrentStep,
    defaultSelectedCurrency,
    defaultPaymentSuccessInfo,
    className,
    handleClose,
    setShowStat,
}: PaymentDialogProps) => {
    const [selectedCurrency, setSelectedCurrency] = useState('')
    const [currentStep, setCurrentStep] = useState('')
    const [paymentSuccessInfo, setPaymentSuccessInfo] = useState<
        IPaymentSuccessInfo | undefined
    >(undefined)
    const cx: string = classnames(s.container, className)

    useEffect(() => {
        setCurrentStep(defaultCurrentStep)
    }, [defaultCurrentStep])

    useEffect(() => {
        setSelectedCurrency(defaultSelectedCurrency || '')
    }, [defaultSelectedCurrency])

    useEffect(() => {
        setPaymentSuccessInfo(defaultPaymentSuccessInfo)
    }, [defaultPaymentSuccessInfo])

    const getCurrentStep = (currentStep: string) => {
        switch (currentStep) {
            case 'currencySelect':
                return (
                    <CurrencySelect
                        setCurrentStep={setCurrentStep}
                        setSelectedCurrency={setSelectedCurrency}
                    />
                )
            case 'paymentAddress':
                return (
                    <PaymentAddress
                        selectedCurrency={selectedCurrency}
                        setCurrentStep={setCurrentStep}
                        setPaymentSuccessInfo={setPaymentSuccessInfo}
                    />
                )
            case 'paymentSuccess':
                return (
                    <PaymentSuccess
                        selectedCurrency={selectedCurrency}
                        paymentSuccessInfo={paymentSuccessInfo}
                        setShowStat={setShowStat}
                        handleClose={handleClose}
                    />
                )
            default:
                return null
        }
    }

    // NOTE: Need to clear out selectedCurrency and currentStep on unmount ???
    // Also the payment info refreshes every time the dialog mounts if browser tab is not reloaded

    return (
        <ModalDialog
            show={show}
            handleClose={handleClose}
            backdrop={currentStep === 'paymentAddress' ? 'static' : true}>
            <div className={cx}>{getCurrentStep(currentStep)}</div>
        </ModalDialog>
    )
}

export default PaymentDialog
