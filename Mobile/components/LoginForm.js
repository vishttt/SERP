import React, { Component } from 'react';
// import { Container, Content, Form, Item, Button, Text, Header, Body, Footer, Right, Left, Spinner, Input} from 'native-base';
import { connect } from 'react-redux';
import { Text, View, Image, TextInput, TouchableOpacity, Dimensions, Button } from 'react-native';
import { Card, CardSection, Spinner } from './commons';
// import Expo from 'expo';
import {
    emailChanged,
    passwordChanged,
    loginUser,
    LoginFormChanged
} from '../actions';

import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import { URL } from '../../env';
const height = Dimensions.get("window").height;

class LoginForm extends Component {


    onIdentifierChange(text) {
        this.props.LoginFormChanged({ prop: "identifier", value: text });
    }
    onPasswordChange(text) {
        this.props.LoginFormChanged({ prop: "password", value: text });
    }
    onLoginPress(e) {
        e.preventDefault();
        const { identifier, password, loginUser } = this.props;
        // console.log(identifier, password);

        loginUser(`${URL}/api/users/login`, { identifier, password }, (token) => {
            AsyncStorage.setItem('jwtToken', token)
            Actions.drawer();
        });
    }
    renderMessage() {
        const { error, user } = this.props;
        if (error) {
            console.log("err = ", error);
            console.log("err.length = ", error.length);
            let listError = [];
            if (error.identifier) {
                return null;
            }
            if (error.password) {
                return null;
            }
            return (
                <Text style={styles.erroMessage}>{error}</Text>
            );
        }
        if (user) {
            return (
                <Text style={styles.successMessage}>Login successful</Text>
            );
        }
    }
    renderButtonLogin() {
        if (this.props.loading) {
            return (
                <Spinner size='small' />
            );
        }
        return (
            <Button
                onPress={this.onLoginPress.bind(this)}
                title="Đăng Nhập"
                color="rgba(39, 174, 96,1.0)"
                accessibilityLabel="Đăng Nhập"
            />


        );
        // return (
        //     <TouchableOpacity onPress={this.onLoginPress.bind(this)} style={styles.LoginButtonStyle} >
        //         <Text style={styles.LoginTextStyle}>Đăng Nhập</Text>
        //     </TouchableOpacity>

        // );
        // return (
        //     <Button
        //         onPress={this.onLoginPress.bind(this)}
        //     >
        //         <Text>Login</Text>
        //     </Button>
        // );
    }
    render() {
        const { identifier, password, error } = this.props;

        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logoStyle}
                        source={require('../../Shared/images/Logo.png')}
                    />
                </View>

                <View style = {styles.InputContainer}>
                    <View style={styles.groupControl}>
                        <Text style={styles.label} >Email</Text>
                        <TextInput
                            disableFullscreenUI = {true}
                            underlineColorAndroid = {'transparent'}
                            style={styles.textInput}
                            blurOnSubmit={true}
                            value={identifier}
                            onChangeText={this.onIdentifierChange.bind(this)}
                            type="Text"
                            name="email"
                            placeholder="Điền tên hoặc email:"
                        />

                        <Text>
                            {error && <Text style={styles.errorStyle}>{error.identifier}</Text>}
                        </Text>
                    </View>
                    <View style={styles.groupControl}>
                        <Text style={styles.label} >Mật khẩu</Text>
                        <TextInput
                            disableFullscreenUI = {true}
                            underlineColorAndroid = {'transparent'}
                            style={styles.textInput}
                            secureTextEntry
                            blurOnSubmit={true}
                            caretHidden={true}
                            value={password}
                            onChangeText={this.onPasswordChange.bind(this)}
                            type="password"
                            name="password"
                            placeholder="Điền mật khẩu:"
                        />

                        <Text>
                            {error && <Text style={styles.errorStyle}>{error.password}</Text>}
                        </Text>
                    </View>
                    {this.renderMessage()}
                </View>
                
                <View style={styles.buttonContainer}>
                    {this.renderButtonLogin()}
                </View>
            </View>
        );
    }
}

const styles = {
    container: {
        flex: 1,
        backgroundColor: 'rgba(52, 152, 219,1.0)'
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoStyle: {
        width: 200,
        height: 110
    },
    erroMessage: {
        color: 'red',
        fontSize: 18
    },
    successMessage: {
        color: 'green',
        fontSize: 18
    },
    InputContainer: {
        paddingBottom: 30,
        marginLeft: 10,
        marginRight: 10
    },
    groupControl: {
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10,
        padding: 5,
        borderColor: 'rgba(41, 128, 185,1.0)'
    },
    textInput: {
        color: 'white'
    },
    errorStyle: {
        color: 'rgba(231, 76, 60,1.0)',
        fontSize: 18
    },
    label: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.6)'
    },
    buttonContainer: {
        flex: 0.2,
        marginBottom: height / 55
    },
    
}


const mapStateToProps = (state, ownProps) => {
    const { identifier, password, error, user, loading } = state.loginForm;
    return {
        identifier,
        password,
        error,
        user,
        loading
    }
};

export default connect(mapStateToProps, {
    emailChanged,
    passwordChanged,
    loginUser,
    LoginFormChanged
})(LoginForm);