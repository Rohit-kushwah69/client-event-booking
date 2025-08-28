import React, { createContext, useState, useEffect } from "react";
import API from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const fetchProfile = async () => {
        try {
            const res = await API.get("/profile");
            setUser(res.data);
        } catch {
            setUser(null);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, fetchProfile }}>
            {children}
        </AuthContext.Provider>
    );
};
