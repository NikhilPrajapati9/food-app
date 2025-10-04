import type { LoginInputState, SignupInputState } from "@/schema/userSchema";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "sonner"


const API_END_POINT = import.meta.env.API_END_POINT || "http://localhost:3000";


type User = {
    fullname: string;
    email: string;
    contact: number;
    address: string;
    city: string;
    country: string;
    profilePicture: string;
    admin: boolean;
    isVerified: boolean;
}


type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input: SignupInputState) => Promise<void>;
    login: (input: LoginInputState) => Promise<void>;
    verifyEmail: (verificationCode: string) => Promise<void>;
    checkAuthentication: () => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    updateProfile: (input: any) => Promise<void>;
    changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}


export const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: false,
    loading: false,
    signup: async (input: SignupInputState) => {
        try {
            console.log("signup run");
            
            set({ loading: true });
            const response = await axios.post(`http://localhost:3000/api/v1/users/signup`, input, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("signup res", response);

            if (response.data.success) {
                toast.success("Signup successful! Please verify your email.");
                set({ loading: false, user: response.data.data.user, isAuthenticated: false });
            }

        } catch (error) {
            console.log("Signup error:", error);
            // toast.error(error?.response?.data?.message ?? "Signup failed");
            set({ loading: false });
        }
    },
    login: async (input: LoginInputState) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/api/v1/users/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("login res", response);

            if (response.data.success) {
                toast.success("Login successful!");
                set({ user: response.data.data.user, isAuthenticated: true, loading: false });
            }

        } catch (error) {
            console.log("login error:", error);
            // toast.error(error?.response?.data?.message ?? "Login failed");
            set({ loading: false });
        }
    },
    verifyEmail: async (verificationCode: string) => {
        try {
            const response = await axios.get(`${API_END_POINT}/api/v1/users/verify-email/${verificationCode}`);

            if (response.data.success) {
                toast.success("Email verified successfully! You can now log in.");
                set({ user: response.data.data.user, isAuthenticated: true, loading: false });
            }
        } catch (error) {

        }
    },
    checkAuthentication: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/api/v1/users/check-auth`);

            if (response.data.success) {
                set({ loading: false, user: response.data.data.user, isAuthenticated: true, isCheckingAuth: false });
            }
        } catch (error) {
            set({ loading: false });
        }
    },
    logout: async () => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/api/v1/users/logout`);

            if (response.data.success) {
                toast.success("Logout successful!");
                set({ loading: false, user: null, isAuthenticated: false });
            }
        } catch (error) {
            set({ loading: false });
        }
    },
    forgotPassword: async (email: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/api/v1/users/forgot-password`, { email }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.data.success) {
                toast.success("Password reset email sent! Please check your inbox.");
                set({ loading: false });
            }
        } catch (error) {
            set({ loading: false });
        }
    },
    resetPassword: async (token: string, newPassword: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/api/v1/users/reset-password/${token}`, { password: newPassword }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.data.success) {
                toast.success("Password reset successful! You can now log in with your new password.");
                set({ loading: false });
            }
        } catch (error) {
            set({ loading: false });
        }
    },
    updateProfile: async (input: any) => {
        try {
            const response = await axios.put(`${API_END_POINT}/api/v1/users/update/profile`, input, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (response.data.success) {
                toast.success("Profile updated successfully!");
                set({ user: response.data.data.user, isAuthenticated: true });
            }

        } catch (error) {

        }
    },
    changePassword: async (currentPassword: string, newPassword: string) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/api/v1/users/change-password`, { currentPassword, newPassword }, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (response.data.success) {
                toast.success("Password changed successfully!");
                set({ loading: false });
            }
        } catch (error) {
            set({ loading: false });
        }
    }
})
    ,
    {
        name: 'user-name',
        storage: createJSONStorage(() => localStorage),
    }
))