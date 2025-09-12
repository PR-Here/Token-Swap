import { Text } from '@/components';
import { WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { getHeight, getWidth } from '@/utils/size';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface SubTabsProps {
    tabs: string[];
    selectedTab: string;
    onTabSelect: (tab: string) => void;
}

const SubTabs: React.FC<SubTabsProps> = ({ tabs, selectedTab, onTabSelect }) => {
    return (
        <View style={styles.container}>
            {tabs.map((tab) => (
                <TouchableOpacity
                    key={tab}
                    style={[
                        styles.tabButton,
                        selectedTab === tab && styles.tabButtonSelected,
                    ]}
                    onPress={() => onTabSelect(tab)}
                >
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="middle"  
                        style={[
                            styles.tabText,
                            selectedTab === tab && styles.tabTextSelected,
                        ]}
                    >
                        {tab}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: getWidth(8),
        borderBottomWidth: getWidth(0.5),
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
    },
    tabButtonSelected: {
        borderBottomWidth: getWidth(2),
        borderBottomColor: WHITE,
        paddingBottom: getHeight(8),
    },
    tabText: {
        fontSize: getWidth(14),
        fontFamily: FontName.NewsreaderMedium,
        color: WHITE,
        textTransform: 'capitalize',
    },
    tabTextSelected: {
        color: WHITE,
    },
});

export default SubTabs;
