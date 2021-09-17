import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Animated, SafeAreaView } from 'react-native'
import styled from 'styled-components/native'
import { throttle } from 'lodash'
import { useNavigation } from '@react-navigation/native'

import { TextStyles, Themes } from '~/styles'
import { scaledWidth, scaledHeight } from '~/styles/mixins'
import { SvgBack } from '~/icons'

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView)
const AnimatedView = Animated.View

const Header = ({ title }) => {
  const navigation = useNavigation()

  const goBack = useCallback(
    throttle(() => navigation.goBack(), 2000, {
      leading: true,
      trailing: false
    }),
    []
  )

  return (
    <Container>
      <HeaderLeft>
        <BackButton activeOpacity={0.5} onPress={goBack}>
          <SvgBack width={scaledWidth(32)} height={scaledHeight(32)} />
        </BackButton>
      </HeaderLeft>
      <HeaderTitle>{title}</HeaderTitle>
    </Container>
  )
}

export default Header

Header.propTypes = {
  title: PropTypes.string
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

const BackButton = styled.TouchableOpacity``

const HeaderTitle = styled.Text`
  ${TextStyles.Heading5};
  text-align: center;
`
