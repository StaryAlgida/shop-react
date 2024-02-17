import {useEffect, useState} from "react";
import axios from "axios";

export const useUserData = () => {
    const [userData, setUserData] = useState({})

    useEffect(() => {
        const getLoggedUser = async () => {
            try {
                const response = await axios.get("/name")
                setUserData({...response.data})
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        void getLoggedUser();
    }, []);

    return userData
}