import * as actionsTypes from '../actions/actionTypes';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    error: false,
    buildingBurger: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case actionsTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionsTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionsTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionsTypes.FETCH_INGREDIENTS_ERROR:
            return fetchIngredientsError(state, action);

        default:
            return state;
    }
};


const addIngredient = (state, action) => {
    const newState = {
        ...state,
        buildingBurger: true,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    };
    return {
        ...newState,
        purchasable: updatePurchaseState(newState)
    }
}

const removeIngredient = (state, action) => {
    const newState = {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    };
    return {
        ...newState,
        purchasable: updatePurchaseState(newState)
    }
}

const updatePurchaseState = (state) => {
    const sum = Object.keys(state.ingredients)
        .map(igKey => {
            return state.ingredients[igKey];
        })
        .reduce((sum, el) => {
            return sum + el;
        }, 0);

    return sum > 0
};

const setIngredients = (state, action) => {
    if (state.buildingBurger) {
        return state;
    } else {
        return {
            ...state,
            ingredients: action.ingredients,
            totalPrice: 4,
            error: !state.error
        }
    }

}

const fetchIngredientsError = (state, action) => {
    console.log(action.error.message)
    return {
        ...state,
        error: !state.error
    }
}

export default reducer;