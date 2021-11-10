import { useState, useEffect, createContext } from "react";
import {
  getAuth,
  signInAnonymously,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";

interface AuthContextProps {
  user: false | User;
  signin: () => Promise<User>;
  signinAnon: () => Promise<User>;
  signout: () => Promise<any>;
}

export const AuthContext = createContext<AuthContextProps>({
  user: false,
  signin: () => null as any,
  signinAnon: () => null as any,
  signout: () => null as any,
});

// Provider hook that creates auth object and handles state
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState<User | false>(false);
  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    const user = credential.user;

    setUser(user);
    return user;
  };

  const signinAnon = async () => {
    const auth = getAuth();
    const credential = await signInAnonymously(auth);
    const user = credential.user;
    setUser(user);
    return user;
  };

  const signout = async () => {
    const auth = getAuth();
    await signOut(auth);
    setUser(false);
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return (
    <AuthContext.Provider value={{ user, signin, signinAnon, signout }}>
      {children}
    </AuthContext.Provider>
  );

  // return {
  //   user,
  //   signin,
  //   signinAnon,
  //   signup,
  //   signout,
  //   sendPasswordResetEmail,
  //   confirmPasswordReset,
  // };
};
