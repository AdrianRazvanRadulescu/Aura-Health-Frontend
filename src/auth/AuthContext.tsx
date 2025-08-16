import { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserAPI, loginAPI, logoutAPI, registerAPI } from '../features/authentication/api/authAPI';
import { User, LoginCredentials, RegisterCredentials } from '../features/authentication/types';
import { Box, Loader } from '@mantine/core';

interface AuthContextType {
    user: User | null;
    login: (credentials: LoginCredentials) => Promise<User>;
    register: (credentials: RegisterCredentials) => Promise<User>;
    logout: () => Promise<void>;
    isLoading: boolean;
    isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const queryClient = useQueryClient();

    const { data: user, isLoading: isAuthLoading } = useQuery({
        queryKey: ['user'],
        queryFn: getUserAPI,
        retry: false,
    });

    const loginMutation = useMutation({
        mutationFn: loginAPI,
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data);
        },
    });

    const registerMutation = useMutation({
        mutationFn: registerAPI,
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], data);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: logoutAPI,
        onSuccess: () => {
            queryClient.setQueryData(['user'], null);
        },
    });

    const isLoading = loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending;

    const value = {
        user: user || null,
        login: (credentials: LoginCredentials) => loginMutation.mutateAsync(credentials),
        register: (credentials: RegisterCredentials) => registerMutation.mutateAsync(credentials),
        logout: () => logoutMutation.mutateAsync(),
        isLoading,
        isAuthLoading,
    };
    
    if (isAuthLoading) {
        return (
            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Loader size="xl" />
            </Box>
        );
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};