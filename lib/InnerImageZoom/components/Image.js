'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Image = function Image(props) {
  var src = props.src,
      srcSet = props.srcSet,
      sizes = props.sizes,
      sources = props.sources,
      alt = props.alt;


  return _react2.default.createElement(
    _react.Fragment,
    null,
    sources && sources.length > 0 ? _react2.default.createElement(
      'picture',
      null,
      sources.map(function (source, i) {
        return _react2.default.createElement(
          _react.Fragment,
          { key: i },
          source.srcSet && _react2.default.createElement('source', {
            srcSet: source.srcSet,
            sizes: source.sizes,
            media: source.media,
            type: source.type
          })
        );
      }),
      _react2.default.createElement('img', {
        className: 'iiz__img',
        src: src,
        srcSet: srcSet,
        sizes: sizes,
        alt: alt
      })
    ) : _react2.default.createElement('img', {
      className: 'iiz__img',
      src: src,
      srcSet: srcSet,
      sizes: sizes,
      alt: alt
    })
  );
};

Image.propTypes = process.env.NODE_ENV !== "production" ? {
  src: _propTypes2.default.string.isRequired,
  srcSet: _propTypes2.default.string,
  sizes: _propTypes2.default.string,
  sources: _propTypes2.default.array,
  alt: _propTypes2.default.string
} : {};

exports.default = Image;
module.exports = exports['default'];