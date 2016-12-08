import { capitalize } from "src/vendor";

const getDocumentSize = (param) => {
    if (window.document) {
        const name = capitalize(param);
        const elem = window.document;
        const doc = elem.documentElement;
        return Math.max(
            elem.body["scroll" + name],
            doc["scroll" + name],
            elem.body["offset" + name],
            doc["offset" + name],
            doc["client" + name]
        );
    } else {
        return 0;
    }
};

const getViewPort = () => (["innerWidth", "innerHeight", "screen"].every(v => v in window)) ? ({
    screenWidth: getDocumentSize("width"),
    screenHeight: getDocumentSize("height")
}) : ({
    screenWidth: 0,
    screenHeight: 0
});

const def = Object.assign({}, getViewPort(), {
    scrollOffset: 0
});

export const viewport = (state = def, action) => {
    switch(action.type){
        case "VIEWPORT_SET":
            return Object.assign({}, state, getViewPort());
    }
    return state;
};
