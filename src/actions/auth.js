import { fetchToken, fetchTokenLess } from './../helpers/fetch';
import { types } from './../types/types';
import Swal from 'sweetalert2';
import { eventLogout } from './calendar';


export const startLogin = (email, password) => {
    return async(dispatch) => {

        const res = await fetchTokenLess('auth', { email, password }, 'POST')
        const data = await res.json()

        if (!data.ok) return Swal.fire("Error!", data.msg, "error");

        const { uid, name, token } = data
        localStorage.setItem('token', token)
        localStorage.setItem('token-init-date', new Date().getTime())
        dispatch(login({ uid, name }))






    }
}

export const login = (user) => ({
    type: types.authLogin,
    payload: user
})

export const startRegister = (name, password, email) => {
    return async(dispatch) => {
        const res = await fetchTokenLess('auth/new', { email, password, name }, 'POST')
        const data = await res.json()


        if (!data.ok) return Swal.fire("Error!", data.msg, "error");

        const { uid, token } = data
        localStorage.setItem('token', token)
        localStorage.setItem('token-init-date', new Date().getTime())
        dispatch(login({ uid, name: data.name }))



    }
}

export const startChecking = () => {
    return async dispatch => {
        const res = await fetchToken('auth/renew')
        const data = await res.json()
        if (!data.ok) return dispatch(finishChecking())

        const { uid, name, token } = data
        localStorage.setItem('token', token)
        localStorage.setItem('token-init-date', new Date().getTime())
        dispatch(login({ uid, name }))

    }
}

export const finishChecking = () => ({ type: types.authCheckingFinish })

export const startLogout = () => {
    return dispatch => {
        localStorage.clear()
        dispatch(logout())
        dispatch(eventLogout())
    }
}
export const logout = () => ({ type: types.authLogout })