import {Baobab, cloneDeep} from 'src/vendor';

const tree = new Baobab(getDefaultState(), {
    cloningFunction: cloneDeep,
    clone: true
});

export default tree;

function getDefaultState() {
    return {
        user: null,
        errors: {},
        data: {
            symbol: {}
        }
    };
}
