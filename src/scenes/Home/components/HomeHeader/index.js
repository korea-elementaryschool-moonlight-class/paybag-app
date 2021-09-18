import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Animated, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'

import { TextStyles, Themes } from '~/styles'
import { scaledWidth, scaledHeight } from '~/styles/mixins'
import { SvgMenu } from '~/icons'

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView)
const AnimatedView = Animated.View

/**
 * Home Header 컴포넌트
 *
 * @param { onPress }
 * @returns
 */
const HomeHeader = ({ onPress }) => {
  return (
    <Container>
      <HeaderLeft>
        <MenuButton activeOpacity={0.5} onPress={onPress}>
          <SvgMenu width={scaledWidth(32)} height={scaledHeight(32)} />
        </MenuButton>
      </HeaderLeft>
      <HeaderTitle>PAYBAG</HeaderTitle>
    </Container>
  )
}

export default HomeHeader

HomeHeader.propTypes = {
  onPress: PropTypes.func
}

const HeaderLeft = styled(AnimatedView)`
  position: absolute;
  left: ${scaledWidth(16)}px;
  bottom: 0;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const Container = styled(AnimatedSafeAreaView)`
  width: 100%;
  height: ${scaledHeight(50)}px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const MenuButton = styled.TouchableOpacity``

const HeaderTitle = styled.Text`
  ${TextStyles.Heading5};
  text-align: center;
`
