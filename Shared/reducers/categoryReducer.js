import {
    ADD_CATEGORY, CATEGORY_PENDING, CATEGORY_CHANGE_FAIL,
    CATEGORY_CHANGE_SUCCESS, CATEGORY_CHANGE
} from '../actions/types';

const INITIAL_STATE = {
    Name: '',
    Description: '',
    ImageUrl: '',
    loading: false,
    error: '',
    // uploading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CATEGORY_PENDING:
            return { ...state, loading: true, error: '' };
        case CATEGORY_CHANGE:
            // console.log(action.payload)
            return { ...state, [action.payload.prop]: action.payload.value };
        case ADD_CATEGORY:
            return {
                ...state,
                Name: action.payload.Name,
                Description: action.payload.Description,
                ImageUrl: action.payload.Image,
                error: '',
                loading: false,
            };
        case CATEGORY_CHANGE_FAIL:
            return { ...state, error: action.payload, loading: false };
        case CATEGORY_CHANGE_SUCCESS:
            // console.log(action.payload);
            return {
                ...state,
                Name: action.payload.Name,
                Description: action.payload.Description,
                ImageUrl: action.payload.Image,
                error: '',
                loading: false,
            };
        default:
            return state;
    }
}
    ;
