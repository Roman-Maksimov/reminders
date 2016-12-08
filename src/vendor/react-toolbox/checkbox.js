import {React} from 'src/vendor';
import {prepareTheme} from './_utils';

import CheckboxOriginal from 'react-toolbox/lib/checkbox';
import customTheme from './checkbox.scss';

export const Checkbox = (props) => {
    const {theme = {}, ...others} = props;
    const _theme = prepareTheme(theme, customTheme);

    return (
        <CheckboxOriginal theme={_theme} {...others} />
    );
};

export default Checkbox;
