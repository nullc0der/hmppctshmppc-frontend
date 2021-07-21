import CoinLogo from 'components/CoinLogo'

type CurrencySelectProps = {
    setCurrentStep: (nextStep: string) => void
    setSelectedCurrency: (selectedCurrency: string) => void
}

const CurrencySelect = ({
    setCurrentStep,
    setSelectedCurrency,
}: CurrencySelectProps) => {
    const onClickCoinLogo = (selectedCurrency: string) => {
        setCurrentStep('paymentAddress')
        setSelectedCurrency(selectedCurrency)
    }

    return (
        <>
            <h5 className="text-center">Select your payment type</h5>
            <div className="d-flex flex-column justify-content-center justify-content-around coin-logos-wrapper">
                <div className="d-flex justify-content-around">
                    <CoinLogo
                        currencyName={'ethereum'}
                        onClickCoinLogo={() => onClickCoinLogo('ethereum')}
                    />
                    <CoinLogo
                        currencyName={'polkadot'}
                        onClickCoinLogo={() => onClickCoinLogo('polkadot')}
                    />
                    <CoinLogo
                        currencyName={'ada'}
                        onClickCoinLogo={() => onClickCoinLogo('ada')}
                    />
                </div>
                <div className="d-flex justify-content-around mt-4">
                    <CoinLogo
                        currencyName={'bitcoin'}
                        onClickCoinLogo={() => onClickCoinLogo('bitcoin')}
                    />
                    <CoinLogo
                        currencyName={'dogecoin'}
                        onClickCoinLogo={() => onClickCoinLogo('dogecoin')}
                    />
                    <CoinLogo
                        currencyName={'monero'}
                        onClickCoinLogo={() => onClickCoinLogo('monero')}
                    />
                </div>
            </div>
        </>
    )
}

export default CurrencySelect
