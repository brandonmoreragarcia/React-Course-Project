import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        //cases for handling loading-spinner and async code for posting orders
        case actionTypes.PURCHASE_INIT: return purchaseInit(state, action)
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state, action)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state, action);

        //cases for handling loading-spinner and async code for fetching orders
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAILED: return fetchOrdersFailed(state, action);

        default: return state;
    }
}

const purchaseInit = (state, action) => {
    return {
        ...state,
        purchased: false
    };
}

const purchaseBurgerStart = (state, action) => {
    return {
        ...state,
        loading: true
    };
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.order,
        id: action.id
    };
    return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    };
}

const purchaseBurgerFailed = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const fetchOrdersStart = (state, action) => {
    return {
        ...state,
        loading: false
    };
}

const fetchOrdersSuccess = (state, action) => {
    return {
        ...state,
        orders: action.orders,
        loading: false
    }
}

const fetchOrdersFailed = (state, action) => {
    return {
        ...state,
        loading: false
    }
}


export default reducer;