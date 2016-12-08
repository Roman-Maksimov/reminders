import {Immutable, cx} from 'src/vendor';

export const prepareTheme = (theme, customTheme) => {
    return Immutable.fromJS(customTheme).map((className, field) => {

        if(theme[field])
            className = cx(className, theme[field]);

        return className
    }).toJS();
};