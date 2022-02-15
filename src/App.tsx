import React from 'react'
import Axios from './components/Axios'
import ReactQuery from './components/ReactQuery'
import {Switch, Route} from 'react-router-dom'
import InfiniteQuery from './components/infiniteQuery'
const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Axios} />
      <Route path="/reactquery" component={ReactQuery} />
      <Route path="/infinitequery" component={InfiniteQuery} />
    </Switch>

  )
}

export default App
