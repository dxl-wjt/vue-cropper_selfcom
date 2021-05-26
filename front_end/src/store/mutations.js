import {
  CHANGE_IMG
} from './constData'

export default {
  [CHANGE_IMG](state,result){
    state.img.width = result.width
    state.img.height = result.height
    state.img.cata = result.cata
  }
}