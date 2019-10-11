import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
    return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
    return import('./containers/Orders/Orders');
}); 

const asyncAuth = asyncComponent(() => {
    return import('./containers/Auth/Auth');
}); 

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSingUp();
    }

    render() {

        //routes if not authenticated
        let routes = (
            <Switch > {/*selects the first matching route*/}
                <Route path="/auth" component={asyncAuth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/"/> {/*to avoid empty page if no route is found */}
            </Switch>
        );

        if (this.props.isAuthenticated) {
            //routes for authenticated users
            routes = (
                <Switch>
                    <Route path="/checkout" component={asyncCheckout} />
                    <Route path="/orders" component={asyncOrders} />
                    <Route path="/auth" component={asyncAuth} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/" exact component={BurgerBuilder} />
                    <Redirect to="/"/> {/*to avoid empty page if no route is found */}
                </Switch>
            )
        }

        return (
            <div >
                <Layout >
                        {routes}
                </Layout>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.reducerAuth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSingUp: () => dispatch(actionCreators.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);