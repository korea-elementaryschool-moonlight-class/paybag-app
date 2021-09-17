import { StyleSheet } from 'react-native'
import { normalize } from './mixins'
import Themes from './themes'

const TextStyles = StyleSheet.create({
  Heading1: {
    fontSize: normalize(36),
    lineHeight: normalize(46.8),
    fontWeight: 'bold',
    letterSpacing: -0.2,
    color: Themes.text
  },
  Heading2: {
    fontSize: normalize(32),
    lineHeight: normalize(41.6),
    fontWeight: 'bold',
    letterSpacing: -0.2,
    color: Themes.text
  },
  Heading3: {
    fontSize: normalize(24),
    lineHeight: normalize(36),
    fontWeight: 'bold',
    letterSpacing: -0.2,
    color: Themes.text
  },
  Heading4: {
    fontSize: normalize(21),
    lineHeight: normalize(31.5),
    fontWeight: 'bold',
    letterSpacing: -0.2,
    color: Themes.text
  },
  Heading5: {
    fontSize: normalize(18),
    lineHeight: normalize(28.8),
    fontWeight: 'bold',
    letterSpacing: -0.1,
    color: Themes.text
  },
  Heading6: {
    fontSize: normalize(16),
    lineHeight: normalize(25.6),
    fontWeight: 'bold',
    letterSpacing: -0.1,
    color: Themes.text
  },
  Body1: {
    fontSize: normalize(18),
    lineHeight: normalize(28.8),
    fontWeight: 'normal',
    letterSpacing: -0.1,
    color: Themes.text
  },
  Body2: {
    fontSize: normalize(16),
    lineHeight: normalize(25.6),
    fontWeight: 'normal',
    letterSpacing: -0.1,
    color: Themes.text
  },
  Body3: {
    fontSize: normalize(14),
    lineHeight: normalize(22.4),
    fontWeight: 'normal',
    letterSpacing: -0.1,
    color: Themes.text
  },
  Remark: {
    fontSize: normalize(12),
    lineHeight: normalize(19.2),
    fontWeight: 'normal',
    letterSpacing: -0.1,
    color: Themes.remark
  }
})

export { TextStyles, Themes }
