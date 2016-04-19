import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

export function requireAuth(Component) {

    class Authenticated extends React.Component {

        constructor(props){
            super(props);
            this.state = {};
        }

        componentWillMount () {
            this.checkAuth(this.props.isAuthenticated);
        }

        componentWillReceiveProps (nextProps) {
            this.checkAuth(nextProps.isAuthenticated);
        }

        checkAuth (isAuthenticated) {
            if (!isAuthenticated) {
                let redirect = this.props.location.pathname;
                this.props.dispatch(push(`/signin?next=${redirect}`));
            }
        }

        render () {
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props}/>
                        : null}
                </div>
            )

        }
    }

    const mapStateToProps = (state) => ({
        token: state.auth.token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated
    });

    return connect(mapStateToProps)(Authenticated);
}
