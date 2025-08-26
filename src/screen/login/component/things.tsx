import { StyleSheet, View } from 'react-native';
import Text from '../../../components/Text';
import { getHeight, getWidth } from '../../../utils/size';
import { FontName } from '../../../constant/fontName';
import { BG_COLOR, WHITE } from '../../../constant/colors';

const Things = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.dollar}>a vineyard</Text>
      </View>
      <View style={styles.line}></View>
      {/* I and Month */}
      <View style={styles.textContainer}>
        <Text style={styles.inText}>IN</Text>
        <View style={styles.horizontalLine}></View>
        <Text style={[styles.text, { width: getWidth(60) }]}>Month</Text>
      </View>
      {/* investing  */}
      <View style={styles.textContainer}>
        <Text style={styles.inText}>investing</Text>
        <View style={[styles.horizontalLine, { width: 120 }]}></View>
        <Text style={[styles.text, { width: getWidth(60) }]}>Month</Text>
      </View>
    </View>
  );
};

export default Things;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: WHITE,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderSemiBold,
    textAlign: 'center',
    marginTop: getHeight(16),
    backgroundColor: BG_COLOR,
    width: getWidth(43),
    padding: getHeight(4),
  },
  dollar: {
    color: WHITE,
    fontSize: getWidth(20),
    fontFamily: FontName.NewsreaderItalic,
    alignSelf: 'center',
    marginTop: getHeight(16),
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: getHeight(1),
    backgroundColor: WHITE,
    width: '100%',
    marginTop: getHeight(8),
  },
  horizontalLine: {
    width: getWidth(211),
    height: getHeight(1),
    backgroundColor: WHITE,
    marginHorizontal: getWidth(10),
    alignSelf: 'flex-end',
    marginBottom: getHeight(10),
  },
  inText: {
    color: WHITE,
    fontSize: getWidth(32),
    fontFamily: FontName.NewsreaderSemiBold,
    textAlign: 'center',
    marginTop: getHeight(16),
  },
});
