import {React, CComponent, connect, Immutable, ReactToolbox} from 'src/vendor';
import Block from 'src/components/Reminders/Block';
import store from 'src/store';

const {Checkbox} = ReactToolbox;

@connect((state, props) => ({
    editable: state.settings.getIn(["tmp", "bussinesHours", "editable"], false),
    value: state.settings.getIn(["tmp", "bussinesHours", "values", "daysMask"], []),
}))
export default class BusinessHours extends CComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            days: new Immutable.OrderedMap({
                sunday: "Su",
                monday: "Mo",
                tuesday: "Tu",
                wednesday: "We",
                thursday: "Th",
                friday: "Fr",
                saturday: "Sa",
            })
        };
    }

    onChange = (id, val) => {
        const {value} = this.props;
        const tmpValues = value.filter(day => day === id && val || day !== id );
        const daysMask = this.state.days
            .filter(
                (title, day) => (day === id && val) || tmpValues.contains(day)
            )
            .map((title, day) => day)
            .toSet()
            .toJS();

        store.dispatch({
            type: 'SETTINGS_SET_TMP_VALUE',
            blockName: "bussinesHours",
            editable: true,
            payload: {daysMask}
        });
    };

    onPreview = (value) => {
        const {daysMask = []} = value;

        return this.state.days
            .filter(
                (title, id) => daysMask.indexOf(id) !== -1
            )
            .join(" ");
    };

    render() {
        const {objectID, value, editable} = this.props;

        const theme = {
            field: "theme-days__checkbox-field",
            text: "theme-days__checkbox-text"
        };

        return (
            <Block
                objectID={objectID}
                blockName="bussinesHours"
                title="...on"
                dotted
                onPreview={this.onPreview}
            >
                {this.state.days.map((title, id) => (
                    <Checkbox
                        key={id}
                        theme={theme}
                        disabled={!editable}
                        checked={value.filter(day => day === id).size > 0}
                        label={title}
                        onChange={this.onChange.bind(this, id)}
                    />
                ))}
            </Block>
        );
    }
}
