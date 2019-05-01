import React, {Component, Fragment} from 'react';
import propTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {TOGGLE_MODAL, userLoginAction} from './redux/actions/userAction';
import NavBar from './components/navBar';
import Goods from './pages/goods';
import Address from './pages/address';
import Confirm from './pages/confirm';
import OrderSuccess from './pages/orderSuccess';
import NotFound from './pages/notFound';

class App extends Component {
  render() {
    const {appName, displayName, modalShow, handleLoginformSubmit, handleModalToggle} = this.props;
    return (
      <Fragment>
        <NavBar
          appName={appName}
          displayName={displayName}
          modalShow={modalShow}
          onModalToggle={handleModalToggle}
          onLoginformSubmit={handleLoginformSubmit}
        />
        <Switch>
          <Route path="/goods" component={Goods} />
          <Route path="/address" component={Address} />
          <Route path="/orderConfirm" component={Confirm} />
          <Route path="/orderSuccess" component={OrderSuccess} />
          <Route path="/not-found" component={NotFound}/>
          <Redirect from="/" to="/goods"/>
          <Redirect to="/not-found"/>
        </Switch>
      </Fragment>
    );
  }
}

App.propTypes = {
  appName: propTypes.string,
  displayName: propTypes.string,
  modalShow: propTypes.bool,

  handleModalToggle: propTypes.func,
  handleLoginformSubmit: propTypes.func
};

const mapStateToProps = state => {
  return {
    appName: state.common.appName,
    displayName: state.user.displayName,
    modalShow: state.user.modalShow
  }
};

const mapDispatchToProps = dispatch => ({
  handleModalToggle: () => dispatch({type: TOGGLE_MODAL}),
  handleLoginformSubmit: (payload) => {
    console.log(payload);
    dispatch(userLoginAction(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
