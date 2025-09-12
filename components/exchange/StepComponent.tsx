import { Text } from '@/components';
import { WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { getHeight, getWidth } from '@/utils/size';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import CoinSelection from './CoinSelection';

export interface StepData {
    title?: string;
    description?: string;
    image?: any;
    layout?: 'text-image-row' | 'image-text-row' | 'text-image-row-column' | 'coin-selection';
    showLoginButtons?: boolean;
    sections?: StepData[];
}

interface StepComponentProps {
    step: StepData;
}

const StepComponent: React.FC<StepComponentProps> = ({ step }) => {
    const renderTextImageRow = (section: StepData) => (
        <View style={styles.textImageRow}>
            <View style={styles.textSection}>
                <Text style={styles.stepTitle}>{section.title}</Text>
                <Text style={styles.stepDescription}>{section.description}</Text>
            </View>
            {section.image && <Image source={section.image} style={styles.stepImageSmall} />}
        </View>
    );

    const renderImageTextRow = (section: StepData) => (
        <View style={styles.imageTextRow}>
            {section.image && <Image source={section.image} style={styles.stepImageSmall} />}
            <View style={styles.textSection}>
                <Text style={styles.stepTitle}>{section.title}</Text>
                <Text style={styles.stepDescription}>{section.description}</Text>
            </View>
        </View>
    );

    const renderTextImageColumn = (section: StepData) => (
        <View style={styles.textImageColumn}>
            <View style={styles.textSectionFullWidth}>
                <Text style={styles.stepTitle}>{section.title}</Text>
                <Text style={[styles.stepDescription, { width: '100%' }]}>{section.description}</Text>
            </View>
            {section.image && (
                <View style={styles.imageSectionFullWidth}>
                    <Image source={section.image} style={styles.stepImageFullWidth} />
                </View>
            )}
        </View>
    );

    const renderSection = (section: StepData) => {
        switch (section.layout) {
            case 'text-image-row':
                return renderTextImageRow(section);
            case 'image-text-row':
                return renderImageTextRow(section);
            case 'text-image-row-column':
                return renderTextImageColumn(section);
            case 'coin-selection':
                return <CoinSelection />;
            default:
                return renderTextImageRow(section);
        }
    };

    // If step has sections, render all sections
    if (step.sections) {
        return (
            <View style={styles.stepContainer}>
                {step.sections.map((section, index) => (
                    <View key={index} style={styles.sectionContainer}>
                        {renderSection(section)}
                    </View>
                ))}
            </View>
        );
    }

    // If step is a single section, render it directly
    return <View style={styles.stepContainer}>{renderSection(step)}</View>;
};

const styles = StyleSheet.create({
    stepContainer: {
        marginBottom: getHeight(30),
    },
    sectionContainer: {
        marginBottom: getHeight(30),
    },
    stepTitle: {
        fontSize: getWidth(20),
        fontFamily: FontName.NewsreaderBold,
        color: WHITE,
    },
    stepDescription: {
        fontSize: getWidth(13),
        fontFamily: 'system',
        color: WHITE,
        lineHeight: getHeight(22),
        opacity: 0.9,
    },
    // Layout Pattern 1: Text left, Image right
    textImageRow: {
        flexDirection: 'row',
        width: '100%',
        marginTop: getHeight(13),
    },
    textSection: {
        marginRight: getWidth(20),
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: getWidth(130),
    },
    stepImageSmall: {
        width: getWidth(156),
        height: getWidth(74),
        resizeMode: 'contain',
        borderRadius: getWidth(8),
    },
    // Layout Pattern 2: Image left, Text right
    imageTextRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: getHeight(25),
    },
    // Layout Pattern 3: Text top, Image bottom
    textImageColumn: {
        width: '100%',
        alignItems: 'center',
        marginTop: getHeight(13),
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
    stepImageFullWidth: {
        width: getWidth(297),
        height: getHeight(51),
        resizeMode: 'contain',
        borderRadius: getWidth(8),
    },
});

export default StepComponent;
