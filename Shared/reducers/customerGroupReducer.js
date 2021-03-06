import {
    ADD_CUSTOMER_GROUP, CUSTOMER_GROUP_PENDING, CUSTOMER_GROUP_CHANGE_FAIL,
    CUSTOMER_GROUP_CHANGE_SUCCESS, CUSTOMER_GROUP_CHANGE,
    CUSTOMER_GROUP_LOADED_SQLITE,CUSTOMER_GROUP_LIST_LOADED_SQLITE, CUSTOMER_GROUP_DELETE_SUCCESS,
    RESET_CUSTOMER_GROUP_FORM
} from '../actions/types';

const INITIAL_STATE = {
    Name: '',
    Description: '',
    Id: '',
    loading: false,
    loaded: false,
    error: '',
    customerGroups: []
    // uploading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CUSTOMER_GROUP_PENDING:
            return { ...state, loading: true, error: '' };
        case RESET_CUSTOMER_GROUP_FORM:
            return { ...state, Name: '', Description: '', Id: '', error: '' };
        case CUSTOMER_GROUP_CHANGE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case CUSTOMER_GROUP_LIST_LOADED_SQLITE:
            let convertedData = [];
            action.payload.forEach((item) => {
                const convert = { ...item, key: item.id };
                convertedData.push(convert);
            });
            return { ...state, customerGroups: convertedData, loaded: true, loading: false };
        case ADD_CUSTOMER_GROUP:
            return {
                ...state,
                Name: action.payload.Name,
                Description: action.payload.Description,
                error: '',
                loading: false,
            };
        case CUSTOMER_GROUP_LOADED_SQLITE:
            return {
                ...state,
                Id: action.payload.id,
                Name: action.payload.name,
                Description: action.payload.description,
                error: '',
                loading: false,
                loaded: true
            };
        case CUSTOMER_GROUP_CHANGE_FAIL:
            return { ...state, error: action.payload, loading: false };
        case CUSTOMER_GROUP_CHANGE_SUCCESS:
            return {
                ...state,
                Name: '',
                Description: '',
                error: '',
                loading: false,
            };
        case CUSTOMER_GROUP_DELETE_SUCCESS:
            return {
                ...state,
                error: '',
                loading: false,
            };
        default:
            return state;
    }
}
    ;
