import * as Font from 'expo-font';

export const loadFonts = async () => {
  await Font.loadAsync({
    'Newsreader-Regular': require('../assets/fonts/Newsreader_60pt-Regular.ttf'),
    'Newsreader-Bold': require('../assets/fonts/Newsreader_60pt-Bold.ttf'),
    'Newsreader-BoldItalic': require('../assets/fonts/Newsreader_60pt-BoldItalic.ttf'),
    'Newsreader-ExtraBold': require('../assets/fonts/Newsreader_60pt-ExtraBold.ttf'),
    'Newsreader-ExtraBoldItalic': require('../assets/fonts/Newsreader_60pt-ExtraBoldItalic.ttf'),
    'Newsreader-ExtraLight': require('../assets/fonts/Newsreader_60pt-ExtraLight.ttf'),
    'Newsreader-ExtraLightItalic': require('../assets/fonts/Newsreader_60pt-ExtraLightItalic.ttf'),
    'Newsreader-Italic': require('../assets/fonts/Newsreader_60pt-Italic.ttf'),
    'Newsreader-Light': require('../assets/fonts/Newsreader_60pt-Light.ttf'),
    'Newsreader-LightItalic': require('../assets/fonts/Newsreader_60pt-LightItalic.ttf'),
    'Newsreader-Medium': require('../assets/fonts/Newsreader_60pt-Medium.ttf'),
    'Newsreader-MediumItalic': require('../assets/fonts/Newsreader_60pt-MediumItalic.ttf'),
    'Newsreader-SemiBold': require('../assets/fonts/Newsreader_60pt-SemiBold.ttf'),
    'Newsreader-SemiBoldItalic': require('../assets/fonts/Newsreader_60pt-SemiBoldItalic.ttf'),
    // SF Pro Text fonts

  });
};
