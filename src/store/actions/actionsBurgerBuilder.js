import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName

    }
};

export const removeIngredient = (ingName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName

    }
};

//no need to export, used only here
const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

//no need to export, used only here
const fetchedIngredientsError = (error) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_ERROR,
        error:error
    }
}

export const initIngredients = () => {
    return dispatch => {

        //async code for fetching data from firebase
        axios.get('ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchedIngredientsError(error))
            });

    }
};