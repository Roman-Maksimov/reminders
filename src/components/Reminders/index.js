import {React, CComponent, ReactToolbox, connect, Immutable} from 'src/vendor';
import {BusinessHours, Channel, SmsTemplates} from 'src/components/Reminders/blocks';
import actions from 'src/actions';

const {Card} = ReactToolbox;

export default class Reminder extends CComponent {
    constructor(props, context) {
        super(props, context);

        this.state = {
            objectID: 5
        };

        this.pendingActions = [
            actions.settings.getForm(this.state.objectID),
            actions.settings.getScope()
        ];
    }

    render() {
        const {objectID} = this.state;

        return (
            <div className="reminder">
                <h1>Reminders</h1>
                <Card>
                    <Channel objectID={objectID} />
                    <SmsTemplates objectID={objectID} />
                    <BusinessHours objectID={objectID} />
                </Card>
            </div>
        );
    }
}
