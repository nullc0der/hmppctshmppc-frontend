import React from 'react'
import classnames from 'classnames'

import ModalDialog from 'components/ModalDialog'

import s from './ChangelogDialog.module.scss'

type ChangelogDialogProps = {
    show: boolean
    handleClose: () => void
    className?: string
}

const ChangelogDialog = ({
    show,
    handleClose,
    className,
}: ChangelogDialogProps) => {
    const cx: string = classnames(s.container, className)

    return (
        <ModalDialog
            show={show}
            handleClose={handleClose}
            className={s.modalDialog}>
            <div className={cx}>
                <h5>Changelog</h5>
                <h6 className="mt-2">Version 0.0.2</h6>
                <ul className="pl-0 mt-2">
                    <li>Landing Page</li>
                    <li>Backend APIs</li>
                    <li>Payment Dialog</li>
                    <li>Ethereum Payment</li>
                    <li>Bitcoin Payment</li>
                    <li>Dogecoin Payment</li>
                    <li>Monero Payment</li>
                    <li>Stats Section</li>
                    <li>Twitter share</li>
                    <li>Contact button</li>
                </ul>
            </div>
        </ModalDialog>
    )
}

export default ChangelogDialog
