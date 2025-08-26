import { View, StyleSheet, Image } from 'react-native';
import Text from '../../../components/Text';
import { IMAGES } from '../../../utils/images';
import { getHeight, getWidth } from '../../../utils/size';
import { PRIMARY_COLOR, WHITE } from '../../../constant/colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontName } from '../../../constant/fontName';

const OnBordingOne = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.image}  source={IMAGES.ONBOARDING_LOGO}/>
      <Text style={styles.title}>Loopin the right direction</Text>
      <Text style={styles.description}>Get access to the right crypto opportunity early.</Text>
    </SafeAreaView>
  );
};

export default OnBordingOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:getWidth(20),
    backgroundColor:PRIMARY_COLOR,
    marginTop:getHeight(-20)

  },
  image: {
    width: getWidth(320),
    height: getHeight(340),
    alignSelf:'center'
  },
  title:{
    color:WHITE,
    fontSize:getWidth(14),
    marginTop:getHeight(68),
    fontFamily:FontName.NewsreaderSemiBold,
    textAlign:'left',
  },
  description:{
    width:getWidth(264),
    color:WHITE,
    fontSize:getWidth(32),
    marginTop:getHeight(0),
    fontFamily:FontName.NewsreaderRegular,
    textAlign:'left',
  }
});