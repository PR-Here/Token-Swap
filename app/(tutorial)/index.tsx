import { PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { getHeight, getWidth } from '@/utils/size';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import {
    Dimensions,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CopilotProvider, useCopilot, walkthroughable } from 'react-native-copilot';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get('window');

const CopilotText = walkthroughable(Text);
const CopilotView = walkthroughable(View);
const CopilotTouchableOpacity = walkthroughable(TouchableOpacity);

const TutorialContent = () => {
  const { start, stop, goToNext, goToPrev } = useCopilot();
  const [currentStep, setCurrentStep] = React.useState(0);

  const tutorialSteps = [
    { id: 'flip', title: 'Tap to Flip', gesture: 'tap', tabName: 'Flip' },
    { id: 'buy', title: 'Swipe Right to Buy', gesture: 'swipe-right', tabName: 'Buy' },
    { id: 'sell', title: 'Swipe Left to Sell', gesture: 'swipe-left', tabName: 'Sell' },
    { id: 'save', title: 'Double Tap to Save', gesture: 'double-tap', tabName: 'Save' },
    { id: 'share', title: 'Swipe up to Share', gesture: 'swipe-up', tabName: 'Share' },
    { id: 'skip', title: 'Swipe down to Skip', gesture: 'swipe-down', tabName: 'Skip' },
  ];

  const handleStartTutorial = useCallback(() => {
    start();
  }, [start]);

  const handleNext = useCallback(() => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
      goToNext();
    } else {
      stop();
    }
  }, [currentStep, tutorialSteps.length, goToNext, stop]);

  const handlePrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      goToPrev();
    }
  }, [currentStep, goToPrev]);

  const getGestureIcon = (gesture: string) => {
    switch (gesture) {
      case 'tap':
        return 'hand-left-outline';
      case 'swipe-right':
        return 'arrow-forward-outline';
      case 'swipe-left':
        return 'arrow-back-outline';
      case 'double-tap':
        return 'hand-left-outline';
      case 'swipe-up':
        return 'arrow-up-outline';
      case 'swipe-down':
        return 'arrow-down-outline';
      default:
        return 'hand-left-outline';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY_COLOR} />
      
      {/* Semi-transparent overlay background */}
      <LinearGradient
        colors={['#0108DC', 'rgba(1, 8, 220, 0.5)', '#0108DC']}
        locations={[0.2015, 0.517, 0.9588]}
        style={styles.overlayBackground}
      />
      
      {/* Header */}
      <View style={[styles.header, styles.contentAboveOverlay]}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImage}>
            <Text style={styles.profileText}>A</Text>
          </View>
        </View>
        <Text style={styles.headerTitle}>6 things you can do with the card.</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="chevron-down" size={20} color={WHITE} />
        </TouchableOpacity>
      </View>

      {/* Navigation Tabs */}
      <View style={[styles.tabsContainer, styles.contentAboveOverlay]}>
        {tutorialSteps.map((step, index) => (
          <TouchableOpacity
            key={step.id}
            style={[
              styles.tab,
              index === currentStep && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.tabText,
                index === currentStep && styles.activeTabText,
              ]}
            >
              {step.tabName}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Main Card */}
      <View style={[styles.cardContainer, styles.contentAboveOverlay]}>
        <CopilotView
          style={styles.card}
          copilot={{
            text: tutorialSteps[currentStep].title,
            order: 1,
            name: tutorialSteps[currentStep].id,
          }}
        >
           <LinearGradient
             colors={['transparent', 'transparent', 'transparent', 'transparent']}
             style={styles.cardGradient}
           >
            {/* Card Content - Transparent to show home screen behind */}
            <View style={styles.transparentContent}>
              {/* All content is transparent - only border is visible */}
            </View>

          </LinearGradient>
        </CopilotView>

         {/* Gesture Icon Overlay */}
         <View style={[
           styles.gestureOverlay,
           currentStep === 4 && styles.gestureOverlayTop, // For "Swipe up to Share"
           styles.contentAboveOverlay
         ]}>
           <Ionicons
             name={getGestureIcon(tutorialSteps[currentStep].gesture)}
             size={40}
             color={WHITE}
           />
           <Text style={styles.gestureText}>{tutorialSteps[currentStep].title}</Text>
         </View>
      </View>

      {/* Bottom Navigation */}
      {currentStep < 5 ? (
        <View style={[styles.bottomNav, styles.contentAboveOverlay]}>
          <Text style={styles.bottomNavText}>Learn it later</Text>
          <TouchableOpacity style={styles.bottomNavItem}>
            <Ionicons name="chevron-forward" size={24} color={WHITE} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={[styles.loopinButtonContainer, styles.contentAboveOverlay]}>
          <TouchableOpacity style={styles.loopinButton}>
            <Text style={styles.loopinButtonText}>Loopin</Text>
          </TouchableOpacity>
        </View>
      )}

    </SafeAreaView>
  );
};

const Tutorial = () => {
  return (
    <CopilotProvider>
      <TutorialContent />
    </CopilotProvider>
  );
};

export { TutorialContent };
export default Tutorial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  overlayBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  contentAboveOverlay: {
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: getWidth(20),
    paddingTop: getHeight(20),
    paddingBottom: getHeight(16),
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: getWidth(40),
    height: getWidth(40),
    borderRadius: getWidth(20),
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: getWidth(12),
  },
  profileText: {
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderBold,
    color: PRIMARY_COLOR,
  },
  headerTitle: {
    flex: 1,
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderSemiBold,
    color: WHITE,
    textAlign: 'center',
  },
  headerButton: {
    width: getWidth(40),
    height: getWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: getWidth(20),
    marginBottom: getHeight(20),
    gap: getWidth(8),
  },
  tab: {
    flex: 1,
    paddingVertical: getHeight(8),
    paddingHorizontal: getWidth(12),
    borderRadius: getWidth(6),
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: WHITE,
  },
  tabText: {
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderSemiBold,
    color: WHITE,
  },
  activeTabText: {
    color: PRIMARY_COLOR,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: getWidth(20),
    justifyContent: 'center',
  },
  card: {
    borderRadius: getWidth(12),
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: WHITE,
  },
  cardGradient: {
    padding: getWidth(20),
  },
  transparentContent: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  gestureOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -getWidth(50) }, { translateY: -getHeight(50) }],
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: getWidth(16),
    borderRadius: getWidth(12),
  },
  gestureOverlayTop: {
    top: '30%',
  },
  gestureText: {
    color: WHITE,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderSemiBold,
    marginTop: getHeight(8),
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: getWidth(20),
    paddingVertical: getHeight(16),
  },
  bottomNavItem: {
    width: getWidth(40),
    alignItems: 'center',
  },
  bottomNavText: {
    color: WHITE,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
  },
  loopinButtonContainer: {
    paddingHorizontal: getWidth(20),
    paddingBottom: getHeight(20),
  },
  loopinButton: {
    backgroundColor: 'black',
    paddingVertical: getHeight(16),
    borderRadius: getWidth(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  loopinButtonText: {
    color: WHITE,
    fontSize: getWidth(16),
    fontFamily: FontName.NewsreaderSemiBold,
  },
});
