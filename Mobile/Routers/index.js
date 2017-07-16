import React, { Component } from 'react';
import {Scene, Router, Actions} from 'react-native-router-flux';
import Home from '../components/Home';
import ChangeInfor from '../components/ChangeInfor';
import Main from '../components/Main';
import Authentication from '../components/Authentication';
import OrderHistory from '../components/OrderHistory';
import NavigationDrawer from '../components/commons/NavigationDrawer';
import requireAuth from '../utils/requireAuth';
import Categories from '../components/Screens/Categories';
import CategoryEdit from '../components/Screens/Categories/CategoryEdit';
import CategoryView from '../components/Screens/Categories/CategoryView';
import Splash from '../components/Splash';
import LoginForm from '../components/Screens/Auth/LoginForm';
import CategoriesScene from './categoriesScene';
import AuthScene from './authScene';

const RouterComponent = ()=> {
    return (
        <Router hideNavBar= "true" sceneStyle={{backgroundColor:'#F7F7F7'}} >
            <Scene key = "auth">
                <Scene key = "login" component = {LoginForm} title = "Please login" initial={true} />
            </Scene>
            <Scene key="drawer" component={requireAuth(NavigationDrawer)} open={false} >
                <Scene key = "categoryList" component = {Categories} title = "Nhóm sản phẩm"  />
                <Scene key = "categoryEdit" component = {CategoryEdit} title = "Sửa nhóm sản phẩm"  />
                <Scene key = "categoryView" component = {CategoryView} title = "Xem sản phẩm"  />
                
                <Scene key = "main" 
                    unmountScenes
                    animation = 'fade'
                >
                    <Scene key = "Main" component = {requireAuth(Main)} title = "Main"  />
                    <Scene key = "Home" component = {Home} title = "Home"  />
                    <Scene key = "ChangeInfor" component = {ChangeInfor} title = "ChangeInfor"  />
                    <Scene key = "Authentication" component = {Authentication} title = "Authentication"  />
                    <Scene key = "OrderHistory" component = {OrderHistory} title = "OrderHistory"  />
                </Scene>
            </Scene>            

            <Scene key = "splash" component = {Splash} />
            
        
        </Router>
    );
};

export default RouterComponent