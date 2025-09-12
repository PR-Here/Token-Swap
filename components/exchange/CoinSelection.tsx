import { Text } from '@/components';
import { WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { IMAGES } from '@/utils/images';
import { getHeight, getWidth } from '@/utils/size';
import React, { useState } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface Coin {
    id: string;
    name: string;
    symbol: string;
    logo: any;
}

interface CoinSelectionProps {
    onCoinSelect?: (coin: Coin) => void;
    onNetworkSelect?: (network: string) => void;
    onAmountChange?: (amount: string) => void;
}

const CoinSelection: React.FC<CoinSelectionProps> = ({
    onCoinSelect,
    onNetworkSelect,
    onAmountChange,
}) => {
    const [selectedCoin, setSelectedCoin] = useState('BTC');
    const [selectedNetwork, setSelectedNetwork] = useState('BEP20');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [searchText, setSearchText] = useState('BTC');

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

    return (
        <View style={styles.container}>
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
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: getWidth(16),
        padding: getWidth(20),
        marginHorizontal: getWidth(20),
    },
    stepContainer: {
        flexDirection: 'row',
        marginBottom: getHeight(20),
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
    stepTitle: {
        fontSize: getWidth(16),
        fontFamily: FontName.NewsreaderMedium,
        color: WHITE,
        marginBottom: getHeight(12),
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
});

export default CoinSelection;
