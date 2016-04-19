import React from 'react';
import {Navbar, NavBrand, Nav, NavItem, Col} from 'react-bootstrap';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signoutAndRedirect} from '../actions';

connect((state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    };
})

export default class App extends React.Component {

    render () {

        const {dispatch} = this.props;

        return (
            <div>
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/">React Redux JWT Auth Example</Link>
                        </div>
                        <div id="navbar">
                            <ul className="nav navbar-nav navbar-right">
                                <li><Link to="/protected">Protected Content</Link></li>
                                <li><Link to="/signin">signin</Link></li>
                                {this.props.isAuthenticated
                                    ? <li><a href='#' onClick={() => this.props.dispatch(signoutAndRedirect())}>Signout</a> </li>
                                    : ''
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className='container'>
                    <div className='row'>
                        <Col xs={12}>
                            {this.props.children}
                        </Col>
                    </div>
                </div>
            </div>

        );
    }
}
