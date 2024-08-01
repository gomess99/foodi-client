import React, { createContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    updateProfile,
  signOut,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create an account

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // sigup with gmail
  const signUpWithGmail = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // login using email and password
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  // logout
  const logOut = () => {
    signOut(auth);
  };

  // update profile

  const updateuserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
      });
  };

  // check signed-in user

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser)
            setLoading(false)
        } else {
            console.log(currentUser)
        }
      });
      return () =>{
        return unsubscribe();
      }
  },[])

  const authInfo = {
    user,
    createUser,
    signUpWithGmail,
    login,
    logOut,
    updateuserProfile
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
