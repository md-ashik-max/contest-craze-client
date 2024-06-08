import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";


export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const axiosPublic = useAxiosPublic();axiosPublic
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const updateUserProfile = (name, image) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image
        })
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token)
                        }
                    })
            } else {
                localStorage.removeItem('access-token')
            }
            setLoading(false)
        })
        return () => {
            return unsubscribe()
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        updateUserProfile,
        googleLogin,
        logOut,

    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;