import { createContext, useContext, useState, useEffect } from "react";
import instance from "../config/axiosConfig";
import { auth, clearTokenFromStorage } from "../pages/Firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const authContext = createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        // Subscribe to Firebase auth state changes so the app updates immediately
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                // If no firebase user, fallback to server-side session check
                checkAuthStatus();
            }
        });

        return () => unsubscribe();
    }, []);

    async function checkAuthStatus() {
        // If a Firebase user exists, consider the user authenticated
        if (auth && auth.currentUser) {
            setIsLoggedIn(true);
            return;
        }

        // Otherwise, check the backend session (this will only run when there's no firebase user)
        try {
            await instance.get("/auth/authCheck", {
                withCredentials: true,
            });
            setIsLoggedIn(true);
        } catch (error) {
            console.log("Auth check failed:", error);
            setIsLoggedIn(false);
        }
    }

    async function logout() {
        try {
            // Sign out from Firebase (if used)
            if (auth && auth.currentUser) {
                await signOut(auth);
            }

            // Clear token from storage
            clearTokenFromStorage();

            // Tell backend to clear session cookie (if backend uses server-side sessions)
            await instance.post(
                "/auth/logout",
                {},
                {
                    withCredentials: true,
                }
            );

            setIsLoggedIn(false);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <authContext.Provider value={{ isLoggedIn, checkAuthStatus, logout }}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}

export default AuthProvider;
