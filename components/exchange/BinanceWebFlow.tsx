import { Text } from '@/components';
import { WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { IMAGES } from '@/utils/images';
import { getHeight, getWidth } from '@/utils/size';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const BinanceWebFlow = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedCoin, setSelectedCoin] = useState('BTC');
    const [selectedNetwork, setSelectedNetwork] = useState('BEP20');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [searchText, setSearchText] = useState('BTC');

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

    // 0 index
    const renderStep0 = () => (
        <View style={styles.stepContainer}>
            {/* Login Section */}
            <View style={styles.sectionContainer}>
                <View style={styles.textImageRow}>
                    <View style={styles.textSection}>
                        <Text style={styles.stepTitle}>Login</Text>
                        <Text style={styles.stepDescription}>Login to Binance</Text>
                    </View>
                    <Image source={IMAGES.BINANCE_LOGIN} style={styles.stepImageSmall} />
                </View>
            </View>

            {/* Overview Section */}
            <View style={styles.sectionContainer}>
                <View style={styles.imageTextRow}>
                    <Image source={IMAGES.BINANCE_DEPOSIT} style={styles.stepImageSmall} />
                    <View style={styles.textSection}>
                        <Text style={styles.stepTitle}>Overview</Text>
                        <Text style={styles.stepDescription}>Click on the wallet icon and click on Overview</Text>
                    </View>
                </View>
            </View>

            {/* Withdraw Section */}
            <View style={styles.sectionContainer}>
                <View style={styles.textImageColumn}>
                    <View style={styles.textSectionFullWidth}>
                        <Text style={styles.stepTitle}>Withdraw</Text>
                        <Text style={[styles.stepDescription, { width: '100%' }]}>
                            Once you're on the Overview page, locate the first block displaying your estimated balance and click "Withdraw."
                        </Text>
                    </View>
                    <View style={styles.imageSectionFullWidth}>
                        <Image source={IMAGES.BINANCE_ESTIMATED_BALANCE} style={styles.stepImageFullWidth} />
                    </View>
                </View>
            </View>
        </View>
    );

    const renderStep1 = () => (
        <View style={styles.stepContainer}>
            <View style={styles.coinSelectionContainer}>
                {/* Step 1: Select Coin */}
                <View style={styles.stepContainer}>
                    <View style={styles.stepHeader}>
                        <View style={[styles.stepNumber, styles.stepNumberActive]}>
                            <Text style={styles.stepNumberText}>1</Text>
                        </View>
                        <View style={styles.stepLine} />
                    </View>
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>Select coin</Text>
                        <View style={styles.searchContainer}>
                            <Image source={IMAGES.ARROWS_DOWN_UP} style={styles.searchIcon} />
                            <TextInput
                                style={styles.searchInput}
                                value={searchText}
                                onChangeText={setSearchText}
                                placeholder="Search coins..."
                                placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            />
                            {searchText && (
                                <TouchableOpacity onPress={() => setSearchText('')}>
                                    <Text style={styles.clearIcon}>×</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <ScrollView style={styles.coinList} showsVerticalScrollIndicator={false}>
                            {coins.map((coin) => (
                                <TouchableOpacity
                                    key={coin.id}
                                    style={[
                                        styles.coinItem,
                                        selectedCoin === coin.id && styles.coinItemSelected,
                                    ]}
                                    onPress={() => handleCoinSelect(coin)}
                                >
                                    <Image source={coin.logo} style={styles.coinLogo} />
                                    <View style={styles.coinInfo}>
                                        <Text style={styles.coinSymbol}>{coin.symbol}</Text>
                                        <Text style={styles.coinName}>{coin.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                {/* Step 2: Select Network */}
                <View style={styles.stepContainer}>
                    <View style={styles.stepHeader}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>2</Text>
                        </View>
                        <View style={styles.stepLine} />
                    </View>
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>Select network</Text>
                        <View style={styles.networkContainer}>
                            <Text style={styles.networkText}>{selectedNetwork}</Text>
                            <Image source={IMAGES.DOWN_ARROW} style={styles.dropdownIcon} />
                        </View>
                    </View>
                </View>

                {/* Step 3: Withdraw Amount */}
                <View style={styles.stepContainer}>
                    <View style={styles.stepHeader}>
                        <View style={styles.stepNumber}>
                            <Text style={styles.stepNumberText}>3</Text>
                        </View>
                    </View>
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>Withdraw amount</Text>
                        <TextInput
                            style={styles.amountInput}
                            value={withdrawAmount}
                            onChangeText={handleAmountChange}
                            placeholder="Enter amount..."
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            keyboardType="numeric"
                        />
                    </View>
                </View>
            </View>
        </View>
    );

    const renderStep2 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step 2 - Network Selection</Text>
            <Text style={styles.stepDescription}>Select your preferred network for the transaction</Text>
        </View>
    );

    const renderStep3 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step 3 - Amount Entry</Text>
            <Text style={styles.stepDescription}>Enter the amount you want to withdraw</Text>
        </View>
    );

    const renderStep4 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step 4 - Confirmation</Text>
            <Text style={styles.stepDescription}>Review and confirm your transaction details</Text>
        </View>
    );

    const renderStep5 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step 5 - Processing</Text>
            <Text style={styles.stepDescription}>Your transaction is being processed</Text>
        </View>
    );

    const renderStep6 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>Step 6 - Complete</Text>
            <Text style={styles.stepDescription}>Transaction completed successfully!</Text>
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
    sectionContainer: {
        marginBottom: getHeight(20),
    },
    stepTitle: {
        fontSize: getWidth(16),
        fontFamily: FontName.NewsreaderBold,
        color: WHITE,
    },
    stepDescription: {
        fontSize: getWidth(13),
        fontFamily: 'system',
        color: WHITE,
        lineHeight: getHeight(22),
        opacity: 0.9,
        marginBottom: getHeight(10),
    },
    // Layout styles
    textImageRow: {
        flexDirection: 'row',
        width: '100%',
        marginTop: getHeight(13),
    },
    imageTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: getHeight(0),
    },
    textImageColumn: {
        width: '100%',
        alignItems: 'center',
        marginTop: getHeight(0),
    },
    textSection: {
        marginRight: getWidth(10),
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: getWidth(130),
    },
    textSectionFullWidth: {
        width: '100%',
        justifyContent: 'flex-start',
    },
    imageSectionFullWidth: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginTop: getHeight(13),
    },
    stepImageSmall: {
        width: getWidth(156),
        height: getWidth(74),
        resizeMode: 'contain',
        borderRadius: getWidth(8),
    },
    stepImageFullWidth: {
        width: getWidth(297),
        height: getHeight(51),
        resizeMode: 'contain',
        borderRadius: getWidth(8),
    },
    // Coin selection styles
    coinSelectionContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: getWidth(16),
        padding: getWidth(20),
    },
    stepHeader: {
        alignItems: 'center',
        marginRight: getWidth(16),
    },
    stepNumber: {
        width: getWidth(32),
        height: getWidth(32),
        borderRadius: getWidth(16),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    stepNumberActive: {
        backgroundColor: '#FFD700',
        transform: [{ rotate: '45deg' }],
    },
    stepNumberText: {
        color: WHITE,
        fontSize: getWidth(14),
        fontFamily: FontName.NewsreaderBold,
    },
    stepLine: {
        width: 2,
        height: getHeight(40),
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginTop: getHeight(8),
    },
    stepContent: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: getWidth(8),
        paddingHorizontal: getWidth(12),
        paddingVertical: getHeight(8),
        borderWidth: 1,
        borderColor: '#FFD700',
        marginBottom: getHeight(12),
    },
    searchIcon: {
        width: getWidth(16),
        height: getWidth(16),
        marginRight: getWidth(8),
        tintColor: 'rgba(255, 255, 255, 0.7)',
    },
    searchInput: {
        flex: 1,
        color: WHITE,
        fontSize: getWidth(14),
        fontFamily: FontName.NewsreaderRegular,
    },
    clearIcon: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: getWidth(18),
        marginLeft: getWidth(8),
    },
    coinList: {
        maxHeight: getHeight(200),
    },
    coinItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: getHeight(12),
        paddingHorizontal: getWidth(12),
        borderRadius: getWidth(8),
        marginBottom: getHeight(4),
    },
    coinItemSelected: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    coinLogo: {
        width: getWidth(32),
        height: getWidth(32),
        borderRadius: getWidth(16),
        marginRight: getWidth(12),
    },
    coinInfo: {
        flex: 1,
    },
    coinSymbol: {
        fontSize: getWidth(14),
        fontFamily: FontName.NewsreaderBold,
        color: WHITE,
    },
    coinName: {
        fontSize: getWidth(12),
        fontFamily: FontName.NewsreaderRegular,
        color: 'rgba(255, 255, 255, 0.7)',
    },
    networkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: getWidth(8),
        paddingHorizontal: getWidth(12),
        paddingVertical: getHeight(12),
    },
    networkText: {
        color: WHITE,
        fontSize: getWidth(14),
        fontFamily: FontName.NewsreaderRegular,
    },
    dropdownIcon: {
        width: getWidth(16),
        height: getWidth(16),
        tintColor: 'rgba(255, 255, 255, 0.7)',
    },
    amountInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: getWidth(8),
        paddingHorizontal: getWidth(12),
        paddingVertical: getHeight(12),
        color: WHITE,
        fontSize: getWidth(14),
        fontFamily: FontName.NewsreaderRegular,
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

export default BinanceWebFlow;
