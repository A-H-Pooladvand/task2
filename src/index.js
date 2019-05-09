import App from './App'
import React from 'react'
import { render } from 'react-dom'
import * as serviceWorker from './serviceWorker'
import './assets/scss/_init.scss'

render(
  <App/>,
  document.getElementById('root'),
)

serviceWorker.unregister()