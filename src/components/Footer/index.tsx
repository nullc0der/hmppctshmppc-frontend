import React, { useState } from 'react'
import classnames from 'classnames'

import ChangelogDialog from 'components/ChangelogDialog'

import s from './Footer.module.scss'

type FooterProps = {
    className?: string
}

const Footer = ({ className }: FooterProps) => {
    const [showChangelogDialog, setShowChangelogDialog] = useState(false)
    const handleChangelogDialogClose = () => setShowChangelogDialog(false)
    const handleChangelogDialogOpen = () => setShowChangelogDialog(true)

    const cx: string = classnames(s.container, className)

    return (
        <div className={cx}>
            <span className="copyright">&copy; 2021 All rights reserved</span>
            <span className="contact">
                <i className="fa fa-twitter mr-2"></i>Contact
            </span>
            <span className="version" onClick={handleChangelogDialogOpen}>
                Site Version: 0.0.1
            </span>
            <ChangelogDialog
                show={showChangelogDialog}
                handleClose={handleChangelogDialogClose}
            />
        </div>
    )
}

export default Footer
