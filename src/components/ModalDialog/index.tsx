import React from 'react'
import Modal from 'react-bootstrap/Modal'
import classnames from 'classnames'

import s from './ModalDialog.module.scss'

type ModalDialogProps = {
    show: boolean
    handleClose: () => void
    className?: string
    children: React.ReactNode
}

const ModalDialog = ({
    show,
    handleClose,
    className,
    children,
}: ModalDialogProps) => {
    const cx: string = classnames(s.container, className)

    return (
        <Modal show={show} onHide={handleClose} dialogClassName={cx}>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    )
}

export default ModalDialog
