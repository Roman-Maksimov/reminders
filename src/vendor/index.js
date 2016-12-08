export const React = require('react');
export const ReactDOM = require('react-dom');
export const ReactDOMServer = require('react-dom/server');
export const ReactRouter = require('react-router');
export const {Link} = ReactRouter;
export const ReactRouterRedux = require('react-router-redux');
export const {Locations, Location, NotFound} = require('react-router-component');

export const ReactTransitionGroup = require('react-addons-transition-group');
export const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

export const Redux = require('redux');
export const {Provider, connect} = require('react-redux');

export const ReactToolbox = require('./react-toolbox');
//export const ReactToolbox = require('react-toolbox');

export const {themr} = require('react-css-themr');
//export const theme = require('src/themes/material.indigo-pink.min.css');

export const cx = require('classnames/bind');

export const lodash = require('lodash');
lodash.mixin(require("lodash-inflection"));
export const {capitalize, cloneDeep, debounce} = lodash;

export const Immutable = require('immutable');

export const {mixins} = require('core-decorators');
export const LinkedStateMixin = require('react-addons-linked-state-mixin');

export const Promise = require('bluebird');

Promise.config({
    warnings: false,
    cancellation: true,
    longStackTraces: true
});

export const request = Promise.promisifyAll(require('superagent-cache')());

export const moment = require('moment');

export const CComponent = require('src/components').default;
