import {React} from 'src/vendor';
import Layout from 'src/views/layout';


export default class App extends React.Component {
    render() {
        const {children}  = this.props;
        return <Layout>
            {children}
        </Layout>;
    }
};