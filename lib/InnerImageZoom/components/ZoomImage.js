'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ZoomImage = function ZoomImage(props) {
  var src = props.src,
      srcSet = props.srcSet,
      fadeDuration = props.fadeDuration,
      top = props.top,
      left = props.left,
      isZoomed = props.isZoomed,
      onLoad = props.onLoad,
      onTouchStart = props.onTouchStart,
      onClose = props.onClose;


  return _react2.default.createElement(
    _react.Fragment,
    null,
    _react2.default.createElement('img', {
      className: 'iiz__zoom-img ' + (isZoomed ? 'iiz__zoom-img--visible' : ''),
      style: {
        top: top,
        left: left,
        transition: 'linear ' + fadeDuration + 'ms opacity, linear ' + fadeDuration + 'ms visibility'
      },
      src: src,
      srcSet: srcSet,
      onLoad: onLoad,
      onTouchStart: onTouchStart,
      alt: ''
    }),
    onClose && _react2.default.createElement('button', {
      className: 'iiz__btn iiz__close ' + (isZoomed ? 'iiz__close--visible' : ''),
      style: {
        transition: 'linear ' + fadeDuration + 'ms opacity, linear ' + fadeDuration + 'ms visibility'
      },
      onClick: onClose,
      'aria-label': 'Zoom Out'
    })
  );
};

ZoomImage.propTypes = process.env.NODE_ENV !== "production" ? {
  src: _propTypes2.default.string,
  srcSet: _propTypes2.default.string,
  fadeDuration: _propTypes2.default.number,
  top: _propTypes2.default.number,
  left: _propTypes2.default.number,
  isZoomed: _propTypes2.default.bool,
  onLoad: _propTypes2.default.func,
  onTouchStart: _propTypes2.default.func,
  onClose: _propTypes2.default.func
} : {};

exports.default = ZoomImage;
module.exports = exports['default'];