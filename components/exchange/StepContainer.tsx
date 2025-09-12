import { getWidth } from '@/utils/size';
import React from 'react';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import StepComponent, { StepData } from './StepComponent';

const { width: screenWidth } = Dimensions.get('window');

interface StepContainerProps {
    steps: StepData[];
    currentStep: number;
    onStepChange: (step: number) => void;
}

const StepContainer: React.FC<StepContainerProps> = ({
    steps,
    currentStep,
    onStepChange,
}) => {
    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const stepIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
                    onStepChange(stepIndex);
                }}
                style={styles.scrollView}
            >
                {steps.map((step, index) => (
                    <View key={index} style={styles.stepCard}>
                        <StepComponent step={step} />
                    </View>
                ))}
            </ScrollView>
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
        backgroundColor: 'transparent',
        borderRadius: getWidth(20),
        width: screenWidth,
        paddingHorizontal: getWidth(20),
    },
});

export default StepContainer;
