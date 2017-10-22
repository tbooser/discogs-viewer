import { ADD_ITEM } from '../constants'

const item = {
  items: ['']
}

function itemsApp (state = item, action) {
  switch (action.type) {
    case ADD_ITEM:
      return Object.assign({}, state, {
        items: [...state.items, {
          text: action.text
        }]
      })
     default:
      return state 
  }
}

export default itemsApp


