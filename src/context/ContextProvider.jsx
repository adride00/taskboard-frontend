import { createContext, useContext, useState } from 'react'
const StateContext = createContext({
	currenUser: null,
	userToken: null,
	setCurrentUser: () => {},
	setUserToken: () => {},
})

export const ContextProvider = ({ children }) => {
	const [currenUser, setCurrentUser] = useState({
		name: 'Adrian Campos Madrid',
		email: 'adr@sd.com',
	})
	const [userToken, setUserToken] = useState('12345')
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
