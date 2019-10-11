import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


//no need to export, used only here
const purchaseBurgerSuccess = (id, order) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        id: id,
        order: order
    }
};
//no need to export, used only here
const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

//no need to export, used only here
const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger = (order,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())

        axios.post('/orders.json?auth=' + token, order)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name,order));
            })
            .catch(error => {
                dispatch(purchaseBurgerFailed(error))
            });
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token,userId) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        const queryparams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
        axios.get('/orders.json' + queryparams)
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
                //this.setState({ loading: false, orders: fetchedOrders });
            })
            .catch(error => {
                dispatch(fetchOrdersFailed(error))
                //this.setState({ loading: false });
            });
    }
}

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

const fetchOrdersFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error: error
    }
}