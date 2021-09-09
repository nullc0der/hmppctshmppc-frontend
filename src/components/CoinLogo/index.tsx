import EthereumLogo from 'cryptocurrency-icons/svg/color/eth.svg'
import PolkadotLogo from 'cryptocurrency-icons/svg/color/dot.svg'
import AdaLogo from 'cryptocurrency-icons/svg/color/ada.svg'
import BitcoinLogo from 'cryptocurrency-icons/svg/color/btc.svg'
import DogecoinLogo from 'cryptocurrency-icons/svg/color/doge.svg'
import MoneroLogo from 'cryptocurrency-icons/svg/color/xmr.svg'

type CoinLogoProps = {
    currencyName: string
    onClickCoinLogo?: () => void
}

const CoinLogo = ({
    currencyName,
    onClickCoinLogo = () => {},
}: CoinLogoProps) => {
    switch (currencyName) {
        case 'ethereum':
            return (
                <img
                    className="coin-logo img-fluid ethereum"
                    alt="Ethereum Logo"
                    src={EthereumLogo}
                    onClick={() => onClickCoinLogo()}
                    title="Ethereum"
                />
            )
        case 'polkadot':
            return (
                <img
                    className="coin-logo img-fluid polkadot"
                    alt="Polkadot Logo"
                    src={PolkadotLogo}
                    onClick={() => onClickCoinLogo()}
                    title="Polkadot"
                />
            )
        case 'ada':
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Ada Logo"
                    src={AdaLogo}
                    onClick={() => onClickCoinLogo()}
                    title="Cardano"
                />
            )
        case 'bitcoin':
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Bitcoin Logo"
                    src={BitcoinLogo}
                    onClick={() => onClickCoinLogo()}
                    title="Bitcoin"
                />
            )
        case 'dogecoin':
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Dogecoin Logo"
                    src={DogecoinLogo}
                    onClick={() => onClickCoinLogo()}
                    title="Dogecoin"
                />
            )
        case 'monero':
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Monero Logo"
                    src={MoneroLogo}
                    onClick={() => onClickCoinLogo()}
                    title="Monero"
                />
            )
        default:
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Bitcoin Logo"
                    src={BitcoinLogo}
                    onClick={() => onClickCoinLogo()}
                    title="Bitcoin"
                />
            )
    }
}

export default CoinLogo
