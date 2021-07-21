import React from 'react'
import Modal from 'react-bootstrap/Modal'
import classnames from 'classnames'

import s from './ModalDialog.module.scss'

type ModalDialogProps = {
    show: boolean
    className?: string
    children: React.ReactNode
    backdrop?: string | boolean
    handleClose: () => void
}

const ModalDialog = ({
    show,
    className,
    children,
    backdrop,
    handleClose,
}: ModalDialogProps) => {
    const cx: string = classnames(s.container, className)

    return (
        <Modal
            show={show}
            onHide={handleClose}
            dialogClassName={cx}
            centered={true}
            backdrop={backdrop || true}>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    )
}

export default ModalDialog
