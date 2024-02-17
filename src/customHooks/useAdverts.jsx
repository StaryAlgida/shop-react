import {useEffect, useState} from "react";
import axios from "axios";

export const useAdverts = () => {
    const [adverts, setAdverts] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await axios.get("/adverts")
                setAdverts([...response.data])
            } catch (error) {
                if (axios.isAxiosError(error))
                    console.log(error)
            }
        }
        void getCategories();
    }, []);

    return adverts;
}