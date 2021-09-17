import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import { observer } from 'mobx-react'

import { TextStyles, Themes } from '~/styles'
import { scaledWidth, scaledHeight, boxShadow } from '~/styles/mixins'

const History = ({ rentMarket, returnMarket, rentDate, returnDate }) => {
  return (
    <Container>
      <MarketWrapper>
        <Title>{rentMarket}</Title>
        <Title>👉 {returnMarket}</Title>
      </MarketWrapper>
      <DateWrapper>
        <Remark>빌린 날짜 : {rentDate}</Remark>
        <Remark>반납 날짜 : {returnDate}</Remark>
      </DateWrapper>
    </Container>
  )
}

export default observer(History)

History.propTypes = {
  rentMarket: PropTypes.string,
  returnMarket: PropTypes.string,
  rentDate: PropTypes.string,
  returnDate: PropTypes.string
}

const Container = styled.View`
  width: 100%;
  height: ${scaledHeight(152)}px;
  background-color: ${Themes.background};
  border-radius: ${scaledWidth(8)}px;
  ${boxShadow(
    '#8a8a8e',
    { height: scaledHeight(8), width: 0 },
    scaledWidth(12),
    0.08
  )};
  padding-horizontal: ${scaledWidth(20)}px;
  padding-vertical: ${scaledHeight(20)}px;
  margin-vertical: ${scaledHeight(8)}px;
`

const MarketWrapper = styled.View`
  flex-direction: column;
  margin-bottom: ${scaledHeight(16)}px;
`

const DateWrapper = styled.View`
  flex-direction: column;
`

const Title = styled.Text`
  ${TextStyles.Heading6};
`

const Remark = styled.Text`
  ${TextStyles.Body3};
  color: ${Themes.remark};
`
