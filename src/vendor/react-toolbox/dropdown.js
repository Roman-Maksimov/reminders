import {React} from 'src/vendor';
import {prepareTheme} from './_utils';

import DropdownOriginal from 'react-toolbox/lib/dropdown';
import customTheme from './dropdown.scss';

export const Dropdown = (props) => {
    const {theme = {}, ...others} = props;
    const _theme = prepareTheme(theme, customTheme);

    return (
        <DropdownOriginal theme={_theme} {...others} />
    );
};

export default Dropdown;
