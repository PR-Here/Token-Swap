import { StepData } from '@/components/exchange';
import { IMAGES } from '@/utils/images';

export const BINANCE_WEB_STEPS: StepData[] = [
    {
        sections: [
            {
                title: 'Login',
                description: 'Login to Binance',
                image: IMAGES.BINANCE_LOGIN,
                showLoginButtons: true,
                layout: 'text-image-row'
            },
            {
                title: 'Overview',
                description: 'Click on the wallet icon and click on Overview',
                image: IMAGES.BINANCE_DEPOSIT,
                layout: 'image-text-row'
            },
            {
                title: 'Withdraw',
                description: 'Once you\'re on the Overview page, locate the first block displaying your estimated balance and click "Withdraw."',
                image: IMAGES.BINANCE_ESTIMATED_BALANCE,
                layout: 'text-image-row-column'
            }
        ]
    },
    {
        title: 'Select Coins',
        description: 'Select the coin you wish to transfer from your Binance balance to send to Loopin',
        layout: 'coin-selection'
    }
];

export const BINANCE_MOBILE_STEPS: StepData[] = [
    {
        title: 'Open App',
        description: 'Open Binance mobile app',
        image: IMAGES.BINANCE_LOGIN,
        layout: 'text-image-row',
    },
    {
        title: 'Navigate to Wallet',
        description: 'Tap on the wallet icon in the bottom navigation',
        image: IMAGES.BINANCE_DEPOSIT,
        layout: 'image-text-row',
    },
    {
        title: 'Withdraw Funds',
        description: 'Tap on withdraw and select your cryptocurrency',
        image: IMAGES.BINANCE_ESTIMATED_BALANCE,
        layout: 'text-image-row-column',
    },
];

export const OKX_WEB_STEPS: StepData[] = [
    {
        title: 'Login',
        description: 'Login to OKX',
        image: IMAGES.OKX_LOGO,
        layout: 'text-image-row',
    },
    {
        title: 'Navigate to Assets',
        description: 'Click on Assets in the top menu',
        image: IMAGES.OKX_LOGO,
        layout: 'image-text-row',
    },
    {
        title: 'Withdraw',
        description: 'Click on withdraw and select your cryptocurrency',
        image: IMAGES.OKX_LOGO,
        layout: 'text-image-row-column',
    },
];

export const OKX_MOBILE_STEPS: StepData[] = [
    {
        title: 'Open App',
        description: 'Open OKX mobile app',
        image: IMAGES.OKX_LOGO,
        layout: 'text-image-row',
    },
    {
        title: 'Go to Assets',
        description: 'Tap on Assets tab',
        image: IMAGES.OKX_LOGO,
        layout: 'image-text-row',
    },
    {
        title: 'Withdraw',
        description: 'Tap withdraw and select your coin',
        image: IMAGES.OKX_LOGO,
        layout: 'text-image-row-column',
    },
];

export const COINBASE_WEB_STEPS: StepData[] = [
    {
        title: 'Login',
        description: 'Login to Coinbase',
        image: IMAGES.COINBASE_LOGO,
        layout: 'text-image-row',
    },
    {
        title: 'Go to Portfolio',
        description: 'Click on Portfolio in the navigation',
        image: IMAGES.COINBASE_ACCOUNT,
        layout: 'image-text-row',
    },
    {
        title: 'Send Crypto',
        description: 'Click Send and select your cryptocurrency',
        image: IMAGES.COINBASE_SEND_CRYPTO,
        layout: 'text-image-row-column',
    },
];

export const COINBASE_MOBILE_STEPS: StepData[] = [
    {
        title: 'Open App',
        description: 'Open Coinbase mobile app',
        image: IMAGES.COINBASE_LOGO,
        layout: 'text-image-row',
    },
    {
        title: 'Tap Send',
        description: 'Tap the Send button on the home screen',
        image: IMAGES.COINBASE_SEND_CRYPTO,
        layout: 'image-text-row',
    },
    {
        title: 'Select Coin',
        description: 'Choose the cryptocurrency you want to send',
        image: IMAGES.COINBASE_SEND_ETH,
        layout: 'text-image-row-column',
    },
];

export const BYBIT_WEB_STEPS: StepData[] = [
    {
        title: 'Login',
        description: 'Login to Bybit',
        image: IMAGES.BYBIT_LOGO,
        layout: 'text-image-row',
    },
    {
        title: 'Go to Assets',
        description: 'Click on Assets in the top menu',
        image: IMAGES.BYBIT_BASE_ASSETS,
        layout: 'image-text-row',
    },
    {
        title: 'Withdraw',
        description: 'Click on withdraw and select your cryptocurrency',
        image: IMAGES.BYBIT_SEND_CONFIRM,
        layout: 'text-image-row-column',
    },
];

export const BYBIT_MOBILE_STEPS: StepData[] = [
    {
        title: 'Open App',
        description: 'Open Bybit mobile app',
        image: IMAGES.BYBIT_LOGO,
        layout: 'text-image-row',
    },
    {
        title: 'Go to Wallet',
        description: 'Tap on Wallet tab',
        image: IMAGES.BYBIT_BOTTOM_SHEET,
        layout: 'image-text-row',
    },
    {
        title: 'Withdraw',
        description: 'Tap withdraw and select your coin',
        image: IMAGES.BYBIT_SEND_SUCCESS,
        layout: 'text-image-row-column',
    },
];

export const EXCHANGE_STEPS = {
    BINANCE: {
        WEB: BINANCE_WEB_STEPS,
        MOBILE: BINANCE_MOBILE_STEPS,
    },
    OKX: {
        WEB: OKX_WEB_STEPS,
        MOBILE: OKX_MOBILE_STEPS,
    },
    COINBASE: {
        WEB: COINBASE_WEB_STEPS,
        MOBILE: COINBASE_MOBILE_STEPS,
    },
    BYBIT: {
        WEB: BYBIT_WEB_STEPS,
        MOBILE: BYBIT_MOBILE_STEPS,
    },
};
