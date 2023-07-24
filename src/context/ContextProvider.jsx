import { createContext, useContext, useState } from 'react'
const StateContext = createContext({
	currenUser: null,
	userToken: null,
	setCurrentUser: () => {},
	setUserToken: () => {},
})

export const ContextProvider = ({ children }) => {
	const [currenUser, setCurrentUser] = useState({
		name: '',
		email: '',
	})
	const [userToken, _setUserToken] = useState(
		() => localStorage.getItem('token') || '',
	)
	const setUserToken = token => {
		if (token) {
			localStorage.setItem('token', token)
		} else {
			localStorage.removeItem('token')
		}
		_setUserToken(token)
	}
	return (
		<StateContext.Provider
			value={{
				currenUser,
				setCurrentUser,
				userToken,
				setUserToken,
			}}
		>
			{children}
		</StateContext.Provider>
	)
}

export const userStateContext = () => useContext(StateContext)
