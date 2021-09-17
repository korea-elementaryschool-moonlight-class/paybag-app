import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from '~/scenes/Home'
import Barcode from '~/scenes/Barcode'
import History from '~/scenes/History'
import SignUp from '~/scenes/SignUp'
import SignIn from '~/scenes/SignIn'

const Stack = createStackNavigator()

const ScreenNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerMode: 'none' }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Barcode" component={Barcode} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignIn" component={SignIn} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default ScreenNavigator
