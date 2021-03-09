import React from 'react'
import classnames from 'classnames'

import PaymentDialog from 'components/PaymentDialog'

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
    const cx: string = classnames(s.container, className)

    return (
        <div className={cx} style={{ backgroundImage: `url(${HeaderBG})` }}>
            <p>Want to know how many people paid crypto to see</p>
            <p>how many people paid crypto?</p>
            <button
                className="btn btn-small btn-header-red"
                onClick={handlePaymentDialogShow}>
                Send Payment
            </button>
            <PaymentDialog
                show={showPaymentDialog}
                handleClose={handlePaymentDialogClose}
                setShowStat={setShowStat}
            />
        </div>
    )
}

export default Header
