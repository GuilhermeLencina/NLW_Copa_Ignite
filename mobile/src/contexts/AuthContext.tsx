import { createContext, ReactNode, useState, useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { api } from '../services/api';

WebBrowser.maybeCompleteAuthSession();

interface UserProps {
    name: string;
    avatarUrl: string;
}

export interface AuthContextDataProps {
    user: UserProps;
    isUserLoading: boolean;
    signIn: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>({} as UserProps);
    const [isUserLoading, setIsUserloading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: "261743622562-4icf95iebdugeh4llifeb3hqair47alj.apps.googleusercontent.com",
        redirectUri: AuthSession.makeRedirectUri({useProxy: true}),
        scopes: ['profile', 'email']
    })

    async function signIn() {
        try {
            setIsUserloading(true);
            await promptAsync();
        } catch (error) {
            console.log(error);
            throw error;
        }finally {
            setIsUserloading(false);
        }
    }

    const signInWithGoogle = async (access_token: string) => {
        try {
            setIsUserloading(true);

            const tokenResponse = await api.post("/users", { access_token });
            api.defaults.headers.common[
                "Authorization"
            ] = `Bearer ${tokenResponse.data.token}`;

            const userInfoResponse = await api.get("/me");
            setUser(userInfoResponse.data.user);
        } catch (error) {
            console.log(error);
            throw error;
        } finally {
            setIsUserloading(false);
        }
    };

    useEffect(() => {
        if(response?.type === 'success' && response.authentication?.accessToken){
            signInWithGoogle(response.authentication.accessToken);
        }
    }, [response]);

    return (
        <AuthContext.Provider value={{
            signIn,
            isUserLoading,
            user,
        }}>
            {children}
        </AuthContext.Provider>
    );
}