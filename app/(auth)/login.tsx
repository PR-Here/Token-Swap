import { Button, ButtonSize, Text } from '@/components';
import Money from '@/components/auth/login/money';
import Things from '@/components/auth/login/things';
import { BG_COLOR, PRIMARY_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import useLogin, { Tab } from '@/hooks/useLogin';
import { IMAGES } from '@/utils/images';
import { getHeight, getWidth } from '@/utils/size';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Login = () => {
  const { selectedTab, handleTabPress, handleRegisterPress } = useLogin();
  const [buttonOffset, setButtonOffset] = useState(getHeight(60));

  useEffect(() => {
    const timer = setTimeout(() => {
      setButtonOffset(0);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Image
        resizeMode="contain"
        source={IMAGES.HEADER_LOGO}
        style={styles.image}
      />
      {/* BG Image */}
      <Image
        resizeMode="contain"
        source={IMAGES.LOGIN_BG_IMAGE}
        style={styles.bgImage}
      />
      {/* Bottom Gradient Overlay */}
      <LinearGradient
        colors={['rgba(1, 8, 220, 0)', '#010476']}
        locations={[0.135, 1]}
        style={styles.gradientOverlay}
      />
      <Text style={styles.text}>
        {`Your financial goal is possible, tell us.\nWe will match you to the right opportunity.`}
      </Text>
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <Text style={styles.iwantText}>I want</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: selectedTab === Tab.MONEY ? WHITE : BG_COLOR,
              },
            ]}
            onPress={() => handleTabPress(Tab.MONEY)}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedTab === Tab.MONEY ? BG_COLOR : WHITE },
              ]}
            >
              Money
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              {
                backgroundColor: selectedTab === Tab.THINGS ? WHITE : BG_COLOR,
              },
            ]}
            onPress={() => handleTabPress(Tab.THINGS)}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedTab === Tab.THINGS ? BG_COLOR : WHITE },
              ]}
            >
              Things
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Money or Things */}
      <View style={styles.contentContainer}>
        {selectedTab === Tab.MONEY && <Money />}
        {selectedTab === Tab.THINGS && <Things />}
      </View>
      {/* Button */}
      <View style={[styles.buttonContainer, { marginTop: buttonOffset }]}>
        <Button
          title="Loopin"
          onPress={handleRegisterPress}
          size={ButtonSize.LARGE}
          style={styles.button}
        />
        {/* let me look around first */}
        <Text style={styles.lookAroundText}>Let me look around first</Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: getWidth(20),
  },
  image: {
    width: getWidth(317),
    height: getHeight(102),
  },
  text: {
    color: WHITE,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    textAlign: 'left',
    marginTop: getHeight(16),
    letterSpacing: getWidth(0.5),
  },
  tabsContainer: {
    flexDirection: 'row',
    marginTop: getHeight(32),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    gap: getWidth(10),
    marginLeft: getWidth(15),
    backgroundColor: '#00000033',
    height: getHeight(42),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: getWidth(15),
    paddingVertical: getHeight(10),
    borderRadius: 4,
  },
  tab: {
    height: getHeight(24),
    backgroundColor: WHITE,
    paddingHorizontal: getWidth(10),
    paddingVertical: getHeight(4),
    borderRadius: 4,
  },
  tabText: {
    color: WHITE,
    fontSize: getWidth(10),
    fontFamily: FontName.NewsreaderSemiBold,
  },
  iwantText: {
    color: WHITE,
    fontSize: getWidth(32),
    fontFamily: FontName.NewsreaderSemiBold,
  },
  contentContainer: {
    flex: 1,
    marginTop: getHeight(0),
    justifyContent: 'center',
  },
  buttonContainer: {
  },
  bgImage: {
    width: getWidth(360),
    height: getHeight(354),
    position: 'absolute',
    bottom: -getHeight(50),
    left: getWidth(5),
    zIndex: -1,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: getHeight(250),
    zIndex: 0,
  },
  lookAroundText: {
    color: WHITE,
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderExtraBold,
    textAlign: 'center',
    marginTop: getHeight(16),
    textDecorationLine: 'underline',
  },
  button: {
    width: getWidth(327),
    height: getHeight(58),

  },
});
