import {createContext} from "react";
import {node} from "prop-types";

export const CategoryContext = createContext({
    categoryId: '',
    getOffersByCategory: () => {
    },
})

export const CategoryProvider = ({children}) => {

    const getOffersByCategory = (adverts, categories, categoryId) => {
        if (adverts && categories) {
            const category = categories.filter((cat) =>{
                return  cat.id === categoryId
            });

            if (category.length === 0) {
                return []
            }
            const filtered = adverts.filter((advert) => {
                if (advert.categoryId === parseInt(category[0].id)) {
                    return advert
                }
            })
            return (filtered.map(advert => (
                {...advert, categoryName: categories[advert.categoryId].title}
            )));
        }
    }

    const contextData = {
        getOffersByCategory
    }
    return (
        <CategoryContext.Provider value={contextData}>
            {children}
        </CategoryContext.Provider>
    )
}

CategoryProvider.propTypes = {
    children: node,
};