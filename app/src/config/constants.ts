export const constants = {
  defaultLocale: 'en-AU',
  defaultCurrency: 'AUD',
  defaultDateFormat: 'DD/MM/YYYY',
  inputCurrencyPrecision: 3,
  currencyMultiplicationFactor: 1_000,
  currencyMultiplicationAbbreviation: 'T',
  web3: {
    contractAddress: process.env.REACT_APP_CONTRACT_ADDRESS || '0xf444259Dafa9Eb94690D3d8f8831E40279e9A428',
    chainId: process.env.REACT_APP_CHAIN_ID || 11155111,
  },
}
