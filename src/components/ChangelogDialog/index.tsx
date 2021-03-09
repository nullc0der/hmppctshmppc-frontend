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
        <ModalDialog show={show} handleClose={handleClose}>
            <div className={cx}>
                <h5>Changelog</h5>
                <h6>Version 0.0.1</h6>
                <ul>
                    <li>Landing Page</li>
                    <li>Payment Dialog</li>
                    <li>Ethereum Payment</li>
                    <li>Bitcoin Payment</li>
                    <li>Basic Stats Section</li>
                </ul>
            </div>
        </ModalDialog>
    )
}

export default ChangelogDialog
