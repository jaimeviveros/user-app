import axios from 'axios';

export const loginService = async (userInfo) => {
    
    const response = await axios.post(`${process.env.user_crud_api || 'http://localhost:8090'}/login`, userInfo);

    console.log(response);
    return response.data;
}