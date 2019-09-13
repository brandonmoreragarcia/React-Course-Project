import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

class Checkout extends Component {

    componentWillMount() {
        this.props.onInitPurchase();
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/"/>
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
            <div>
                {purchasedRedirect}
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route
                    path={this.props.match.path + '/contact-data'} component={ContactData} />
            </div>
            );
        }
        this.props.onInitPurchase(); // to set purchase to false again and avoid having purchased:true the next time
        return (summary);
    }
}

const matchStateToProps = state => {
    return {
        ingredients: state.reducerBurgerBuilder.ingredients,
        purchased: state.reducerOrder.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actionCreators.purchaseInit())
    }
}

export default connect(matchStateToProps, mapDispatchToProps)(Checkout);