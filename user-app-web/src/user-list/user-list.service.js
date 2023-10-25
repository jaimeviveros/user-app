import axios from "axios";

export const getAllService = async () => {
    // TODO generar service que recupere el dato
    const token = JSON.parse(localStorage.getItem("auth")).token;
    console.log({token: localStorage.getItem("auth")});
    console.log(localStorage.getItem("auth"));
    console.log(JSON.parse(localStorage.getItem("auth")));

    const response = await axios.get(`${process.env.user_crud_api12 || 'http://localhost:8030'}/user`,
    {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    console.log(response);
    return response.data;
}