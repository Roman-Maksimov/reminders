import {Immutable} from 'src/vendor';

const def = Immutable.fromJS({
    errors: null
});

export const symbols = function(state = def, action) {
    switch(action.type){
        case "ERROR_SET_DATA":
            return state.set("errors", action.errors);
    }
    return state;
};