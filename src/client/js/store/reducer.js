import {combineReducers} from 'redux'

// Import all reducers
import app from './app/reducer'
import home from './home/reducer'
import tournament from './tournament/reducer'

export default combineReducers({
  app,
  home,
  tournament
})
