import {
    ADD_CATEGORY, CATEGORY_PENDING, CATEGORY_CHANGE,
    CATEGORY_CHANGE_FAIL, CATEGORY_CHANGE_SUCCESS,
    ADD_FLASH_MESSAGE, SUCCESS_MESSAGE, ERROR_MESSAGE
} from './index';
import { URL } from '../../env';
import axios from 'axios';
import { NewCategoryValidator } from '../validators';
import { AsyncStorage } from 'react-native';

export const CategoryChange = ({  prop, value })=> ({
    type: CATEGORY_CHANGE,
    payload: { prop, value }
});

export const AddNewCategory = (category) => async (dispatch) => {
    // console.log("categoru =", category);
    dispatch({
        type: CATEGORY_PENDING
    });
    const { isValid, errors } = NewCategoryValidator(category);
    if (!isValid) {
        dispatch({
            type: CATEGORY_CHANGE_FAIL,
            payload: errors
        });
        alert(`Lưu dữ liệu thất bại: ${errors}` );
    } else {
        const apiUrl = `${URL}/api/category/new`;
        const formData = new FormData();
        // console.log("ImageUrl = ", category.ImageUrl);

        const uriParts = category.ImageUrl.split('.');
        const fileType = uriParts[uriParts.length - 1];
        formData.append('categoryImage', {
            uri: category.ImageUrl,
            name: `category.${fileType}`,
            filename: `category.${fileType}`,
            type: `image/${fileType}`,            
        });

        formData.append('category', JSON.stringify(category));
        const options = {
            headers: {
                Accept: 'application/json',
            },
        };

        axios.post(apiUrl, formData).then(
            res => {
                // console.log("data = ", data);
                dispatch({
                    type: CATEGORY_CHANGE_SUCCESS,
                    payload: res.data
                });
                dispatch({
                    type: ADD_FLASH_MESSAGE,
                    payload: { message: 'Bạn đã tạo nhóm sản phẩm thành công', TypeMessage: SUCCESS_MESSAGE }
                });
                alert("Bạn đã lưu dữ liệu thành công");
            }
        ).catch(
            err => {
                console.log("error: ", err);
                if (err.response) {
                    dispatch({
                        type: CATEGORY_CHANGE_FAIL,
                        payload: err.response.data.error
                    });
                    dispatch({
                        type: ADD_FLASH_MESSAGE,
                        payload: { message: `Tạo nhóm sản phẩm thất bại: ${err.response.data.error}`, TypeMessage: ERROR_MESSAGE }
                    });
                } else {
                    dispatch({
                        type: CATEGORY_CHANGE_FAIL,
                        payload: err
                    });
                    dispatch({
                        type: ADD_FLASH_MESSAGE,
                        payload: { message: `Tạo nhóm sản phẩm thất bại: ${err}`, TypeMessage: ERROR_MESSAGE }
                    });
                }
                alert(`Lưu dữ liệu thất bại: ${err}`);
            }
            );
    }

}