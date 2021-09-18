import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import {
  Animated,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Easing,
  StyleSheet
} from 'react-native'
import styled from 'styled-components/native'
import axios from 'axios'
import { throttle } from 'lodash'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react'
import LinearGradient from 'react-native-linear-gradient'
import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'

import Geolocation from 'react-native-geolocation-service'
import NaverMapView, { Marker } from 'react-native-nmap'

import { TextStyles, Themes } from '~/styles'
import { scaledWidth, scaledHeight } from '~/styles/mixins'
import { SvgCard, SvgHistory, SvgSetting, SvgStamp, SvgRefresh } from '~/icons'

import Button from '~/components/Button'

import HomeHeader from './components/HomeHeader'
import MarketInfoCard from './components/MarketInfoCard'

import { MockingMarket } from '~/mocks'

import { User } from '~/stores'

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView)
const AnimatedView = Animated.View

/**
 * Home
 *
 * @returns
 */
const Home = () => {
  const navigation = useNavigation()

  const [location, setLocation] = useState({ latitude: 0, longitude: 0 })

  const [toggle, setToggle] = useState(false)

  const [showMarketInfo, setShowMarketInfo] = useState(false)
  const [selectMarketInfo, setSelectMarketInfo] = useState({
    marketName: '',
    stock: 0
  })

  const fadeAnim = useRef(new Animated.Value(0)).current
  const authBottomSheet = useRef(null)

  // TODO: api 모듈화 (apply dotenv)
  const [marketInfoData, setMarketInfoData] = useState([])
  const getMarketInfoData = async () => {
    await axios
      .get('http://pwnable.co.kr:8000/market')
      .then((response) => {
        setMarketInfoData(response.data)
      })
      .catch((error) => {
        console.warn(error)
      })
  }

  const goBarcode = useCallback(
    throttle(
      () => {
        if (!User._isLogin) openAuthBottomSheet()
        else navigation.navigate('Barcode')
      },
      2000,
      {
        leading: true,
        trailing: false
      }
    ),
    []
  )
  const goHistory = useCallback(
    throttle(
      () => {
        if (!User._isLogin) {
          openAuthBottomSheet()
        } else {
          navigation.navigate('History')
          setToggle(false)
        }
      },
      2000,
      {
        leading: true,
        trailing: false
      }
    ),
    []
  )
  const goSignUp = useCallback(
    throttle(
      () => {
        navigation.navigate('SignUp')
        closeAuthBottomSheet()
      },
      2000,
      {
        leading: true,
        trailing: false
      }
    ),
    []
  )
  const goSignIn = useCallback(
    throttle(
      () => {
        navigation.navigate('SignIn')
        closeAuthBottomSheet()
      },
      2000,
      {
        leading: true,
        trailing: false
      }
    ),
    []
  )

  const openAuthBottomSheet = useCallback(() => {
    setToggle(false)
    authBottomSheet.current?.present()
  }, [])
  const closeAuthBottomSheet = useCallback(() => {
    authBottomSheet.current?.close()
  }, [])

  useEffect(() => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization('always')
    }
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setLocation({
          latitude: latitude,
          longitude: longitude
        })
      },
      (error) => {
        console.log(error.code, error.message)
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    )

    getMarketInfoData()

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease
    }).start()
  }, [fadeAnim])

  // const P0 = { latitude: location.latitude, longitude: location.longitude }
  const P0 = { latitude: 37.4973547, longitude: 127.0296942 }

  return (
    <>
      <Container>
        <NaverMapView
          style={{ width: '100%', height: '100%' }}
          center={{ ...P0, zoom: 16 }}
          compass={false}
          showsMyLocationButton={false}
          scaleBar={false}
          onMapClick={() => setShowMarketInfo(false)}
        >
          {marketInfoData.map((item, index) => (
            <>
              <Marker
                key={`market-${index}`}
                coordinate={{
                  latitude: parseFloat(item.latitude),
                  longitude: parseFloat(item.longitude)
                }}
                pinColor="blue"
                onClick={() => {
                  setShowMarketInfo(true)
                  setSelectMarketInfo({
                    marketName: item.marketName,
                    stock: item.stock
                  })
                }}
              />
            </>
          ))}
        </NaverMapView>

        <RefreshFloatingButton activeOpacity={0.5} onPress={getMarketInfoData}>
          <SvgRefresh width={scaledWidth(36)} height={scaledHeight(36)} />
        </RefreshFloatingButton>

        {showMarketInfo && (
          <MarketInfoCardWrapper>
            <MarketInfoCard
              marketName={selectMarketInfo.marketName}
              ecobagStock={selectMarketInfo.stock}
            />
          </MarketInfoCardWrapper>
        )}

        <HeaderWrapper
          colors={[
            'rgba(255, 255, 255, 1)',
            'rgba(255, 255, 255, 0.8)',
            'rgba(255, 255, 255, 0.1)'
          ]}
        >
          <HomeHeader onPress={() => setToggle(!toggle)} />
        </HeaderWrapper>
        <ButtonWrapper>
          <Button
            width={scaledWidth(343)}
            height={scaledHeight(54)}
            color={Themes.primary}
            innerText="이용하기"
            onPress={goBarcode}
          />
        </ButtonWrapper>
      </Container>

      {/* TODO: slide animation */}
      {toggle && (
        <DrawerContainer>
          <DrawerWrapper>
            {!User._isLogin ? (
              <AuthWrapper activeOpacity={0.5} onPress={openAuthBottomSheet}>
                <AuthTitle>로그인 / 회원가입</AuthTitle>
              </AuthWrapper>
            ) : (
              <AuthWrapper activeOpacity={1}>
                <AuthTitle>
                  {User._loggedIn.name.substr(1)}님 안녕하세요!
                </AuthTitle>
              </AuthWrapper>
            )}
            <MenuWrapper activeOpacity={0.5} onPress={goHistory}>
              <SvgHistory />
              <MenuTitle>이용기록</MenuTitle>
            </MenuWrapper>
            <MenuWrapper activeOpacity={0.5}>
              <SvgCard />
              <MenuTitle>결제수단</MenuTitle>
            </MenuWrapper>
            <MenuWrapper activeOpacity={0.5}>
              <SvgStamp />
              <MenuTitle>스탬프</MenuTitle>
            </MenuWrapper>
            <MenuWrapper activeOpacity={0.5}>
              <SvgSetting />
              <MenuTitle>설정</MenuTitle>
            </MenuWrapper>
          </DrawerWrapper>
          <OutWrapper style={{ opacity: fadeAnim }}>
            <TouchableOpacity
              style={{ height: scaledHeight(812) }}
              activeOpacity={1}
              onPress={() => setToggle(!toggle)}
            />
          </OutWrapper>
        </DrawerContainer>
      )}

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={authBottomSheet}
          index={1}
          snapPoints={['25.8%', '25.8%']}
          handleComponent={null}
          backdropComponent={() => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={closeAuthBottomSheet}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderTopLeftRadius: scaledWidth(16),
                borderTopRightRadius: scaledWidth(16),
                backgroundColor: 'rgba(97, 97, 97, 0.8)'
              }}
            />
          )}
        >
          <BottomSheetContainer>
            <BottomSheetTitle>만나서 반가워요!</BottomSheetTitle>
            <BottomSheetSubtitle>
              지금 회원가입하고, 에코백을 무료로 대여하세요☺️
            </BottomSheetSubtitle>
            <BottomSheetButtonWrapper>
              <Button
                width={scaledWidth(171.5)}
                height={scaledHeight(54)}
                color={Themes.primaryLighten3}
                innerText="회원가입"
                onPress={goSignUp}
              />
              <Button
                width={scaledWidth(171.5)}
                height={scaledHeight(54)}
                color={Themes.primary}
                innerText="로그인"
                onPress={goSignIn}
              />
            </BottomSheetButtonWrapper>
          </BottomSheetContainer>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  )
}

export default observer(Home)

const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${Themes.background};
  align-items: center;
`

const HeaderWrapper = styled(LinearGradient)`
  position: absolute;
  width: 100%;
  height: ${scaledHeight(120)}px;
  padding-top: ${scaledHeight(44)}px;
`

const ButtonWrapper = styled.View`
  position: absolute;
  bottom: ${scaledHeight(34)}px;
`

const DrawerContainer = styled(AnimatedSafeAreaView)`
  position: absolute;
  width: 100%;
  height: 100%;
`

const DrawerWrapper = styled.View`
  position: absolute;
  width: 80%;
  height: ${scaledHeight(812)}px;
  background-color: ${Themes.background};
  padding-horizontal: ${scaledWidth(33)}px;
  padding-vertical: ${scaledHeight(80)}px;
  z-index: 5;
`

const OutWrapper = styled(AnimatedView)`
  position: absolute;
  width: 100%;
  height: ${scaledHeight(812)}px;
  background: rgba(97, 97, 97, 0.8);
  right: 0;
`

const AuthWrapper = styled.TouchableOpacity`
  margin-bottom: ${scaledHeight(80)}px;
`

const AuthTitle = styled.Text`
  ${TextStyles.Heading5};
`

const MenuWrapper = styled.TouchableOpacity`
  height: ${scaledHeight(48)}px;
  flex-direction: row;
  align-items: center;
`

const MenuTitle = styled.Text`
  ${TextStyles.Body3};
`

const BottomSheetContainer = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  padding-top: ${scaledHeight(32)}px;
  padding-horizontal: ${scaledWidth(12)}px;
`

const BottomSheetTitle = styled.Text`
  ${TextStyles.Heading4};
`

const BottomSheetSubtitle = styled.Text`
  ${TextStyles.Body2};
  margin-top: ${scaledHeight(8)}px;
  margin-bottom: ${scaledHeight(24)}px;
`

const BottomSheetButtonWrapper = styled.View`
  width: ${scaledWidth(351)}px;
  height: auto;
  flex-direction: row;
  justify-content: space-between;
`

const MarketInfoCardWrapper = styled.View`
  position: absolute;
  top: ${scaledHeight(103)}px;
  left: 16px;
`

const RefreshFloatingButton = styled.TouchableOpacity`
  position: absolute;
  right: ${scaledWidth(16)}px;
  bottom: ${scaledHeight(104)}px;
  width: ${scaledWidth(48)}px;
  height: ${scaledHeight(48)}px;
  background-color: ${Themes.background};
  border-radius: ${scaledWidth(20)}px;
  align-items: center;
  justify-content: center;
`
