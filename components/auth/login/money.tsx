import { Text } from '@/components';
import { BG_COLOR, WHITE } from '@/constant/colors';
import { FontName } from '@/constant/fontName';
import { getHeight, getWidth } from '@/utils/size';
import { Dimensions, StyleSheet, TextInput, View } from 'react-native';
const { width } = Dimensions.get('window');

const Money = () => {
  const styles = useStyles(width)
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text} numberOfLines={1}>USD</Text>
        <TextInput
          style={styles.dollarInput}
          placeholder="$0.00"
          placeholderTextColor={WHITE}
          keyboardType="numeric"
          defaultValue="$500"
          underlineColorAndroid="transparent"
        />
      </View>
      {/* I and Month */}
      <View style={styles.textContainer}>
        <Text style={styles.inText} numberOfLines={1}>in</Text>
        <TextInput
          style={styles.lineInput}
          placeholder=""
          placeholderTextColor={WHITE}
          defaultValue=""
        />
        <Text style={styles.text} numberOfLines={1}>Month</Text>
      </View>
      {/* investing  */}
      <View style={styles.textContainer}>
        <Text style={styles.inText} numberOfLines={1}>investing</Text>
        <TextInput
          style={styles.lineInput}
          placeholder=""
          placeholderTextColor={WHITE}
          defaultValue=""
        />
        <Text style={styles.text} numberOfLines={1}>Monthly</Text>
      </View>
    </View>
  );
};

export default Money;

const useStyles = (width: number) => StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: WHITE,
    fontSize: getWidth(12),
    fontFamily: FontName.NewsreaderSemiBold,
    textAlign: 'center',
    marginTop: getHeight(16),
    backgroundColor: BG_COLOR,
    width: getWidth(60),
    padding: getHeight(4),
    flexShrink: 0,
  },
  dollar: {
    color: WHITE,
    fontSize: getWidth(20),
    fontFamily: FontName.NewsreaderItalic,
    textAlign: 'center',
    marginTop: getHeight(16),
    marginLeft: getWidth(42),
  },
  dollarInput: {
    color: WHITE,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderItalic,
    textAlign: 'left',
    marginTop: getHeight(16),
    marginLeft: getWidth(10),
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: WHITE,
    padding: 0,
    height: getHeight(30),
    flex: 1,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: getHeight(10),
  },
  horizontalLine: {
    width: getWidth(211),
    height: getHeight(1),
    backgroundColor: WHITE,
    marginHorizontal: getWidth(10),
    alignSelf: 'flex-end',
    marginBottom: getHeight(10),
  },
  lineInput: {
    flex: 1,
    height: getHeight(30),
    backgroundColor: 'transparent',
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: WHITE,
    marginLeft: getWidth(5),
    marginRight: getWidth(5),
    color: WHITE,
    fontSize: getWidth(14),
    fontFamily: FontName.NewsreaderRegular,
    textAlign: 'left',
    padding: 0,
    outline: 'none',
  },
  inText: {
    color: WHITE,
    fontSize: getWidth(32),
    fontFamily: FontName.NewsreaderSemiBold,
    textAlign: 'left',
    marginRight: 0,
    flexShrink: 0,
  },
});
