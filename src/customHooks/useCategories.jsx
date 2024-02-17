import {useEffect, useState} from "react";
import axios from "axios";

export const useCategories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get("/categories")
                setCategories([...response.data])
            } catch (error) {
                if (axios.isAxiosError(error))
                    console.log(error)
            }
        }
        void getCategories();
    }, []);

    return categories;
}