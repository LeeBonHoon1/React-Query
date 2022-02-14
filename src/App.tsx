import React from 'react'
import Axios from './components/Axios'
import ReactQuery from './components/ReactQuery'
import {Switch, Route} from 'react-router-dom'

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Axios} />
      <Route path="/reactquery" component={ReactQuery} />
    </Switch>

  )
}

export default App
