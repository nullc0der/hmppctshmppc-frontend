import CoinLogo from 'components/CoinLogo'

type CurrencySelectProps = {
    setCurrentStep: (nextStep: string) => void
    onClickCurrency: (selectedCurrency: string) => void
}

const CurrencySelect = ({
    setCurrentStep,
    onClickCurrency,
}: CurrencySelectProps) => {
    const onClickCoinLogo = (selectedCurrency: string) => {
        setCurrentStep('paymentAddress')
        onClickCurrency(selectedCurrency)
    }

    return (
        <>
            <h5 className="text-center">Select your payment type</h5>
            <div className="d-flex flex-column justify-content-center justify-content-around coin-logos-wrapper">
                <div className="d-flex justify-content-around">
                    <CoinLogo
                        currencyName={'dogecoin'}
                        onClickCoinLogo={() => onClickCoinLogo('dogecoin')}
                    />
                    <CoinLogo
                        currencyName={'monero'}
                        onClickCoinLogo={() => onClickCoinLogo('monero')}
                    />
                    {/* NOTE: Need to change ada to cardano and all relevant places */}
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
                        currencyName={'ethereum'}
                        onClickCoinLogo={() => onClickCoinLogo('ethereum')}
                    />
                    <CoinLogo
                        currencyName={'polkadot'}
                        onClickCoinLogo={() => onClickCoinLogo('polkadot')}
                    />
                </div>
            </div>
        </>
    )
}

export default CurrencySelect
