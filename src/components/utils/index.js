import {Immutable} from 'src/vendor';

export const getSortedForm = (source) => {
    const form = {};
    for(let key in source){
        form[key] = new Immutable.OrderedSet(source[key]);
    }

    return new Immutable.OrderedMap(form);
};

export const defineResource = (settings, index = 0) => {
    return settings.toJS()[index] || {values: {}};
};

export const getCurrent = (settings, scope, index = 0) => {
    const currentObject = defineResource(settings, index);
    const {objectType, objectID} = currentObject.binding || {};

    const type = scope.get("data", Immutable.List()).filter(item => item.get("type") === objectType).first() || Immutable.fromJS({objects: []});
    return (type.get("objects").filter(item => item.get("id") === objectID).first() || new Immutable.Map()).toJS();
};

export const getParent = (settings, scope) => {
    const current = getCurrent(settings, scope);
    return current.id ? getCurrent(settings, scope, 1) : current;
};

export const getUser = (objectID, scope) => {
    return (
        (scope.get("data", Immutable.List())
              .filter(item => item.get("type") === "resource")
              .first() || new Immutable.Map()
        )
            .get("objects", Immutable.List())
            .filter(user => user.get("id") === objectID)
            .first() || new Immutable.Map()
    ).toJS();
};