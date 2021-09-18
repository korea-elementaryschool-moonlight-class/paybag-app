import React, { useState } from 'react'
import styled from 'styled-components/native'
import axios from 'axios'
import { observer } from 'mobx-react'
import { useNavigation } from '@react-navigation/native'
import { throttle } from 'lodash'

import { TextStyles, Themes } from '~/styles'
import { scaledWidth, scaledHeight } from '~/styles/mixins'

import Header from '~/components/Header'
import Button from '~/components/Button'

import { User } from '~/stores'

const SignIn = () => {
  const navigation = useNavigation()

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  // TODO: api 모듈화
  const onPress = async () => {
    if (phone.length && password.length) {
      await axios
        .post('http://pwnable.co.kr:8000/login/', {
          phone: phone,
          password: password
        })
        .then((response) => {
          User.login(response.data)
          navigation.navigate('Home')
        })
        .catch((error) => {
          console.warn(error)
        })
    }
  }

  return (
    <Container>
      <Header title="로그인" />
      <FormContainer>
        <InputWrapper>
          <Label>전화번호</Label>
          <Input
            value={phone}
            placeholder="전화번호를 입력하세요"
            placeholderTextColor={Themes.remark}
            onChangeText={setPhone}
            keyboardType="numeric"
            autoFocus={true}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>비밀번호</Label>
          <Input
            value={password}
            placeholder="비밀번호를 입력하세요"
            placeholderTextColor={Themes.remark}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
        </InputWrapper>
        <ButtonWrapper>
          <Button
            width={scaledWidth(343)}
            height={scaledHeight(54)}
            color={Themes.primary}
            innerText="로그인"
            onPress={onPress}
          />
        </ButtonWrapper>
      </FormContainer>
    </Container>
  )
}

export default observer(SignIn)

const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${Themes.background};
`

const FormContainer = styled.View`
  margin-top: ${scaledHeight(40)}px;
  padding-horizontal: ${scaledWidth(16)}px;
`

const InputWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  margin-bottom: ${scaledHeight(16)}px;
`

const Label = styled.Text`
  ${TextStyles.Body3};
  margin-bottom: ${scaledHeight(4)}px;
`

const Input = styled.TextInput`
  width: 100%;
  height: ${scaledHeight(48)}px;
  border: 1px solid ${Themes.border};
  border-radius: ${scaledWidth(8)}px;
  padding-horizontal: ${scaledWidth(16)}px;
`

const ButtonWrapper = styled.View`
  margin-top: ${scaledHeight(8)}px;
`
