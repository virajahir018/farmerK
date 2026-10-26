import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

export const userLogin = async (email, password) => {

    const response = await API.post("/user/login",
        { email, password },
        { withCredentials: true }
    );

    return response;
}

export const userRegister = async (name, password) => {

    const response = await API.post("/user/register",
        { name, password },
        { withCredentials: true }
    );

    return response;
}

export const userVerifyOTP = async (otp) => {

    const response = await API.post("/user/verify-otp",
        { otp },
        { withCredentials: true }
    );

    return response;
}

export const userVerify = async (email) => {

    const response = await API.post("/user/verify-user",
        { email },
        { withCredentials: true }
    );

    return response;
}

export const userUpdate = async (data) => {

    const response = await API.post("/user/update", { data });

    console.log(response)

    return response;
}

export const userProfile = async () => {

    const response = await API.get("/user/profile");

    return response;
}

export const userLogout = async () => {

    const response = await API.post("/user/logout", {});

    return response;
}

export const productAll = async () => {

    const response = await API.get("/product/all");

    return response;
}

export const productPagi = async (page) => {

    const response = await API.get(`/product/get_page?page=${page}`);

    return response;
}

export const productId = async (id) => {

    const response = await API.get(`/product/${id}`);

    return response;

}

export const productAdd = async (formData) => {

    const response = await API.post("/product/add", formData);

    return response;
}