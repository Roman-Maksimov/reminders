import {React, ReactDOM, debounce} from 'src/vendor';
import routes from 'src/routes';
import store from 'src/store';
import style from 'src/styles/main';

(() => {
    const dispatchViewport = debounce(() => {
        store.dispatch({
            type: "VIEWPORT_SET"
        });
    }, 100);

    window.addEventListener("resize", dispatchViewport, false);

    window.dispatchEvent(new Event("resize"));
})();

ReactDOM.render(
    routes,
    document.getElementById('app')
);

