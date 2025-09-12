import { WHITE } from '@/constant/colors';
import { getHeight, getWidth } from '@/utils/size';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export interface Exchange {
    id: string;
    name: string;
    logo: any;
    selectedLogo?: any;
}

interface ExchangeTabsProps {
    exchanges: Exchange[];
    selectedExchange: string;
    onExchangeSelect: (exchangeId: string) => void;
}

const ExchangeTabs: React.FC<ExchangeTabsProps> = ({
    exchanges,
    selectedExchange,
    onExchangeSelect,
}) => {
    return (
        <View style={styles.container}>
            <View style={styles.scrollContainer}>
                {exchanges.map((exchange) => (
                    <TouchableOpacity
                        key={exchange.id}
                        style={[
                            styles.exchangeButton,
                            selectedExchange === exchange.id && styles.exchangeButtonSelected,
                        ]}
                        onPress={() => onExchangeSelect(exchange.id)}
                    >
                        <Image
                            source={
                                exchange.id === 'COINBASE' && selectedExchange === exchange.id
                                    ? exchange.selectedLogo
                                    : exchange.logo
                            }
                            style={[
                                styles.exchangeLogo,
                                exchange.id === 'COINBASE'
                                    ? styles.exchangeLogoCoinbase
                                    : selectedExchange === exchange.id
                                    ? styles.exchangeLogoSelected
                                    : styles.exchangeLogoUnselected,
                            ]}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: getWidth(20),
        marginBottom: getHeight(20),
    },
    scrollContainer: {
        flexDirection: 'row',
        paddingHorizontal: getWidth(0),
    },
    exchangeButton: {
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        width: getWidth(70),
        height: getHeight(50),
        borderRadius: getWidth(2),
        paddingHorizontal: getWidth(8),
        paddingVertical: getHeight(8),
        marginRight: getWidth(12),
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    exchangeButtonSelected: {
        backgroundColor: WHITE,
        borderWidth: 2,
        borderColor: '#4A90E2',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    exchangeLogo: {
        width: getWidth(40),
        height: getWidth(40),
        resizeMode: 'contain',
    },
    exchangeLogoSelected: {
        tintColor: '#4A90E2',
    },
    exchangeLogoCoinbase: {
        // No tint color for Coinbase logos - they have their own colors
    },
    exchangeLogoUnselected: {
        tintColor: WHITE,
    },
});

export default ExchangeTabs;
