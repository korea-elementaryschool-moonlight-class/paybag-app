import React from 'react'
import { StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import { observer } from 'mobx-react'

import Scenes from '~/scenes'
import { Themes } from './src/styles'

const App = observer(() => {
  return (
    <ThemeProvider theme={Themes}>
      <StatusBar />
      <Scenes />
    </ThemeProvider>
  )
})

export default App
