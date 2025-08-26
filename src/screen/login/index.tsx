import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Text from '../../components/Text';
import { BG_COLOR, PRIMARY_COLOR, WHITE } from '../../constant/colors';
import { IMAGES } from '../../utils/images';
import { getHeight, getWidth } from '../../utils/size';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontName } from '../../constant/fontName';
import useLogin, { Tab } from './useLogin';
import Button from '../../components/Button';
import Money from './component/money';
import Things from './component/things';

const Login = () => {
  const { selectedTab, handleTabPress, handleRegisterPress } = useLogin();

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
      <Text style={styles.text}>
        Your financial goal is possible, tell us. We will match you to the right
        opportunity.
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
      <View style={{ height: getHeight(185), marginTop: getHeight(14) }}>
        {selectedTab === Tab.MONEY && <Money />}
        {selectedTab === Tab.THINGS && <Things />}
      </View>
      {/* Button */}
      <Button
        title="Loopin"
        onPress={handleRegisterPress}
        style={{ marginTop: getHeight(177) }}
      />
      {/* let me look around first */}
      <Text style={styles.lookAroundText}>Let me look around first</Text>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: getWidth(20),
    paddingTop: getHeight(20),
  },
  image: {
    width: getWidth(317),
    height: getHeight(102),
  },
  text: {
    color: WHITE,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    textAlign: 'center',
    marginTop: getHeight(16),
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
  bgImage: {
    width: getWidth(360),
    height: getHeight(354),
    position: 'absolute',
    bottom: -getHeight(10),
    zIndex: -1,
  },
  lookAroundText: {
    color: WHITE,
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderSemiBold,
    textAlign: 'center',
    marginTop: getHeight(16),
    marginBottom: getHeight(16),
    textDecorationLine: 'underline',
  },
});
