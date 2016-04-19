import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import { Grid, Row, Col, Panel, Input, Button } from 'react-bootstrap'

var SigninView = React.createClass({

    getInitialState: function() {
        const redirectRoute = this.props.location.query.next || '/signin';
        return {username: '', password: '', remember: true, redirectTo: redirectRoute};
    },

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    },

    signin(e) {
        e.preventDefault();
        this.props.actions.signinUser(this.state.username, this.state.password, this.state.remember, this.state.redirectTo);
    },

    render() {
        return (
            <Grid className="sign-page" id="sign-page">
                <Row>
                    <Col xs={6} md={6} xsOffset={3} mdOffset={3}>
                        <form role="form">
                            <Panel className="sign-section">
                                <Input type="text" name="username" onChange={this.handleChange} bsSize="large" placeholder="用户名" />
                                <Input type="password" name="password" onChange={this.handleChange} bsSize="large" placeholder="密码" />
                                <Input type="checkbox" onChange={this.handleChange} label="下次自动登录" wrapperClassName="sign-helper col-xs-6" className="pull-left"  defaultChecked />
                                <Button bsStyle="link" className="sign-helper pull-right">忘记密码？</Button>
                                <Button bsStyle="primary" type="submit" bsSize="large" onClick={this.signin} block>登录</Button>
                            </Panel>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
});


const mapStateToProps = (state) => ({
  isAuthenticating   : state.auth.isAuthenticating,
  statusText         : state.auth.statusText
});

const mapDispatchToProps = (dispatch) => ({
  actions : bindActionCreators(actionCreators, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SigninView);
