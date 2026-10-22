import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { productId } from '../api/userApi';

export default function ProductDetails() {
    const { id } = useParams();

    console.log(id)

    const fetchdata = async () => {

        try {
            const response = await productId(id);

            console.log("data : ", response.data);

        } catch (error) {
            console.log(error.response?.data);
        }
    }

    useEffect(() => {
        fetchdata();
    }, []);

    return (
        <div>ProductDetails</div>
    )
}
