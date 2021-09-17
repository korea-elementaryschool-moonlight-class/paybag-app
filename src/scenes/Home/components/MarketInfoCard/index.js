import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

import { TextStyles, Themes } from '~/styles'
import { scaledWidth, scaledHeight, boxShadow } from '~/styles/mixins'

const MarketInfoCard = ({ marketName, ecobagStock }) => {
  return (
    <Container>
      <ImageWrapper>
        <CircleBackground />
      </ImageWrapper>
      <ContentWrapper>
        <MarketName>{marketName}</MarketName>
        <Remark>
          {ecobagStock > 0
            ? `지금 에코백 대여가 가능해요!\n남은 수량 : ${ecobagStock}개`
            : `지금은 에코백 대여가 불가해요..🥲`}
        </Remark>
      </ContentWrapper>
    </Container>
  )
}

export default MarketInfoCard

MarketInfoCard.propTypes = {
  marketName: PropTypes.string,
  ecobagStock: PropTypes.number
}

const Container = styled.View`
  width: ${scaledWidth(343)}px;
  height: 156px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${scaledWidth(16)}px;
  ${boxShadow()};
  background-color: ${Themes.background};
`

const ImageWrapper = styled.View`
  width: 80px;
  height: 80px;
  margin-right: ${scaledWidth(16)}px;
`

const CircleBackground = styled.View`
  width: 100%;
  height: 100%;
  border-radius: ${scaledWidth(40)}px;
  background-color: ${Themes.backgroundWeaken};
`

const ContentWrapper = styled.View`
  flex-direction: column;
  margin-left: ${scaledWidth(24)}px;
`

const MarketName = styled.Text`
  ${TextStyles.Heading6};
  margin-bottom: ${scaledWidth(12)}px;
`

const Remark = styled.Text`
  ${TextStyles.Remark};
`
