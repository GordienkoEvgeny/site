import { useContext } from 'react';
import { LoginContext, MainContext } from '../contexts/contexts.js';

export const useAuthorization = () => useContext(LoginContext);
export const useMainApi = () => useContext(MainContext);
