import {Immutable} from 'src/vendor';
import actions from 'src/actions';
import store from 'src/store';
import {request} from 'src/utils';
import {getSortedForm, defineResource} from 'src/components/utils';


export const settings = {
    getChannelTypes: () => {
        const req = request({method: 'get', url: 'json/channel_types.json'});
        const promise = req.endAsync();

        return promise
            .then((res) => {
                if(res.body && !res.body.error){
                    store.dispatch({
                        type: 'SETTINGS_SET_CHANNEL_TYPES',
                        payload: res.body
                    });
                }
            })
            .catch((e) => {
                actions.errors.set(e);
            })
            .finally(() => {
                if (promise.isCancelled()) {
                    req.abort();
                }
            });
    },

    getForm: (objectID) => {
        const req = request({method: 'get', url: 'json/form.json'});
        const promise = req.endAsync();

        return promise
            .then((res) => {
                if(res.body && !res.body.error){
                    const form = getSortedForm(res.body);

                    store.dispatch({
                        type: 'SETTINGS_SET_FORM',
                        payload: form
                    });

                    form.forEach((block, blockName) => {
                        const current = defineResource(block);

                        store.dispatch({
                            type: 'SETTINGS_SET_TMP_VALUE',
                            blockName,
                            editable: current.binding.objectID === objectID,
                            payload: current.values
                        });
                    });
                }
            })
            .catch((e) => {
                actions.errors.set(e);
            })
            .finally(() => {
                if (promise.isCancelled()) {
                    req.abort();
                }
            });
    },

    getScope: () => {
        const req = request({method: 'get', url: 'json/scope.json'});
        const promise = req.endAsync();

        return promise
            .then((res) => {
                if(res.body && !res.body.error){
                    store.dispatch({
                        type: 'SETTINGS_SET_SCOPE',
                        payload: res.body
                    });
                }
            })
            .catch((e) => {
                actions.errors.set(e);
            })
            .finally(() => {
                if (promise.isCancelled()) {
                    req.abort();
                }
            });
    },

    saveBlock: (blockName) => {
        // transfer changes to the back-end here

        store.dispatch({
            type: 'SETTINGS_SET_VALUE',
            blockName,
        });
    },

    renewTemporary: (blockName, editable) => {
        const state = store.getState();
        const block = state.settings.getIn(["form", blockName], Immutable.List());
        const current = defineResource(block);

        store.dispatch({
            type: 'SETTINGS_SET_TMP_VALUE',
            blockName,
            editable,
            payload: current.values
        });
    },

    restoreBlock: (blockName) => {
        // transfer changes to the back-end here

        store.dispatch({
            type: 'SETTINGS_RESTORE_VALUE',
            blockName,
        });

        actions.settings.renewTemporary(blockName, false);
    },

    overrideBlock: (blockName, objectID) => {
        // transfer changes to the back-end here

        store.dispatch({
            type: 'SETTINGS_OVERRIDE_VALUE',
            blockName,
            objectID,
        });

        actions.settings.renewTemporary(blockName, true);
    }
};
