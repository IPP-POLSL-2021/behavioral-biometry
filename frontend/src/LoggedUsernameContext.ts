import { createContext } from 'react';

export const LoggedUsernameContext = createContext({username: "", updateUsername: (username: string) => {}});