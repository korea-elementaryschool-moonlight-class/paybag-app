import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'

import { TextStyles, Themes } from '~/styles'
import { scaledWidth, scaledHeight, boxShadow } from '~/styles/mixins'

/**
 * 지도에 표시된 Market 상세 정보 카드 컴포넌트
 *
 * @param { marketName, ecobagStock }
 * @returns
 */
const MarketInfoCard = ({ marketName, ecobagStock }) => {
  return (
    <Container>
      <ImageWrapper>
        {marketName.includes('GS25') && (
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('~/images/gs25.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
        {marketName.includes('CU') && (
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('~/images/cu.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
        {marketName.includes('세븐일레븐') && (
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('~/images/seveneleven.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
        {marketName.includes('미니스톱') && (
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('~/images/ministop.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
        {marketName.includes('이마트24') && (
          <FastImage
            style={{ width: '100%', height: '100%' }}
            source={require('~/images/emart24.png')}
            resizeMode={FastImage.resizeMode.contain}
          />
        )}
      </ImageWrapper>
      <ContentWrapper>
        <MarketName>{marketName.toString()}</MarketName>
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
  justify-content: center;
  align-items: center;
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
