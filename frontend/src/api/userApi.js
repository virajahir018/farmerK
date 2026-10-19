import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true
});

export const userLogin = async (email, password) => {

    const response = await API.post("/user/login",
        { email, password },
        { withCredentials: true }
    );

    return response;
}

export const userProfile = async (data) => {

    const response = await API.post("/user/update", { data });

    return response;
}
export const productAll = async () => {

    const response = await API.get("/file_upload/all");

    return response;
}

export const productPagi = async (page) => {

    const response = await API.get(`/file_upload/get_page?page=${page}`);

    return response;
}