import { Text } from '@/components';
import Button, { ButtonSize } from '@/components/common/Button';
import { CoinSelectionMobile, CoinSelectionWeb, Exchange, ExchangeTabs, SubTabs } from '@/components/exchange';
import BinanceMobileFlow from '@/components/exchange/BinanceMobileFlow';
import BinanceWebFlow from '@/components/exchange/BinanceWebFlow';
import { PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { IMAGES } from '@/utils/images';
import { getHeight, getWidth } from '@/utils/size';
import React, { useState } from 'react';
import {
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export enum Tab {
    WEB = 'Web',
    MOBILE = 'Mobile',
}

const ExchangeSelection = () => {
    const [selectedExchange, setSelectedExchange] = useState('BINANCE');
    const [selectedTab, setSelectedTab] = useState(Tab.WEB);

    const exchanges: Exchange[] = [
        { id: 'BINANCE', name: 'BINANCE', logo: IMAGES.BINANCE_LOGO },
        { id: 'OKX', name: 'OKX', logo: IMAGES.OKX_LOGO },
        { id: 'COINBASE', name: 'Coinbase', logo: IMAGES.COINBASE_LOGO, selectedLogo: IMAGES.COINBASE_SELECT },
        { id: 'BYBIT', name: 'BYBIT', logo: IMAGES.BYBIT_LOGO },
    ];

    const tabs = ['Web', 'Mobile'];

    const renderFlow = () => {
        if (selectedExchange === 'BINANCE' && selectedTab === Tab.WEB) {
            return <BinanceWebFlow />;
        }
        if (selectedExchange === 'BINANCE' && selectedTab === Tab.MOBILE) {
            return <BinanceMobileFlow />;
        }
        if (selectedExchange === 'OKX' && selectedTab === Tab.WEB) {
            return <BinanceWebFlow />;
        }
        if (selectedExchange === 'OKX' && selectedTab === Tab.MOBILE) {
            return <BinanceMobileFlow />;
        }
        if (selectedExchange === 'COINBASE' && selectedTab === Tab.WEB) {
            return <CoinSelectionWeb />;
        }
        if (selectedExchange === 'COINBASE' && selectedTab === Tab.MOBILE) {
            return <CoinSelectionMobile />;
        }
        if (selectedExchange === 'BYBIT' && selectedTab === Tab.WEB) {
            return <BinanceWebFlow />;
        }
        if (selectedExchange === 'BYBIT' && selectedTab === Tab.MOBILE) {
            return <BinanceMobileFlow />;
        }
        // Add other flows here as needed
        return <BinanceWebFlow />; // Default fallback
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR} />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Pick an exchange and follow the steps to add funds.</Text>
                <Text style={styles.description}>
                    Never feel lost with us. We will take you step by step.{' '}
                    <Text style={styles.helpLink}>Talk to us</Text> if you need help on this.
                </Text>
            </View>

            {/* Exchange Selection */}
            <ExchangeTabs
                exchanges={exchanges}
                selectedExchange={selectedExchange}
                onExchangeSelect={setSelectedExchange}
            />

            {/* WEB/MOBILE Tabs */}
            <SubTabs
                tabs={tabs}
                selectedTab={selectedTab}
                onTabSelect={(tab) => setSelectedTab(tab as Tab)}
            />

            {/* Flow Content */}
            {renderFlow()}

            {/* Action Button */}
            <Button
                title={`Go to ${selectedExchange}`}
                size={ButtonSize.MEDIUM}
                style={styles.actionButton}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
    },
    header: {
        paddingHorizontal: getWidth(20),
        paddingTop: getHeight(20),
        paddingBottom: getHeight(20),
    },
    title: {
        fontSize: getWidth(20),
        fontFamily: FontName.NewsreaderBold,
        color: WHITE,
        marginBottom: getHeight(10),
    },
    description: {
        fontSize: getWidth(12),
        fontFamily: FontName.NewsreaderRegular,
        color: WHITE,
        opacity: 0.9,
    },
    helpLink: {
        color: '#FFD700',
        textDecorationLine: 'underline',
    },
    actionButton: {
        marginBottom: getHeight(10),
        alignSelf: 'center',
        width: '90%',
        marginHorizontal: getWidth(20),
    },
});

export default ExchangeSelection;