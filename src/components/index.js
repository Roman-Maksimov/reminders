import {React} from 'src/vendor';

export default class CComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.pendingActions = [];
    }

    componentWillUnmount() {
        this.cancelPendingActions();
    }

    cancelPendingActions = () => {
        this.pendingActions.forEach((action) => {
            action["isPending"] && action.isPending() && action.cancel();
        });
    };

    replacePendingAction = (index, action) => {
        if(!this.pendingActions[index])
            return;

        // cancel old action
        this.pendingActions[index]["isPending"]
            && this.pendingActions[index].isPending()
            && this.pendingActions[index].cancel();

        // put the new one
        setTimeout(() => {
            this.pendingActions[index] = action;
        }, 0);
    }
}