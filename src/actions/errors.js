import store from 'src/store';

export const errors = {
    set: (e) => {
        const {errors, response} = e;
        console.warn(e);

        store.dispatch({
            type: 'ERROR_SET',
            errors: errors || e.response.body.errors
        });
    }
}
