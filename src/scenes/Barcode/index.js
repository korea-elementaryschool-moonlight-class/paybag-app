import React from 'react'
import styled from 'styled-components/native'
import { observer } from 'mobx-react'
import FastImage from 'react-native-fast-image'
import dayjs from 'dayjs'

import { TextStyles, Themes } from '~/styles'
import { scaledWidth, scaledHeight } from '~/styles/mixins'

import Header from '~/components/Header'

import { User } from '~/stores'

const Barcode = () => {
  return (
    <Container>
      <Header title="에코백 이용하기" />
      <ThumbnailWrapper>
        <FastImage
          style={{ width: scaledWidth(252), height: scaledHeight(252) }}
          source={require('~/images/ecobag-thumbnail.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </ThumbnailWrapper>
      <Title>오늘도 에코백과 함께</Title>
      <BarcodeWrapper>
        <BarcodeImage
          source={{ uri: User._loggedIn.barcode }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <BarcodeNumber>{User._loggedIn.barcode_id}</BarcodeNumber>
      </BarcodeWrapper>
      <BarcodeInfoWrapper>
        {/* <InfoWrapper>
          <Remar...k>사용처</Remar...k>
          <Remark style={{ color: Themes.text }}>CU 강남센타점</Remark>
        </InfoWrapper> */}
        <InfoWrapper>
          <Remark>반납 일자</Remark>
          <Remark style={{ color: Themes.text }}>
            {dayjs(new Date().setDate(new Date().getDate() + 7)).format(
              '~YYYY.MM.DD'
            )}
          </Remark>
        </InfoWrapper>
      </BarcodeInfoWrapper>
    </Container>
  )
}

export default observer(Barcode)

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${Themes.background};
  align-items: center;
`

const ThumbnailWrapper = styled.View`
  margin-vertical: ${scaledHeight(40)}px;
  align-items: center;
`

const Title = styled.Text`
  ${TextStyles.Heading4};
  margin-bottom: ${scaledHeight(16)}px;
`

const BarcodeWrapper = styled.View`
  width: ${scaledWidth(311)}px;
  height: ${scaledHeight(114)}px;
  align-items: center;
  margin-bottom: ${scaledHeight(52)}px;
`

const BarcodeImage = styled(FastImage)`
  width: 100%;
  height: ${scaledHeight(80)}px;
  margin-bottom: ${scaledHeight(8)}px;
`

const BarcodeNumber = styled.Text`
  ${TextStyles.Heading6};
`

const BarcodeInfoWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  padding-horizontal: ${scaledWidth(32)}px;
`

const InfoWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-vertical: ${scaledHeight(8)}px;
`

const Remark = styled.Text`
  ${TextStyles.Heading6};
  color: ${Themes.remark};
`
