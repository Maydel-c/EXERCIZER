import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const { dispatch } = useAuthContext()
    const [isLoading, setIsLoading] = useState(null)
    const [error, setError] = useState(null)

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)
        console.log('hi')
        const response = await fetch('https://exercizer-api.onrender.com/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        })
        console.log('got response')
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setIsLoading(false)
        }
        if (response.ok) {
            dispatch({ type: 'LOGIN', payload: json })
            localStorage.setItem('user',JSON.stringify(json))
            setIsLoading(false)
            console.log('user sign in and logged in', json)
        }
    }
    return {signup, isLoading, error}

}