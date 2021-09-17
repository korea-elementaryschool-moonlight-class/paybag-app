import { Dimensions, PixelRatio } from 'react-native'

const GUIDELINE_WIDTH = 375
const GUIDELINE_HEIGHT = 812

// https://stackoverflow.com/questions/44978804/whats-the-difference-between-window-and-screen-in-the-dimensions-api
const SCREEN_WIDTH = () => Dimensions.get('screen').width
const SCREEN_HEIGHT = () => Dimensions.get('screen').height

const scale = SCREEN_WIDTH() / GUIDELINE_WIDTH

const getScaledWidthByScreen = (width: number) =>
  Math.ceil((SCREEN_WIDTH() * width) / GUIDELINE_WIDTH)
const getScaledHeightByScreen = (height: number) =>
  Math.ceil((SCREEN_HEIGHT() * height) / GUIDELINE_HEIGHT)

export const scaledWidth = (width) => getScaledWidthByScreen(width)
export const scaledHeight = (height) => getScaledHeightByScreen(height)

export const normalize = (size) =>
  Math.round(PixelRatio.roundToNearestPixel(size * scale))

export function boxShadow(
  color = '#8a8a8e',
  offset = { height: 8, width: 0 },
  radius = 12,
  opacity = 0.08
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius
  }
}
