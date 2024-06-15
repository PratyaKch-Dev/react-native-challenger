import {StyleSheet} from 'react-native'
import {space, colors, fontSizes, fonts} from 'theme'

export default StyleSheet.create({
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  textArea: {
    height: 50,
    borderRadius: 7,
    width: '100%',
    color: 'black',
    fontSize: fontSizes[2],
    backgroundColor: colors.gray[0],
    paddingLeft: space[3],
    fontFamily: fonts.sarabun,
  },
  icon: {
    height: '100%',
    position: 'absolute',
    right: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 24,
    height: 24,
  },
})
