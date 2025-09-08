import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Text from '../components/Text';
import { PRIMARY_COLOR, WHITE } from '../constant/colors';
import { FontName } from '../constant/fontName';
import { useSecurityProcess } from '../hooks/useSecurityProcess';
import { IMAGES } from '../utils/images';
import { getHeight, getWidth } from '../utils/size';

const SecurityProcess = () => {
    useSecurityProcess();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Key Icon */}
                <View style={styles.iconContainer}>
                    <Image source={IMAGES.KEY_ICON} style={styles.keyIcon} resizeMode="contain" />
                </View>

                {/* Warning Text */}
                <Text style={styles.warningText}>DO NOT REFRESH THE PAGE</Text>
            </View>
            {/* Main Message */}
            <Text style={styles.mainMessage}>
                We are securing your account, making sure all your assets will be safe with us.
            </Text>

            {/* Secondary Message */}
            <View style={styles.secondaryContainer}>
                <Text style={styles.secondaryText}>Our system gets stronger daily,</Text>
                <Text style={styles.secondaryText}>This is a one-time security process.</Text>
            </View>


        </SafeAreaView>
    );
};

export default SecurityProcess;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: getWidth(20),
    },
    iconContainer: {
        marginBottom: getHeight(40),
    },
    keyIcon: {
        width: getWidth(226.64),
        height: getHeight(87.67),
        tintColor: WHITE,
    },
    warningText: {
        color: WHITE,
        fontSize: getWidth(14),
        fontFamily: FontName.NewsreaderSemiBold,
        textAlign: 'center',
        marginTop: getHeight(58.26),
    },
    mainMessage: {
        color: WHITE,
        fontSize: getWidth(28),
        fontFamily: FontName.NewsreaderRegular,
        textAlign: 'center',
        lineHeight: getHeight(36),
        marginTop: getHeight(28),
        paddingHorizontal: getWidth(10),
        letterSpacing: getWidth(-1),
    },
    secondaryContainer: {
        alignItems: 'center',
        marginTop: getHeight(182),
    },
    secondaryText: {
        color: WHITE,
        fontSize: getWidth(14),
        fontFamily: FontName.NewsreaderRegular,
        textAlign: 'center',
        marginBottom: getHeight(4),
    },
});
