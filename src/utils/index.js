import {request as _request} from 'src/vendor';

export const request = ({method = 'get', url = ''}) => {
    const separator = /[\\\/]$/.test(BACKEND_URL) ? "" : "/";
    return _request[method](`${BACKEND_URL}${separator}${url}`)
        .type('application/json');
};

export const setFieldValue = (field, e) => {
    switch (e.target.type) {
        case "checkbox":
            return {[field]: e.target.checked};
        default:
            return {[field]: e.target.value};
    }
};

export const objectMap = (obj, cb) => {
    return Object.keys(obj).reduce((ppl, k) => {
        ppl[k] = cb(obj[k]);
        return ppl;
    }, {});
};
