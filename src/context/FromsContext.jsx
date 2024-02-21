import {createContext} from "react";
import axios from "axios";
import {node} from "prop-types";

export const FormContext = createContext({
    sendAddForm: () => {
    },
    sendEditForm: () => {
    },
    sendDelete: () =>{}
})

export const FormProvider = ({children}) => {

    const sendAddForm = async (data, seller) => {
        try {
            const currentDate = new Date()
            const finalData = {...data, seller}
            delete finalData.terms
            finalData.categoryId = parseInt(finalData.categoryId)
            finalData.price = finalData.price.toFixed(2)
            finalData.price = `${finalData.price}`
            finalData.createdOn = currentDate.toISOString()
            finalData.canNegotiate = finalData.canNegotiate === "true"
            console.log(finalData)

            const response = await axios.post('/adverts', finalData)
            console.log(response.data)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    const sendEditForm = async (data, itemInfo, selectedItemId) => {
        try {
            const finalData = {...data, seller: itemInfo.seller}
            finalData.categoryId = parseInt(finalData.categoryId)
            finalData.price = `${finalData.price}`
            finalData.createdOn = itemInfo.createdOn
            finalData.canNegotiate = finalData.canNegotiate === "true"
            console.log(finalData.categoryId)
            const response = await axios.put(`/adverts/${selectedItemId}`, finalData)
            console.log(response.data)
            return true
        } catch (error) {
            console.log(error)
        }
    }

    const sendDelete = async (selectedItem) =>{
        try{
            const response = await axios.delete(`adverts/${selectedItem.id}`)
            console.log(response.data)
            return true
        }catch (error){
            console.log(error)
            return false
        }
    }

    const contextData = {
        sendAddForm,
        sendEditForm,
        sendDelete
    }
    return (
        <FormContext.Provider value={contextData}>
            {children}
        </FormContext.Provider>
    )
}

FormProvider.propTypes = {
    children: node,
};