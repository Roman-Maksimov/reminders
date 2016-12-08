import {React, CComponent, cx, connect, Immutable, ReactCSSTransitionGroup, ReactToolbox, Link} from 'src/vendor';
import {defineResource, getCurrent, getParent, getUser} from 'src/components/utils';
import actions from 'src/actions';
import store from 'src/store';

const {Button} = ReactToolbox;

@connect((state, props) => ({
    block: state.settings.getIn(["form", props.blockName], Immutable.List()),
    scope: state.settings.get("scope", Immutable.Map())
}))
export default class Block extends CComponent {
    static propTypes = {
        objectID: React.PropTypes.number.isRequired,
        blockName: React.PropTypes.string.isRequired,
    };

    constructor(props, context) {
        super(props, context);

        const {objectID, block, scope} = props;

        this.state = {
            opened: false,
            current: getCurrent(block, scope),
            parent: getParent(block, scope),
            user: getUser(objectID, scope)
        };
    }

    componentWillReceiveProps(nextProps) {
        const {objectID, block, scope} = nextProps;

        this.setState({
            current: getCurrent(block, scope),
            parent: getParent(block, scope),
            user: getUser(objectID, scope)
        });
    }

    onToggle = () => {
        this.setState({ opened: !this.state.opened });
    };

    onOverride = () => {
        const {blockName, objectID} = this.props;

        actions.settings.overrideBlock(blockName, objectID);
    };

    onSave = () => {
        const {blockName} = this.props;

        actions.settings.saveBlock(blockName);
        this.onToggle();
    };

    onCancel = () => {
        const {block, blockName} = this.props;

        store.dispatch({
            type: 'SETTINGS_SET_TMP_VALUE',
            blockName,
            editable: true,
            payload: defineResource(block).values
        });
    };

    onRestore = () => {
        const {blockName} = this.props;

        actions.settings.restoreBlock(blockName);
    };

    renderControl = () => {
        const {objectID} = this.props;
        const {current = {}, user = {}} = this.state;

        if(current.id === objectID){
            // has already been overridden
            return (
                <div className="reminders-content__control">
                    <Button label='Save'
                            raised
                            primary
                            onClick={this.onSave}
                    />
                    <Button label='Cancel'
                            flat
                            primary
                            onClick={this.onCancel}
                    />
                </div>
            );
        } else {
            return (
                <div className="reminders-content__control">
                    <Button label='Enable Override'
                            className="reminders-content__control-override"
                            raised
                            primary
                            onClick={this.onOverride}
                    />
                    for <span className="reminders-content__control-name">{user.title}</span> or change the settings for entire {
                        current.id
                            ? <Link to={`/resources/${current.id}`}>{current.title} <i className="material-icons reminders-content__control-icon">open_in_new</i></Link>
                            : <span className="reminders-content__control-name">{current.title}</span>
                    }
                </div>
            );
        }
    };

    onPreview = () => {
        const {block, onPreview} = this.props;
        return onPreview && onPreview(defineResource(block).values);
    };

    render() {
        const {
            tag = "div", className = "", children, dispatch,
            objectID, block, blockName,
            dotted, title, preview,
            onPreview,
            ...others
        } = this.props;
        const {opened, current = {}, parent = {}} = this.state;
        const icon = opened ? "keyboard_arrow_up" : "keyboard_arrow_down";

        return  React.createElement(
            tag,
            {
                className: cx("reminders-block", {"reminders-block_opened": this.state.opened}, className),
                ...others
            },
            <div
                className="reminders-header"
                onClick={this.onToggle}
            >
                <div className={cx("reminders-block__padding reminders-header__title", {"reminders-header__title_dotted": dotted})}>{title}</div>
                <div className={cx("reminders-block__content reminders-header__preview", {"reminders-header__preview_opened": opened})}>{this.onPreview()}</div>
                <div className="reminders-block__padding reminders-header__inherit">
                    {current.title}
                    <i className="material-icons reminders-header__icon">{icon}</i>
                </div>
            </div>,
            this.state.opened && (
                <ReactCSSTransitionGroup
                    component="div"
                    className="reminders-content"
                    transitionName="reminders-content"
                    transitionAppear={true}
                    transitionAppearTimeout={500}
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                >
                    <div className="reminders-block__padding"></div>
                    <div className="reminders-block__content reminders-content__detailed">
                        {children}
                        {this.renderControl()}
                    </div>
                    <div className="reminders-block__padding">
                        {current.id === objectID && (
                            <Link
                                className="reminders-content__default"
                                onClick={this.onRestore}
                            >
                                Use Default Value from {parent.title}
                            </Link>
                        )}
                    </div>
                </ReactCSSTransitionGroup>
            )
        );
    }
}
