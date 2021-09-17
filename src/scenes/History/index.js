import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import axios from 'axios'
import { observer } from 'mobx-react'
import dayjs from 'dayjs'

import { TextStyles, Themes } from '~/styles'
import { scaledWidth, scaledHeight } from '~/styles/mixins'

import Header from '~/components/Header'
import HistoryCard from './components/HistoryCard'

import { MockingHistory } from '~/mocks'

import { User } from '~/stores'

const History = () => {
  const [historyData, setHistoryData] = useState([])
  const [phoneNumber, setPhoneNumber] = useState(User._loggedIn.phone)

  const getHistoryData = async () => {
    await axios
      .get(`http://pwnable.co.kr:8000/history?phone=${phoneNumber}`)
      .then((response) => {
        setHistoryData(response.data)
      })
      .catch((error) => {
        console.warn(error)
      })
  }

  useEffect(() => {
    getHistoryData()
  }, [])

  return (
    <Container>
      <Header title="이용기록" />
      <Scrollable>
        {historyData.reverse().map((item, index) => (
          <HistoryCard
            key={index}
            rentMarket={item.rentMarket}
            returnMarket={item.returnMarket}
            rentDate={dayjs(item.createdAt).format('YYYY.MM.DD HH:mm')}
            returnDate={dayjs(item.updatedAt).format('YYYY.MM.DD HH:mm')}
          />
        ))}
      </Scrollable>
    </Container>
  )
}

export default observer(History)

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${Themes.background};
`

const Scrollable = styled.ScrollView`
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: ${Themes.backgroundWeaken};
  padding-horizontal: ${scaledWidth(16)}px;
  padding-top: ${scaledHeight(8)}px;
`
