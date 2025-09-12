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

interface Coin {
    id: string;
    name: string;
    symbol: string;
    logo: any;
}

interface CoinSelectionMobileProps {
    onCoinSelect?: (coin: Coin) => void;
    onNetworkSelect?: (network: string) => void;
    onAmountChange?: (amount: string) => void;
}

const CoinSelectionMobile: React.FC<CoinSelectionMobileProps> = ({
    onCoinSelect,
    onNetworkSelect,
    onAmountChange,
}) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedCoin, setSelectedCoin] = useState('BTC');
    const [selectedNetwork, setSelectedNetwork] = useState('BEP20');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [searchText, setSearchText] = useState('BTC');
    const { showToast } = useToast();

    const coins: Coin[] = [
        { id: 'BTC', name: 'Bitcoin', symbol: 'BTC', logo: IMAGES.BITCOIN },
        { id: 'WBTC', name: 'Wrapped Bitcoin', symbol: 'WBTC', logo: IMAGES.BITCOIN },
        { id: 'ETH', name: 'Ethereum', symbol: 'ETH', logo: IMAGES.ETHERIUM },
        { id: 'USDT', name: 'Tether USD', symbol: 'USDT', logo: IMAGES.DOLLOR },
        { id: 'USDC', name: 'USD Coin', symbol: 'USDC', logo: IMAGES.DOLLOR },
    ];

    const networks = ['BEP20', 'ERC20', 'TRC20'];

    const handleCoinSelect = (coin: Coin) => {
        setSelectedCoin(coin.id);
        setSearchText(coin.symbol);
        onCoinSelect?.(coin);
    };

    const handleNetworkSelect = (network: string) => {
        setSelectedNetwork(network);
        onNetworkSelect?.(network);
    };

    const handleAmountChange = (amount: string) => {
        setWithdrawAmount(amount);
        onAmountChange?.(amount);
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

    // 0 index
    const renderStep0 = () => (
        <View style={styles.stepContainer}>
            {/* Overview Section */}
            <View style={styles.sectionContainer}>
                <View style={styles.textImageColumn}>
                    <View style={styles.textSectionFullWidth}>
                        <Text style={[styles.stepTitle, { textAlign: 'center', marginTop: getHeight(20) }]}>Login</Text>
                        <Text style={[styles.stepDescription, { width: '100%', textAlign: 'center' }]}>
                            Login to Coinbase
                        </Text>
                    </View>
                    <View style={styles.imageSectionFullWidth}>
                        <Image source={IMAGES.BYBIT_CONNECT_MY_COINBASE} style={{ width: getWidth(194), height: getHeight(84), resizeMode: 'contain' }} />
                    </View>
                </View>
            </View>

            {/* Withdraw Section */}
            <View style={styles.sectionContainer}>
                <View style={styles.textImageColumn}>
                    <View style={styles.textSectionFullWidth}>
                        <Text style={styles.stepTitle}>Go to Wallets</Text>
                        <Text style={[styles.stepDescription, { width: '100%' }]}>
                            Click on the wallets in the bottom navigation
                        </Text>
                    </View>
                    <View style={styles.imageSectionFullWidth}>
                        <Image resizeMode='contain' source={IMAGES.BYBIT_BOTTOM_SHEET} style={{ width: getWidth(298), height: getHeight(45), resizeMode: 'contain' }} />
                    </View>
                </View>
            </View>
        </View>
    );

    // 1 index
    const renderStep1 = () => (
        <View style={styles.stepContainer}>
            {/* Header */}
            <View style={styles.binanceHeader}>
                <Text style={styles.binanceTitle}>Select Network, ETH only</Text>
                <Text style={styles.binanceSubtitle}>
                    ALWAYS select Ethereum Network (ERC-20) from the drop down
                </Text>
            </View>

            {/* Main Card */}
            <Image resizeMode='contain' source={IMAGES.BYBIT_CRYPTO} style={styles.binanceSelectCoinImage} />
        </View>
    );

    // 2 index
    const renderStep2 = () => (
        <View style={styles.stepContainer}>
            {/* Header */}
            <View style={styles.binanceHeader}>
                <Text style={styles.binanceTitle}>Select Coins</Text>
                <Text style={styles.binanceSubtitle}>
                    Copy and paste the wallet address from below
                </Text>
            </View>

            {/* Main Card */}
            <Image resizeMode='contain' source={IMAGES.BYBIT_BASE_ASSETS} style={[styles.binanceWithdrawImage, {
                width: getWidth(121),
                height: getHeight(229),
            }]} />
        </View>
    );

    // 3 index
    const renderStep3 = () => (
        <View style={styles.stepContainer}>
            {/* Header */}
            <View style={styles.binanceHeader}>
                <Text style={styles.binanceTitle}>Enter Amount</Text>
                <Text style={styles.binanceSubtitle}>
                    Add the token amount (USDT/USDC) you wish to transfer to Loopin App. Top up with at least USD 1000 for a seamless next Buy
                </Text>
            </View>

            {/* Main Card */}
            <Image resizeMode='contain' source={IMAGES.BYBIT_ZERO_GBP} style={[styles.binanceWithdrawImage, {
                width: getWidth(121),
                height: getHeight(229),
                marginTop: getHeight(0),
            }]} />
        </View>
    );

    // 4 index
    const renderStep4 = () => (
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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: getWidth(10) }}>
                <Image resizeMode='contain' source={IMAGES.BYBIT_SEND_CONTACT} style={[styles.binanceWithdrawImage, {
                    width: getWidth(157),
                    height: getHeight(168),
                    marginTop: getHeight(0),
                }]} />
                <Image resizeMode='contain' source={IMAGES.BYBIT_CHOOSE_RECEIPT} style={[styles.binanceWithdrawImage, {
                    width: getWidth(166),
                    height: getHeight(59),
                    marginTop: getHeight(0),
                }]} />
            </View>
        </View>
    );

    // 5 index
    const renderStep5 = () => (
        <View style={[styles.stepContainer, {
            marginTop: getHeight(10),
        }]}>
            {/* Header */}
            <View style={[styles.binanceHeader, {
                marginTop: getHeight(0),
            }]}>
                <Text style={styles.binanceTitle}>Now, you clicked on Confirm</Text>
                <Text style={styles.binanceSubtitle}>
                    Review the confirm screen (This will have details on the network selected (always double check this is Ethereum) &how much you will receive after fees a to receive the token in Loopin wallet)
                </Text>
            </View>

            {/* Main Card */}
            <Image resizeMode='contain' source={IMAGES.BYBIT_SEND_CONFIRM} style={[styles.binanceNetworkImage, {
                width: getWidth(125),
                height: getHeight(200),
                marginTop: getHeight(0),
            }]} />
        </View>
    );

    // 6 index
    const renderStep6 = () => (
        <View style={styles.stepContainer}>
            {/* Header */}
            <View style={styles.binanceHeader}>
                <Text style={styles.binanceTitle}>That’s it. It’s done.</Text>
                <Text style={styles.binanceSubtitle}>
                    Go back to Loopin to confirm receipt of funds (You can also check the status under the transactions tab on Coinbase)
                </Text>
            </View>

            {/* Main Card */}
            <Image resizeMode='contain' source={IMAGES.BYBIT_SEND_SUCCESS} style={[styles.binanceNetworkImage, {
                width: getWidth(121),
                height: getHeight(229),
                marginTop: getHeight(0),
            }]} />
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
                {Array.from({ length: 7 }, (_, index) => (
                    <View key={index} style={styles.stepCard}>
                        {renderStep(index)}
                    </View>
                ))}
            </ScrollView>

            {/* Pagination Dots */}
            <View style={styles.paginationContainer}>
                <View style={styles.dotsContainer}>
                    {Array.from({ length: 7 }, (_, index) => (
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
    // Step 0 styles
    sectionContainer: {
        marginBottom: getHeight(40),
    },
    textImageRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imageTextRow: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textImageColumn: {
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
    },
    textSection: {
        flex: 1,
        marginRight: getWidth(10),
    },
    textSectionFullWidth: {
        width: '100%',
        marginBottom: getHeight(20),
    },
    imageSectionFullWidth: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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
    stepImageSmall: {
        width: getWidth(187),
        height: getHeight(32),
        resizeMode: 'contain',
    },
    stepImageFullWidth: {
        width: getWidth(224.76966857910156),
        height: getHeight(185),
        borderRadius: getWidth(8),
        borderWidth: getWidth(1),
        borderColor: 'rgba(255, 255, 255, 0.2)',
        alignSelf: 'center',
        marginTop: getHeight(10),
    },
    // Binance header styles
    binanceHeader: {
        alignItems: 'center',
        marginBottom: getHeight(20),
        marginTop: getHeight(40),
    },
    binanceTitle: {
        fontSize: getWidth(20),
        fontFamily: FontName.NewsreaderBold,
        color: WHITE,
        marginBottom: getHeight(8),
    },
    binanceSubtitle: {
        fontSize: getWidth(14),
        fontFamily: 'system',
        color: WHITE,
        textAlign: 'center',
        opacity: 0.9,
        lineHeight: getHeight(20),
        paddingHorizontal: getWidth(20),
    },
    // Image styles
    binanceSelectCoinImage: {
        width: getWidth(224.76966857910156),
        height: getHeight(185),
        borderRadius: getWidth(8),
        borderWidth: getWidth(1),
        borderColor: 'rgba(255, 255, 255, 0.2)',
        alignSelf: 'center',
        marginTop: getHeight(10),
    },
    binanceWithdrawImage: {
        width: getWidth(224.76966857910156),
        height: getHeight(185),
        borderRadius: getWidth(8),
        alignSelf: 'center',
        marginTop: getHeight(10),
    },
    binanceNetworkImage: {
        width: getWidth(224.76966857910156),
        height: getHeight(185),
        borderRadius: getWidth(8),
        alignSelf: 'center',
        marginTop: getHeight(10),
    },
    // Address box styles
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
    // Withdraw step styles
    withdrawHeader: {
        alignItems: 'center',
        marginBottom: getHeight(20),
        marginTop: getHeight(16),
    },
    withdrawTitle: {
        fontSize: getWidth(20),
        fontFamily: FontName.NewsreaderBold,
        color: WHITE,
        marginBottom: getHeight(4),
        textAlign: 'center',
    },
    withdrawSubtitle: {
        fontSize: getWidth(14),
        fontFamily: 'system',
        color: WHITE,
        textAlign: 'center',
        opacity: 0.9,
        lineHeight: getHeight(20),
    },
});

export default CoinSelectionMobile;
