import { ADD_ITEM } from '../constants.js'

export const addItem = (text, id) => {
	const action = {
		type: ADD_ITEM,
		text
	}
	console.log('Action in addItem', action)
	return action
}