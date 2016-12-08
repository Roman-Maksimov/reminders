import {React, CComponent, connect, Immutable, ReactToolbox} from 'src/vendor';
import Block from 'src/components/Reminders/Block';
import {defineResource} from 'src/components/utils';
import actions from 'src/actions';
import store from 'src/store';

const {RadioGroup, RadioButton, RadioButtonTheme} = ReactToolbox;

@connect((state, props) => ({
    channel_types: state.settings.get("channel_types", Immutable.List()),
    editable: state.settings.getIn(["tmp", "channels", "editable"], false),
    value: state.settings.getIn(["tmp", "channels", "values", "channels"], ""),
}))
export default class Channel extends CComponent {
    constructor(props, context) {
        super(props, context);

        this.pendingActions = [
            actions.settings.getChannelTypes()
        ];
    }

    onChange = (id) => {
        const {channel_types} = this.props;
        const channel = channel_types.filter(type => type.id === id).first();

        store.dispatch({
            type: 'SETTINGS_SET_TMP_VALUE',
            blockName: "channels",
            editable: true,
            payload: {channels: channel.id}
        });
    };

    onPreview = (value) => {
        const {channel_types} = this.props;
        const channel = channel_types.filter(type => type.id === value.channels).first() || {};

        return channel.title;
    };

    render() {
        const {objectID, channel_types, value, editable} = this.props;

        return (
            <Block
                objectID={objectID}
                blockName="channels"
                title="Send reminders via"
                onPreview={this.onPreview}
            >
                {channel_types.size > 0 && (
                    <RadioGroup
                        name='channels'
                        value={value}
                        onChange={this.onChange}
                    >
                        {channel_types.map(type => (
                            <RadioButton
                                key={type.id}
                                theme={RadioButtonTheme}
                                disabled={!editable}
                                label={type.title}
                                value={type.id}
                            />
                        ))}
                    </RadioGroup>
                )}
            </Block>
        );
    }
}
