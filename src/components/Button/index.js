import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { TextStyles } from '~/styles'
import { scaledWidth, boxShadow } from '~/styles/mixins'

/**
 * Button 컴포넌트
 *
 * @param { width, height, color, innerText, onPress }
 * @returns
 */
const Button = ({ width, height, color, innerText, onPress }) => {
  return (
    <Container>
      <ButtonWrapper
        activeOpacity={0.5}
        style={{ width: width, height: height, backgroundColor: color }}
        onPress={onPress}
      >
        <ButtonInnerText>{innerText}</ButtonInnerText>
      </ButtonWrapper>
    </Container>
  )
}

export default Button

Button.propTypes = {
  width: PropTypes.func,
  height: PropTypes.func,
  color: PropTypes.string,
  innerText: PropTypes.string,
  onPress: PropTypes.func
}

const Container = styled.View``

const ButtonWrapper = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: ${scaledWidth(8)}px;
  ${boxShadow()};
`

const ButtonInnerText = styled.Text`
  ${TextStyles.Heading6};
`
