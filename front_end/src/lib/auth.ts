import axios from "axios";

export const getRegister = async (formData: {
    email: string,
    password: string,
    confirmPassword: string,
}) => {
    const END_POINT_URL = 'http://127.0.0.1:45176/auth/register';
    return await axios.post(END_POINT_URL, formData);
}

export const getLogin = async (formData: {
    email: string, 
    password: string;
    isRememberMe: boolean;
}) => {
    const END_POINT_URL = 'http://127.0.0.1:45176/auth/register';
    const response = await axios.post(END_POINT_URL, formData);

    if (formData.isRememberMe) await storeRefreshToken();
    
    
} 

const storeRefreshToken = async () => {

}