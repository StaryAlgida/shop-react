import {useEffect, useState} from "react";
import axios from "axios";

export const useSingleAdvert = (itemId) => {
    const [advertData, setAdvertData] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        sellerPhone: '',
        canNegotiate: '',
        categoryId: ''
    })

    useEffect(() => {
        const getItemInfo = async (itemId) => {
            try {
                const responseItems = await axios.get(`/adverts/${itemId}`)
                setAdvertData({...responseItems.data})
            } catch (error) {
                console.log(error)
            }
        }
        void getItemInfo(itemId)
    }, [itemId]);

    return advertData
}