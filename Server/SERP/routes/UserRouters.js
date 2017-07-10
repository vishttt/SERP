import express, {Router} from 'express';
const UserRouters = Router();
import {SignupValidator, LoginValidator} from '../validators';
import bcrypt from 'bcrypt';
// import Promise from 'bluebird';
import UserModel from '../models/UserModel';
import  isEmpty from 'lodash/isEmpty';
import Validator from 'validator';
import jwt from 'jsonwebtoken';
import config from '../config/jwt';

function validateInput(data, otherValidation) {
    let { errors } = otherValidation(data);
    return UserModel.query({
        where: {email: data.email},
        orWhere: { username: data.username }
    }).fetch().then(
        user=> {
           if(user) {
                if(user.get('username') === data.username) {
                    errors.username = "Đã có người dùng khác đăng ký tên đăng nhập này, bạn hãy chọn tên đăng nhập khác"
                }
                if(user.get('email') === data.email) {
                    errors.email = "Đã có người dùng khác sử dụng email này, bạn hãy chọn email khác"
                }
           }
           
           return {
               errors,
               isValid: isEmpty(errors)
           }
        }
    )
}


UserRouters.post('/signup',  (req, res, next) => {
    const { username, email, password, passwordConfirm, gender, role, phone } = req.body;
    const user = { username, email, password, gender, phone, role }

    validateInput(req.body, SignupValidator).then(
        ({errors, isValid})=> {            
            if(isValid) {
                const password_hash = bcrypt.hashSync(password, 10);
                user.password = password_hash;
                UserModel.forge(user, { hasTimestamps: true})
                    .save()
                    .then(
                        data => {
                            // console.log("data = ", data);
                            res.json({ success: true, user: data})
                        }
                    )
                    .catch(                
                        err => {
                            console.log(err);
                            res.status(500).json({ error: err })
                        }
                    )
            }
            else {
                res.status(400).json(errors);
            }
        }
    );
     
});

UserRouters.post('/login', (req, res, next)=> {
    const { identifier, password } = req.body;
    const { isValid, errors } = LoginValidator(req.body);

    if(isValid) {
        UserModel.query({
            where: {username: identifier},
            orWhere: { email: identifier }
        }).fetch().then(
            user=> {
                if(!user) {
                    res.status(400).json({ error: ` Không tim thấy người dùng ${identifier} ` })
                }
                else{
                    // console.log("user = ", user)
                    bcrypt.compare(password, user.get("password"), function(err, isValid) {
                        if(!isValid) {
                            // console.log("err = ", err);
                            // console.log(password, user.get("password"));
                            res.status(400).json({ error: "Mật khẩu không đúng" })
                        }
                        else {
                            // console.log("isValid = ", isValid);
                            const token = jwt.sign({
                                id: user.get('id'),
                                username: user.get('username')
                            }, config.jwtSecret);
                            res.status(200).json({ message: " Bạn đã đăng nhập thành công ", user: user, token: token });
                        }
                        
                    });    
                }        
            }
        ).catch(
            err=> {
                console.log("err = ", err);
                res.status(500).json({ error: `Chi Tiết lỗi: ${err}` });
            }
        )
    }
    else {
        res.status(400).json(errors);
    }

});

// AuthRoutes.get('/logout', userController.getLogout);

// AuthRoutes.get('/profile', isAuthenticated, userController.getProfile);

export {UserRouters};