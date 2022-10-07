import { createContext, useContext } from 'react';

export const TokenContext = createContext(null);

export const useToken = () => {
    return useContext(TokenContext);
}