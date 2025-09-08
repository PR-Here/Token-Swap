import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { WHITE } from '../constant/colors';
import { FontName } from '../constant/fontName';
import { getHeight, getWidth } from '../utils/size';
import Text from './Text';
import { router } from 'expo-router';

interface AppHeaderProps {
    title: string;
    onBackPress?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, onBackPress }) => {

    const onBack = () => {
        if (onBackPress) {
            onBackPress();
            return;
        }
        router.back();
    };

    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onBack} style={styles.clickableArea}>
                <Ionicons name="chevron-back" size={getWidth(20)} color={WHITE} />
                <Text style={styles.headerTitle}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: getWidth(20),
        paddingVertical: getHeight(16),
        minHeight: getHeight(56),
        height: getHeight(19),

    },
    clickableArea: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: getWidth(8),
        justifyContent: 'flex-start',
    },
    headerTitle: {
        color: WHITE,
        fontSize: getWidth(16),
        fontFamily: FontName.NewsreaderSemiBold,
        textAlignVertical: 'center',
        marginLeft: getWidth(8),
        marginBottom: getHeight(2),
    },
});

export default AppHeader;
