import { Text } from '@/components';
import { WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { useToast } from '@/context/ToastContext';
import { IMAGES } from '@/utils/images';
import { getHeight, getWidth } from '@/utils/size';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const BinanceMobileFlow = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedCoin, setSelectedCoin] = useState('BTC');
    const [selectedNetwork, setSelectedNetwork] = useState('BEP20');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [searchText, setSearchText] = useState('BTC');
    const { showToast } = useToast();

    const coins = [
        { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', logo: IMAGES.BITCOIN },
        { id: 'WBTC', name: 'Wrapped Bitcoin', symbol: 'WBTC', logo: IMAGES.BITCOIN },
        { id: 'ETH', name: 'Ethereum', symbol: 'ETH', logo: IMAGES.ETHERIUM },
        { id: 'USDT', name: 'Tether USD', symbol: 'USDT', logo: IMAGES.DOLLOR },
        { id: 'USDC', name: 'USD Coin', symbol: 'USDC', logo: IMAGES.DOLLOR },
    ];

    const networks = ['BEP20', 'ERC20', 'TRC20'];

    const handleCoinSelect = (coin: any) => {
        setSelectedCoin(coin.id);
        setSearchText(coin.symbol);
    };

    const handleNetworkSelect = (network: string) => {
        setSelectedNetwork(network);
    };

    const handleAmountChange = (amount: string) => {
        setWithdrawAmount(amount);
    };

    const handleCopyAddress = async () => {
        try {
            const address = '3FcfMNQ7i17U2VukoMb6EX9gcgae3Va mU7';
            await Clipboard.setStringAsync(address);
            showToast('Address copied to clipboard', 3000);
        } catch (error) {
            showToast('Failed to copy address', 3000);
        }
    };

    // 0 index - Mobile Login Steps
    const renderStep0 = () => (
        <View style={styles.stepContainer}>
            {/* Login Section */}
            <View style={styles.loginSection}>
                <View style={styles.textImageRow}>
                    <View style={styles.textSection}>
                        <Text style={styles.stepTitle}>Login</Text>
                        <Text style={styles.stepDescription}>Login to Binance</Text>
                    </View>
                    <Image source={IMAGES.BINANCE_WHITE_LOGIN} style={styles.stepImageSmall} />
                </View>
            </View>

            {/* Wallet Navigation Section */}
            <View style={styles.walletSection}>
                <View style={styles.textImageRow}>
                    <View style={styles.textSection}>
                        <Text style={styles.stepTitle}>Go to Wallets</Text>
                        <Text style={styles.stepDescription}>Click on the wallets in the bottom navigation</Text>
                    </View>

                </View>
                <Image source={IMAGES.BINANCE_WHITE_BOTTOM_SHEET} style={styles.bottomNavigationImage} />
            </View>
        </View>
    );

    // 1 index - Coin Selection
    const renderStep1 = () => (
        <View style={styles.stepContainer}>
            {/* Header */}
            <View style={styles.coinSelectionHeader}>
                <Text style={styles.coinSelectionTitle}>Select Coins</Text>
                <Text style={styles.coinSelectionSubtitle}>
                    Select the coin you wish to transfer
                    from your Binance balance to send to Loopin and you will arrive on the coin’s page
                </Text>
            </View>

            {/* Main Card */}
            <Image resizeMode='contain' source={IMAGES.BINANCE_WHITE_USDT} style={styles.binanceMobileImage} />
        </View>
    );

    // 2 index - Withdraw to
    const renderStep2 = () => (
        <View style={styles.stepContainer}>
            {/* Header */}
            <View style={styles.withdrawHeader}>
                <Text style={styles.withdrawTitle}>Select Send via crypto network</Text>
                <Text style={styles.withdrawSubtitle}>
                    Select Withdrawal and
                    select Send via crypto network
                </Text>
            </View>
            {/* Main Card */}
            <Image resizeMode='contain' source={IMAGES.BINANCE_WHITE_WITHDRAW} style={styles.binanceMobileImage} />
        </View>
    );

    // 3 index - Network Selection
    const renderStep3 = () => (
        <View style={styles.stepContainer}>
            {/* Header */}
            <View style={styles.withdrawHeader}>
                <Text style={styles.withdrawTitle}>Enter Loopin Wallet Address</Text>
                <Text style={styles.withdrawSubtitle}>
                    Copy and paste the wallet address from below
                </Text>
            </View>

            {/* Loopin ETH Address Box */}
            <View style={styles.loopinAddressBox}>
                <Text style={styles.loopinAddressLabel}>Your Loopin ETH address</Text>
                <View style={styles.addressContainer}>
                    <Text style={styles.loopinAddress}>3FcfMNQ7i17U2VukoMb6EX9gcgae3Va mU7</Text>
                    <TouchableOpacity style={styles.copyButton} onPress={handleCopyAddress}>
                        <Ionicons name="copy-outline" size={16} color={WHITE} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Main Card */}
            <Image resizeMode='contain' source={IMAGES.BINANCE_WHITE_SEND_USDT} style={styles.recentWithdrawImage} />
        </View>
    );

    // 4 index - Amount Entry
    const renderStep4 = () => (
        <View style={styles.stepContainer}>
            {/* Header */}
            <View style={styles.networkHeader}>
                <Text style={styles.networkTitle}>Select Network, ETH only</Text>
                <Text style={styles.networkSubtitle}>
                    ALWAYS select Ethereum Network (ERC-20) from the drop down
                </Text>
            </View>

            {/* Main Card */}
            <Image resizeMode='contain' source={IMAGES.BINANCE_WHITE_SEND_USDT} style={styles.binanceMobileImage} />
        </View>
    );

    // 5 index - Withdraw Confirmation
    const renderStep5 = () => (
        <View style={styles.stepContainer}>
            {/* Header */}
            <View style={styles.networkHeader}>
                <Text style={styles.networkTitle}>Enter Amount</Text>
                <Text style={styles.networkSubtitle}>
                    Add the token amount (USDT/USDC) you wish to transfer to Loopin App. Top up with at least USD 1000 for a seamless next Buy
                </Text>
            </View>

            {/* Main Card */}
            <Image resizeMode='contain' source={IMAGES.BINANCE_WHITE_SEND_USDT} style={styles.binanceMobileImage} />
        </View>
    );

    // 6 index - Complete
    const renderStep6 = () => (
        <View style={styles.stepContainer}>
            {/* Header */}
            <View style={styles.networkHeader}>
                <Text style={styles.networkTitle}>Now, you clicked on Withdraw</Text>
                <Text style={styles.networkSubtitle}>
                    Click on Withdraw which will initiate the transfer to Loopin App (You’ll receive slightly less amount than what you sent due to network fees on Ethereum)
                </Text>
            </View>

            {/* Main Card */}
            <Image resizeMode='contain' source={IMAGES.BINANCE_WHITE_USDT} style={styles.recentWithdrawImage} />
        </View>
    );

    // 7 index - Complete
    const renderStep7 = () => (
        <View style={styles.stepContainer}>
            {/* Header */}
            <View style={[styles.networkHeader, { marginTop: getHeight(150) }]}>
                <Text style={styles.networkTitle}>That’s it. It’s done.</Text>
                <Text style={styles.networkSubtitle}>
                    Come back to Loopin to confirm receipt of funds
                    (You can also check the status under the withdrawal tab on Binance)
                </Text>
            </View>
        </View>
    );


    const renderStep = (stepIndex: number) => {
        switch (stepIndex) {
            case 0:
                return renderStep0();
            case 1:
                return renderStep1();
            case 2:
                return renderStep2();
            case 3:
                return renderStep3();
            case 4:
                return renderStep4();
            case 5:
                return renderStep5();
            case 6:
                return renderStep6();
            case 7:
                return renderStep7();
            default:
                return renderStep0();
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const stepIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
                    setCurrentStep(stepIndex);
                }}
                style={styles.scrollView}
            >
                {Array.from({ length: 8 }, (_, index) => (
                    <View key={index} style={styles.stepCard}>
                        {renderStep(index)}
                    </View>
                ))}
            </ScrollView>

            {/* Pagination Dots */}
            <View style={styles.paginationContainer}>
                <View style={styles.dotsContainer}>
                    {Array.from({ length: 8 }, (_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                index === currentStep && styles.activeDot,
                            ]}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    stepCard: {
        width: screenWidth,
        paddingHorizontal: getWidth(20),
    },
    stepContainer: {
        marginBottom: getHeight(0),
    },
    // Mobile step 0 styles
    loginSection: {
        marginBottom: getHeight(80),
        marginTop: getHeight(60),
    },
    walletSection: {
    },
    textImageRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textSection: {
        flex: 1,
        marginRight: getWidth(10),
    },
    stepTitle: {
        fontSize: getWidth(16),
        fontFamily: FontName.NewsreaderBold,
        color: WHITE,
        marginBottom: getHeight(4),
    },
    stepDescription: {
        fontSize: getWidth(14),
        fontFamily: FontName.NewsreaderRegular,
        color: WHITE,
        opacity: 0.9,
    },
    buttonContainer: {
        flexDirection: 'row',
        backgroundColor: WHITE,
        borderRadius: getWidth(8),
        padding: getWidth(4),
        alignItems: 'center',
    },
    loginButton: {
        paddingHorizontal: getWidth(16),
        paddingVertical: getHeight(8),
        borderRadius: getWidth(6),
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        marginRight: getWidth(4),
    },
    signupButton: {
        paddingHorizontal: getWidth(16),
        paddingVertical: getHeight(8),
        borderRadius: getWidth(6),
        backgroundColor: '#FFD700',
    },
    loginButtonText: {
        fontSize: getWidth(12),
        fontFamily: FontName.NewsreaderMedium,
        color: '#000000',
    },
    signupButtonText: {
        fontSize: getWidth(12),
        fontFamily: FontName.NewsreaderMedium,
        color: '#000000',
    },
    stepImageSmall: {
        width: getWidth(187),
        height: getHeight(32),
        resizeMode: 'contain',
    },
    bottomNavigationImage: {
        width: getWidth(298),
        height: getHeight(45),
        resizeMode: 'contain',
        marginTop: getHeight(16),
        alignSelf: 'flex-start',
    },
    // Mobile specific styles
    mobileHeader: {
        alignItems: 'center',
        marginBottom: getHeight(20),
        marginTop: getHeight(40),
    },
    mobileTitle: {
        fontSize: getWidth(20),
        fontFamily: FontName.NewsreaderBold,
        color: WHITE,
        marginBottom: getHeight(8),
    },
    mobileSubtitle: {
        fontSize: getWidth(14),
        fontFamily: 'system',
        color: WHITE,
        textAlign: 'center',
        opacity: 0.9,
        lineHeight: getHeight(20),
        paddingHorizontal: getWidth(20),
    },
    binanceMobileImage: {
        width: getWidth(248),
        height: getHeight(196),
        borderRadius: getWidth(8),
        alignSelf: 'center',
        marginTop: getHeight(10),
    },
    // Coin selection styles
    coinSelectionHeader: {
        alignItems: 'center',
        marginBottom: getHeight(20),
        marginTop: getHeight(40),
    },
    coinSelectionTitle: {
        fontSize: getWidth(20),
        fontFamily: FontName.NewsreaderBold,
        color: WHITE,
        marginBottom: getHeight(8),
    },
    coinSelectionSubtitle: {
        fontSize: getWidth(14),
        fontFamily: 'system',
        color: WHITE,
        textAlign: 'center',
        opacity: 0.9,
        lineHeight: getHeight(20),
    },
    // Withdraw step styles
    withdrawHeader: {
        alignItems: 'center',
        marginBottom: getHeight(20),
        marginTop: getHeight(20),
    },
    withdrawTitle: {
        fontSize: getWidth(20),
        fontFamily: FontName.NewsreaderBold,
        color: WHITE,
        marginBottom: getHeight(8),
    },
    withdrawSubtitle: {
        fontSize: getWidth(14),
        fontFamily: 'system',
        color: WHITE,
        textAlign: 'center',
        opacity: 0.9,
        lineHeight: getHeight(20),
    },
    loopinAddressBox: {
        borderRadius: getWidth(6),
        padding: getWidth(16),
        marginBottom: getHeight(20),
        marginHorizontal: getWidth(20),
        borderWidth: 1,
        borderColor: WHITE,
        width: '100%',
        alignSelf: 'center',
    },
    loopinAddressLabel: {
        fontSize: getWidth(14),
        fontFamily: FontName.NewsreaderMedium,
        color: WHITE,
        marginBottom: getHeight(8),
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    loopinAddress: {
        fontSize: getWidth(12),
        fontFamily: FontName.NewsreaderRegular,
        color: WHITE,
        flex: 1,
        marginRight: getWidth(8),
    },
    copyButton: {
        padding: getWidth(4),
    },
    // Network selection styles
    networkHeader: {
        alignItems: 'center',
        marginBottom: getHeight(20),
        marginTop: getHeight(40),
    },
    networkTitle: {
        fontSize: getWidth(20),
        fontFamily: FontName.NewsreaderBold,
        color: WHITE,
        marginBottom: getHeight(8),
        textAlign: 'center',
    },
    networkSubtitle: {
        fontSize: getWidth(14),
        fontFamily: 'system',
        color: WHITE,
        textAlign: 'center',
        opacity: 0.9,
        lineHeight: getHeight(20),
        paddingHorizontal: getWidth(20),
    },
    recentWithdrawImage: {
        width: getWidth(189),
        height: getHeight(191),
        borderRadius: getWidth(8),
        alignSelf: 'center',
        marginTop: getHeight(-10),
    },
    // Pagination styles
    paginationContainer: {
        alignItems: 'center',
        marginVertical: getHeight(20),
    },
    dotsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: getWidth(8),
        height: getWidth(8),
        borderRadius: getWidth(4),
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginHorizontal: getWidth(4),
    },
    activeDot: {
        backgroundColor: WHITE,
        width: getWidth(12),
        height: getWidth(12),
        borderRadius: getWidth(6),
    },
});

export default BinanceMobileFlow;
