import axios from "axios";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.init";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("")

    console.log('user-data', user)

    const socialAuth = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    const resetPassword = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setLoading(false)
            setUser(currentUser)

            if (currentUser?.email) {
                const userInformation = { email: currentUser?.email }
                await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/jwt`, userInformation, { withCredentials: true })

                await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/users`, {
                    name: user?.displayName,
                    image: user?.photoURL,
                    email: user?.email,
                    uid: user?.uid,
                })

                setLoading(false)
            } else {
                await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/logout`, { withCredentials: true });

                setLoading(false)
            }

            setLoading(false)
        })

        return () => {
            unsubscribe()
        }
    }, [user?.displayName, user?.email, user?.photoURL, user?.uid]);

    const authInfo = {
        socialAuth,
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        loginUser,
        logOutUser,
        resetPassword,
        email,
        setEmail
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );


};

AuthProvider.propTypes = {
    children: PropTypes.array.isRequired
}

export default AuthProvider;
