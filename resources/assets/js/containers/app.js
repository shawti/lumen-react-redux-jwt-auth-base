import React from 'react';
import {Navbar, NavBrand, Nav, NavItem, MenuItem} from 'react-bootstrap';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actionCreators from '../actions';

export class App extends React.Component {

    render() {
        return (
            <div>
                {this.headerItems}
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }

    get headerItems() {
        if (!this.props.isAuthenticated) {
            return false;
        } else {
            return (
                <Navbar inverse>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link className="navbar-brand" to="/">React Redux JWT Auth Example</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Nav pullRight>
                        <li role="presentation" class=""><Link to="/protected">Protected Content</Link></li>
                        {this.props.isAuthenticated
                            ? <NavItem eventKey={2} onClick={this.props.actions.signoutAndRedirect}>Signout</NavItem>
                            : ''
                        }
                    </Nav>
                </Navbar>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) => ({
    actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
