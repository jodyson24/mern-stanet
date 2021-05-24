import { GLOBALTYPES } from './globalTypes'
import { postDataAPI } from '../../utils/fetchData'

export const MESS_TYPES = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE'
}

export const addUser = ({user, message}) => async (dispatch) => {
    if(message.users.every(item => item._id !== user.id)){
        dispatch({type: MESS_TYPES.ADD_USER, payload: {...user, text: '', media: []}})
    }
}

export const addMessage = ({msg, auth, socket}) => async (dispatch) => {
   dispatch({type: MESS_TYPES.ADD_MESSAGE, payload: msg})
   try {
        await postDataAPI(`message`, msg, auth.token) 
   } catch (err) {
       dispatch({type: GLOBALTYPES, payload: {error:  err.response.data.msg}})
   }
}