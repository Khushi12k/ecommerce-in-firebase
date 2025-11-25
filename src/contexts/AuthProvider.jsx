import { createContext, useContext, useState, useEffect } from "react";
import instance from "../config/axiosConfig";

const authContext = createContext();

function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        checkAuthStatus();
    }, []);

    async function checkAuthStatus() {
        console.log("inside authProvider");
        try {
            const response = await instance.get("/auth/authCheck", {
                withCredentials: true,
            });
            setIsLoggedIn(true);
        } catch (error) {
            console.log(error);
            setIsLoggedIn(false);
        }
    }

    async function logout() {
        try {
            await instance.post(
                "/auth/logout",
                {},
                {
                    withCredentials: true,
                }
            );
            setIsLoggedIn(false);
            <Navigate to="/login" />;
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
