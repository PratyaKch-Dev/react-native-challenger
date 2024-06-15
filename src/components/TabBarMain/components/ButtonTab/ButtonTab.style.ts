import {StyleSheet} from 'react-native';
import {colors, fonts} from 'theme';
export default StyleSheet.create({
  container: {
    width: 80,
  },
  icon: {
    alignSelf: 'center',
  },
  text: {
    color: colors.gray[0],
  },
  textActive: {
    color: colors.primary,
    fontFamily: fonts.bold,
  },
});
