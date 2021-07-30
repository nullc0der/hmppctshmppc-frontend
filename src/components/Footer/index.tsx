import { useState } from 'react'
import classnames from 'classnames'

import { useMatomo } from '@datapunt/matomo-tracker-react'

import ChangelogDialog from 'components/ChangelogDialog'

import s from './Footer.module.scss'

type FooterProps = {
    className?: string
}

const Footer = ({ className }: FooterProps) => {
    const [showChangelogDialog, setShowChangelogDialog] = useState(false)

    const { trackEvent } = useMatomo()

    const handleChangelogDialogClose = () => setShowChangelogDialog(false)
    const handleChangelogDialogOpen = () => {
        trackEvent({ category: 'Dialog', action: 'Open', name: 'Changelog' })
        setShowChangelogDialog(true)
    }

    const cx: string = classnames(s.container, className)

    return (
        <div className={cx}>
            <span className="copyright">&copy; 2021 All rights reserved</span>
            <span className="contact">
                <a
                    href="https://twitter.com/hmppctshmppc"
                    target="_blank"
                    rel="noreferrer">
                    <i className="fa fa-twitter mr-2"></i>Contact
                </a>
            </span>
            <span className="version" onClick={handleChangelogDialogOpen}>
                Site Version: 0.0.2
            </span>
            <ChangelogDialog
                show={showChangelogDialog}
                handleClose={handleChangelogDialogClose}
            />
        </div>
    )
}

export default Footer
