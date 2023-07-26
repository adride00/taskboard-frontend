import { createContext, useContext, useState } from 'react'
const StateContext = createContext({
	currenUser: null,
	userToken: null,
	setCurrentUser: () => {},
	setUserToken: () => {},
})

export const ContextProvider = ({ children }) => {
	const [currenUser, _setCurrentUser] = useState(() => {
		let user = localStorage.getItem('user')
		if (user) {
			return JSON.parse(user)
		} else {
			return null
		}
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
	const setCurrentUser = user => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user))
		} else {
			localStorage.removeItem('user')
		}
		_setCurrentUser(user)
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
