import { WHITE } from '@/constant/colors';
import { getHeight, getWidth } from '@/utils/size';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface PaginationDotsProps {
    totalSteps: number;
    currentStep: number;
}

const PaginationDots: React.FC<PaginationDotsProps> = ({ totalSteps, currentStep }) => {
    return (
        <View style={styles.container}>
            <View style={styles.dotsContainer}>
                {Array.from({ length: totalSteps }, (_, index) => (
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
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: getHeight(10),
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

export default PaginationDots;
