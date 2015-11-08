'use strict';

var _reactTransformCatchErrors2 = require('react-transform-catch-errors');

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _reactTransformCatchErrors3 = _interopRequireDefault(_reactTransformCatchErrors2);

var _react = require('react');

var _redboxReact = require('redbox-react');

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

exports.__esModule = true;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _utilsFunctions = require('./utils/functions');

var _reactBootstrap = require('react-bootstrap');

var _Pending = require('./Pending');

var _Pending2 = _interopRequireDefault(_Pending);

var _types = require('./types');

var _components = {
  _$BaseForm: {
    displayName: 'BaseForm'
  }
};

var _reactComponentWrapper = _reactTransformCatchErrors3['default']({
  filename: 'src/BaseForm.js',
  components: _components,
  locals: [],
  imports: [_react, _redboxReact]
});

function _wrapComponent(uniqueId) {
  return function (ReactClass) {
    return _reactComponentWrapper(ReactClass, uniqueId);
  };
}

var BaseForm = (function (_Component) {
  _inherits(BaseForm, _Component);

  _createClass(BaseForm, null, [{
    key: 'propTypes',
    value: {
      clearActionState: _react.PropTypes.func.isRequired,
      dispatch: _react.PropTypes.func.isRequired,
      fields: _react.PropTypes.object.isRequired,
      fieldsNeeded: _react.PropTypes.array.isRequired,
      formName: _react.PropTypes.string.isRequired,
      formKey: _react.PropTypes.string,
      formClass: _react.PropTypes.string,
      handleSubmit: _react.PropTypes.func.isRequired,
      invalid: _react.PropTypes.bool.isRequired,
      pristine: _react.PropTypes.bool.isRequired,
      submit: _react.PropTypes.func.isRequired,
      getActionState: _react.PropTypes.func.isRequired,
      success: _react.PropTypes.bool,
      token: _react.PropTypes.string,
      valid: _react.PropTypes.bool.isRequired
    },
    enumerable: true
  }]);

  function BaseForm() {
    _classCallCheck(this, _BaseForm);

    _Component.call(this);
    this.addField = this.addField.bind(this);
    this.row = this.row.bind(this);
    this.col = this.col.bind(this);
    this.state = {

      pending: false
    };
  }

  BaseForm.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _nextProps$getActionState = nextProps.getActionState();

    var success = _nextProps$getActionState.success;

    if (_lodash2['default'].isEmpty(nextProps.active) && success) {
      this.props.clearActionState();
    }
  };

  BaseForm.prototype.row = function row(field, key, size) {
    var _this = this;

    return _react2['default'].createElement(
      _reactBootstrap.Row,
      { key: key },
      _lodash2['default'].map(field, function (row) {
        var thisSize = _lodash2['default'].get(row, 'bsSize', size);
        return _this.col(row.col, thisSize);
      })
    );
  };

  BaseForm.prototype.col = function col(cols, size) {
    var _this2 = this;

    return _lodash2['default'].map(cols, function (col, key) {
      var thisSize = _lodash2['default'].get(col, 'bsSize', size);
      return _react2['default'].createElement(
        _reactBootstrap.Col,
        _extends({ key: key }, _lodash2['default'].omit(col, 'children')),
        _lodash2['default'].map(col.children, function (child) {
          return _this2.addField(child, thisSize);
        })
      );
    });
  };

  BaseForm.prototype.addField = function addField(field, size) {
    if (!_lodash2['default'].isEmpty(field)) {
      var properties = this.props.fields[field.name];

      switch (field.type) {
        case 'submit':
          return _react2['default'].createElement(_types.GenSubmit, { key: field.name, field: field, size: size, properties: properties, addField: this.addField });
        case 'button':
          return _react2['default'].createElement(_types.GenButton, { key: field.name, field: field, size: size, properties: properties, addField: this.addField });
        case 'dropdown':
          return _react2['default'].createElement(_types.GenDropDown, { formName: this.props.formName, formKey: this.props.formKey, dispatch: this.props.dispatch, key: field.name, field: field, size: size, properties: properties }); // inputType.input(field, size);
        case 'success':
        case 'error':
          return _react2['default'].createElement(_types.GenMessage, { key: field.type, field: field, size: size, properties: properties, valid: this.props.valid, invalid: this.props.invalid, pristine: this.props.pristine, getActionState: this.props.getActionState }); // return this.message(field, size);
        case 'link':
          return this.link(field, size);
        case 'file':
          return _react2['default'].createElement(_types.GenFile, { key: field.name, field: field, size: size, properties: properties, addField: this.addField });
        case 'static':
          return _react2['default'].createElement(_types.GenStatic, { key: field.name, field: field, size: size, properties: properties, addField: this.addField });
        case 'plupload':
          return _react2['default'].createElement(_types.GenPlupload, { key: field.name, field: field, dispatch: this.props.dispatch, formName: this.props.formName, properties: properties, addField: this.addField }); // return this.plupload(field);
        default:
          return _react2['default'].createElement(_types.GenInput, { key: field.name, field: field, size: size, properties: properties, addField: this.addField });
      }
    }
  };

  BaseForm.prototype.render = function render() {
    var _this3 = this;

    var _props$getActionState = this.props.getActionState();

    var pending = _props$getActionState.pending;
    var fieldsNeeded = this.props.fieldsNeeded;

    return _react2['default'].createElement(
      'form',
      { onSubmit: this.props.handleSubmit(this.props.submit), ref: 'form', className: _lodash2['default'].get(this.props, 'formClass', 'form-horizontal') },
      _react2['default'].createElement(
        _Pending2['default'],
        { state: pending || false },
        _react2['default'].createElement(
          'div',
          { formKey: this.props.formKey },
          _lodash2['default'].map(fieldsNeeded, function (field, key) {
            var size = _lodash2['default'].get(field, 'bsSize', 'medium');
            if (field.hasOwnProperty('name')) {
              return _this3.addField(field, size);
            } else if (field.hasOwnProperty('row')) {
              return _this3.row(field, key, size);
            }
          })
        ),
        _react2['default'].createElement('input', { type: 'button', ref: 'button', onClick: this.props.handleSubmit(this.props.submit), className: 'hidden' })
      )
    );
  };

  var _BaseForm = BaseForm;
  BaseForm = _wrapComponent('_$BaseForm')(BaseForm) || BaseForm;
  BaseForm = _reactRedux.connect(function () {
    return {};
  }, _utilsFunctions.mapDispatchToProps)(BaseForm) || BaseForm;
  return BaseForm;
})(_react.Component);

exports['default'] = BaseForm;
module.exports = exports['default'];