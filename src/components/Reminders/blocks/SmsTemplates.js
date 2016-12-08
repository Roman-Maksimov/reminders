import {React, CComponent, connect, Immutable, ReactToolbox} from 'src/vendor';
import Block from 'src/components/Reminders/Block';
import store from 'src/store';

const {Input} = ReactToolbox;

@connect((state, props) => ({
    editable: state.settings.getIn(["tmp", "smsTemplates", "editable"], false),
    value: state.settings.getIn(["tmp", "smsTemplates", "values", "smsText"], ""),
}))
export default class SmsTemplates extends CComponent {
    onChange = (value) => {
        store.dispatch({
            type: 'SETTINGS_SET_TMP_VALUE',
            blockName: "smsTemplates",
            editable: true,
            payload: {smsText: value}
        });
    };

    onPreview = (value) => {
        return value.smsText;
    };

    render() {
        const {objectID, value, editable} = this.props;

        return (
            <Block
                objectID={objectID}
                blockName="smsTemplates"
                title="...with message"
                dotted
                onPreview={this.onPreview}
            >
                <Input
                    type='text'
                    disabled={!editable}
                    multiline
                    label='SMS Message'
                    maxLength={140}
                    value={value}
                    onChange={this.onChange}
                />
            </Block>
        );
    }
}
