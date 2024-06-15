import {Dimensions, Platform, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');

import {colors} from 'theme';
export default StyleSheet.create({
  container: {},
  inner: {
    width: width + 2,
    marginLeft: -1,
    borderColor: colors.gray[1],
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    top: -19,
    paddingHorizontal: width * 0.1,
    height: 70,
    backgroundColor: colors.darkPurple,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
});
