'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Defina o tipo de estado como User | null

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            
            setUser(currentUser); // Define o usuário no estado ao mudar o estado de autenticação
        });

        // Limpa o evento de escuta ao desmontar o componente
        return () => unsubscribe();
    }, []); // Execute este efeito apenas uma vez

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
