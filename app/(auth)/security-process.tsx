import { Text } from '@/components';
import { PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { useSecurityProcess } from '@/hooks/useSecurityProcess';
import { IMAGES } from '@/utils/images';
import { getHeight, getWidth } from '@/utils/size';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SecurityProcess = () => {
    useSecurityProcess();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Key Icon */}
                <View style={styles.iconContainer}>
                    <Image source={IMAGES.KEY_ICON} style={styles.keyIcon} resizeMode="contain" />
                </View>

                {/* Title */}
                <Text style={styles.title}>Security Process</Text>

                {/* Description */}
                <Text style={styles.description}>
                    We're setting up your secure account. This will only take a moment.
                </Text>

                {/* Loading indicator */}
                <View style={styles.loadingContainer}>
                    <View style={styles.loadingDot} />
                    <View style={styles.loadingDot} />
                    <View style={styles.loadingDot} />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default SecurityProcess;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY_COLOR,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: getWidth(40),
    },
    iconContainer: {
        marginBottom: getHeight(40),
    },
    keyIcon: {
        width: getWidth(120),
        height: getHeight(120),
    },
    title: {
        fontSize: getWidth(28),
        fontFamily: FontName.NewsreaderBold,
        color: WHITE,
        textAlign: 'center',
        marginBottom: getHeight(16),
    },
    description: {
        fontSize: getWidth(16),
        fontFamily: FontName.NewsreaderRegular,
        color: WHITE,
        textAlign: 'center',
        lineHeight: getHeight(24),
        opacity: 0.8,
        marginBottom: getHeight(40),
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: getWidth(8),
    },
    loadingDot: {
        width: getWidth(8),
        height: getWidth(8),
        borderRadius: getWidth(4),
        backgroundColor: WHITE,
        opacity: 0.6,
    },
});
