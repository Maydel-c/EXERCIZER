import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)
        console.log('sending login req')
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {'Content-Type':'application/json'}
        })
        console.log('got login response')
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json))
            dispatch({ type: 'LOGIN', payload: json })
            setIsLoading(false)
            console.log('user logged in', json)
        }
    }
    return {login, error, isLoading}
}