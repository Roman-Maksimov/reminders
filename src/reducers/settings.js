import {Immutable} from 'src/vendor';


const def = Immutable.fromJS({
    channel_types: [],
    form: {},
    scope: {},

    // for temporary data
    tmp: {}
});

export const settings = function(state = def, action) {
    switch(action.type){
        case "SETTINGS_SET_CHANNEL_TYPES":
            return state.set("channel_types", new Immutable.OrderedSet(action.payload));
        case "SETTINGS_SET_SCOPE":
            return state.set("scope", new Immutable.fromJS(action.payload));
        case "SETTINGS_SET_FORM":
            return state.set("form", action.payload);
        case "SETTINGS_SET_VALUE": {
            const list = state.getIn(["form", action.blockName]).toJS();
            list[0].values = state.getIn(["tmp", action.blockName, "values"]).toJS();

            return state.setIn(["form", action.blockName], Immutable.OrderedSet(list));
        } case "SETTINGS_RESTORE_VALUE": {
            const list = state.getIn(["form", action.blockName]).toJS();
            list.shift();

            return state.setIn(["form", action.blockName], Immutable.OrderedSet(list));
        } case "SETTINGS_OVERRIDE_VALUE": {
            const list = state.getIn(["form", action.blockName]).toJS();
            const first = Object.assign({}, list[0]);
            first.binding = {
                objectType: "resource",
                objectID: action.objectID
            };
            list.unshift(first);

            return state.setIn(["form", action.blockName], Immutable.OrderedSet(list));
        } case "SETTINGS_SET_TMP_VALUE":
            return state.setIn(["tmp", action.blockName], Immutable.fromJS({
                editable: action.editable,
                values: action.payload,
            }));
    }
    return state;
};