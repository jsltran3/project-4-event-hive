import React, { useState, useEffect, createContext } from "react";

export const UserContext = createContext({})

export const UserProvider = ({ children }) => {
const [userInfo, setUserInfo] = useState({
    id: 1,
    username: 'test',
    bands: [],
    concert_tickets: []
})

useEffect(() => {
    console.log(userInfo)
}, [userInfo])

    return (
    <UserContext.Provider
    value={{
        userInfo, setUserInfo
    }}>
        {children}
        </UserContext.Provider>
)
}

