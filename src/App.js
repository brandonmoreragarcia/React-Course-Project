import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';

class App extends Component {

    componentDidMount() {
        this.props.onTryAutoSingUp();
    }

    render() {

        //routes if not authenticated
        let routes = (
            <Switch > {/*selects the first matching route*/}
                <Route path="/auth" component={Auth} />
                <Route path="/" exact component={BurgerBuilder} />
                <Redirect to="/"/> {/*to avoid empty page if no route is found */}
            </Switch>
        );

        if (this.props.isAuthenticated) {
            //routes for authenticated users
            routes = (
                <Switch>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/auth" component={Auth} />
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