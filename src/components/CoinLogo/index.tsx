import React from 'react'

import EthereumLogo from 'assets/img/ethereum-eth-logo.svg'
import PolkadotLogo from 'assets/img/polkadot-new-dot-logo.svg'
import AdaLogo from 'assets/img/cardano-ada-logo.svg'
import BitcoinLogo from 'assets/img/bitcoin-btc-logo.svg'
import DogecoinLogo from 'assets/img/dogecoin-doge-logo.svg'
import MoneroLogo from 'assets/img/monero-xmr-logo.svg'

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
                />
            )
        case 'polkadot':
            return (
                <img
                    className="coin-logo img-fluid polkadot"
                    alt="Polkadot Logo"
                    src={PolkadotLogo}
                    onClick={() => onClickCoinLogo()}
                />
            )
        case 'ada':
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Ada Logo"
                    src={AdaLogo}
                    onClick={() => onClickCoinLogo()}
                />
            )
        case 'bitcoin':
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Bitcoin Logo"
                    src={BitcoinLogo}
                    onClick={() => onClickCoinLogo()}
                />
            )
        case 'dogecoin':
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Dogecoin Logo"
                    src={DogecoinLogo}
                    onClick={() => onClickCoinLogo()}
                />
            )
        case 'monero':
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Monero Logo"
                    src={MoneroLogo}
                    onClick={() => onClickCoinLogo()}
                />
            )
        default:
            return (
                <img
                    className="coin-logo img-fluid"
                    alt="Bitcoin Logo"
                    src={BitcoinLogo}
                    onClick={() => onClickCoinLogo()}
                />
            )
    }
}

export default CoinLogo
