import { createContext, useReducer } from "react";
import { authReducer } from "../reducers/AuthReducer";
import { apiUrl } from "./constant";
import axios from 'axios'

export const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: false,
        isAuthenticated: false
    })

    // register
    const register = async input => {
        try {
            const response = await axios.post(`${apiUrl}api/v1/auth/register`, input)
            if(response.data.user){
                dispatch({
                    type: 'SET_AUTH',
                    payload: {isAuthenticated: true}
                })
                return response.data
            }
        } catch (err) {
            return({
                message: err.message
            })
        }
    }

    // login 
    const login = async input => {
        try {
            const response = await axios.post(`${apiUrl}api/v1/auth/login`, input)
            if(response.data.user){
                dispatch({
                    type: 'SET_AUTH',
                    payload: {isAuthenticated: true}
                })

                return response.data
            }
        }catch(err){
            return ({
                message: err.message
            })
        }
    }

    const AuthContextData = {authState, register, login}
    
    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider