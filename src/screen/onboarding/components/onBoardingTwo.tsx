import { View, StyleSheet, Image } from 'react-native';
import Text from '../../../components/Text';
import { IMAGES } from '../../../utils/images';
import { getHeight, getWidth } from '../../../utils/size';
import { PRIMARY_COLOR, WHITE } from '../../../constant/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontName } from '../../../constant/fontName';

const OnBoardingTwo = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image} source={IMAGES.APPLOGO} />
      <Text style={styles.title}>Built for trust, powered by the best.</Text>

      <View style={styles.view}>
        {/* 1st view */}
        <View style={styles.imageView}>
          <Image
            resizeMode="contain"
            style={styles.imageEterium}
            source={IMAGES.ETHERIUM}
          />
        </View>
        <Text style={styles.view1Text}>
          The world's most secure blockchain.
        </Text>
        {/* 2nd view */}
        <View style={[styles.imageView, { marginTop: getHeight(16) }]}>
          <Image
            resizeMode="contain"
            style={styles.imageEterium}
            source={IMAGES.PROVY}
          />
        </View>
        <Text style={styles.view1Text}>Non-custodial wallets, simplified.</Text>
        {/* 3rd view */}
        <View style={[styles.imageView, { marginTop: getHeight(16) }]}>
          <Image
            resizeMode="contain"
            style={styles.imageEterium}
            source={IMAGES.BUNGEE}
          />
        </View>
        <Text style={styles.view1Text}>Instant, low-cost swap</Text>
      </View>
      
    </SafeAreaView>
  );
};

export default OnBoardingTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: getWidth(20),
    backgroundColor: PRIMARY_COLOR,
    marginTop:getHeight(-20)
  },
  image: {
    width: getWidth(50),
    height: getHeight(50),
  },
  title: {
    width: getWidth(317),
    color: WHITE,
    fontSize: getWidth(36),
    marginTop: getHeight(16),
    fontFamily: FontName.NewsreaderMedium,
    textAlign: 'left',
  },
  view: {
    width: getWidth(317),
    marginTop: getHeight(29),
  },
  imageView: {
    width: getWidth(82),
    height: getHeight(82),
    backgroundColor: WHITE,
    borderRadius: getWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    gap: getWidth(8),
  },
  imageEterium: {
    width: getWidth(70),
    height: getHeight(18),
  },
  view1Text: {
    color: WHITE,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderSemiBold,
    textAlign: 'left',
    marginTop: getHeight(8),
  },
});
