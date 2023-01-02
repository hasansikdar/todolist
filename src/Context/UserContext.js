import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../firebase/firebaseConfig';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';


export const AuthContext = createContext();
const auth = getAuth(app)
const UserContext = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    
    
    const createuser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logout = () => {
        setLoading(true);
        return signOut(auth);
    }
    const googlelogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }
    const updateprofileinfo = (updateinfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updateinfo);
    }



   

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentuser => {
            setUser(currentuser);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        }
    }, [])

    const authinfo = {  user, updateprofileinfo, loading, createuser, login, logout, googlelogin }
    return (
        <AuthContext.Provider value={authinfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;