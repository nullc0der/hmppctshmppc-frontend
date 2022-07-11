import classnames from 'classnames'

import HeaderBG from 'assets/img/Header-BG.jpg'
import s from './Header.module.scss'

type HeaderProps = {
    handlePaymentDialogShow: () => void
    className?: string
}

const Header = ({ className, handlePaymentDialogShow }: HeaderProps) => {
    const cx: string = classnames(s.container, className)

    return (
        <div className={cx} style={{ backgroundImage: `url(${HeaderBG})` }}>
            <p>
                Spend your crypto dust to see how many people spent their crypto
                dust.
            </p>
            <p>Use your leftover crypto to see results.</p>
            <button
                className="btn btn-small btn-header-red"
                onClick={handlePaymentDialogShow}>
                Pay Crypto
            </button>
        </div>
    )
}

export default Header
