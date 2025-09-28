import jwtDecode from 'jwt-decode';
import React, { createContext, useState, useContext, useEffect } from 'react'


export const AuthContext = createContext();


const AuthContextProvider = ({ children }) => {

    const [curUserToken, setCurUserToken] = useState(null)
    const [userInfo, setUserInfo] = useState({ username: 'User', email: 'email@email.com' })
    const [handleProcessing,setHandleProcessing] = useState(false)
    useEffect(() => {
        checkAuthToken();
    }, [curUserToken])

    const checkAuthToken = async () => {
        const token = localStorage.getItem('jwt');

        try {
            if (token !== null) {
                setCurUserToken(token);
                getUserData()
            } else {
                setCurUserToken(null);
            }
        } catch (error) {
            console.error('Error retrieving JWT token:', error);
        }
    }
    const getUserData = () => {
        // Getting user data by Decoding token 
        try {
            if (curUserToken !== null) {
                const decodedToken = jwtDecode(curUserToken);
                // const userName = decodedToken.username;
                // const userEmail = decodedToken.email;
                // // console.log('username =>', userName);
                // // console.log('useremail =>', userEmail);
                setUserInfo(decodedToken)

            } else {
                console.log('Token value is empty =>');
            }

        } catch (error) {
            console.log('Somthing went wrong in getting Token =>', error);
        }
    }


    // const login = (user) => {
    //     sessionStorage.setItem('user', JSON.stringify(user));
    //     setAuthState({
    //       isAuthenticated: true,
    //       user,
    //     });
    //   };
    //   const logout = () => {
    //     sessionStorage.removeItem('user');
    //     setAuthState({
    //       isAuthenticated: false,
    //       user: null,
    //     });
    //   };

    return (

        <AuthContext.Provider value={{ userInfo, setUserInfo, curUserToken, setCurUserToken ,handleProcessing,setHandleProcessing}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider


export const useAuthContext = () => {
    return useContext(AuthContext);
}