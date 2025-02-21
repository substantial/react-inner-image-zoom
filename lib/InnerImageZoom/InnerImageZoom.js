'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Image = require('./components/Image');

var _Image2 = _interopRequireDefault(_Image);

var _ZoomImage = require('./components/ZoomImage');

var _ZoomImage2 = _interopRequireDefault(_ZoomImage);

var _FullscreenPortal = require('./components/FullscreenPortal');

var _FullscreenPortal2 = _interopRequireDefault(_FullscreenPortal);

require('./styles.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InnerImageZoom = function (_Component) {
  _inherits(InnerImageZoom, _Component);

  function InnerImageZoom(props) {
    _classCallCheck(this, InnerImageZoom);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.handleInitialTouchStart = function () {
      var isFullscreen = _this.props.fullscreenOnMobile && window.matchMedia && window.matchMedia('(max-width: ' + _this.props.mobileBreakpoint + 'px)').matches;

      _this.setState({
        isTouch: true,
        isFullscreen: isFullscreen
      });
    };

    _this.handleTouchStart = function (e) {
      _this.offsets = _this.getOffsets(e.changedTouches[0].pageX, e.changedTouches[0].pageY, _this.zoomImg.offsetLeft, _this.zoomImg.offsetTop);
    };

    _this.handleMouseEnter = function () {
      _this.setState({
        isActive: true
      });
    };

    _this.handleClick = function (e) {
      if (_this.state.isZoomed) {
        if (!_this.state.isTouch) {
          _this.zoomOut();
        }

        return;
      }

      if (_this.state.isTouch) {
        _this.setState({
          isActive: true
        });
      }

      if (_this.isLoaded) {
        _this.zoomIn(e.pageX, e.pageY);
      } else {
        _this.onLoadCallback = _this.zoomIn.bind(_this, e.pageX, e.pageY);
      }
    };

    _this.handleLoad = function (e) {
      _this.isLoaded = true;
      _this.zoomImg = e.target;
      _this.bounds = _this.getBounds(_this.img, false);
      _this.ratios = _this.getRatios(_this.bounds, _this.zoomImg);

      if (_this.onLoadCallback) {
        _this.onLoadCallback();
        _this.onLoadCallback = null;
      }
    };

    _this.handleMouseMove = function (e) {
      var left = e.pageX - _this.offsets.x;
      var top = e.pageY - _this.offsets.y;

      left = Math.max(Math.min(left, _this.bounds.width), 0);
      top = Math.max(Math.min(top, _this.bounds.height), 0);

      _this.setState({
        left: left * -_this.ratios.x,
        top: top * -_this.ratios.y
      });
    };

    _this.handleTouchMove = function (e) {
      e.preventDefault();
      e.stopPropagation();

      var left = e.changedTouches[0].pageX - _this.offsets.x;
      var top = e.changedTouches[0].pageY - _this.offsets.y;

      left = Math.max(Math.min(left, 0), (_this.zoomImg.offsetWidth - _this.bounds.width) * -1);
      top = Math.max(Math.min(top, 0), (_this.zoomImg.offsetHeight - _this.bounds.height) * -1);

      _this.setState({
        left: left,
        top: top
      });
    };

    _this.handleCloseClick = function () {
      _this.zoomOut(function () {
        setTimeout(function () {
          if (_this.state.isTouch) {
            _this.zoomImg.removeEventListener('touchmove', _this.handleTouchMove, { passive: false });
          }

          _this.setDefaults();

          _this.setState({
            isActive: false,
            isTouch: false,
            isFullscreen: false
          });
        }, _this.props.fadeDuration);
      });
    };

    _this.initialMove = function (pageX, pageY) {
      _this.offsets = _this.getOffsets(window.pageXOffset, window.pageYOffset, -_this.bounds.left, -_this.bounds.top);

      _this.handleMouseMove({
        pageX: pageX,
        pageY: pageY
      });
    };

    _this.initialTouchMove = function (pageX, pageY) {
      var initialPageX = (pageX - (window.pageXOffset + _this.bounds.left)) * -_this.ratios.x;
      var initialPageY = (pageY - (window.pageYOffset + _this.bounds.top)) * -_this.ratios.y;

      _this.bounds = _this.getBounds(_this.img, _this.state.isFullscreen);
      _this.offsets = _this.getOffsets(0, 0, 0, 0);

      _this.handleTouchMove({
        changedTouches: [{
          pageX: initialPageX,
          pageY: initialPageY
        }],
        preventDefault: function preventDefault() {},
        stopPropagation: function stopPropagation() {}
      });
    };

    _this.zoomIn = function (pageX, pageY) {
      _this.setState({
        isZoomed: true
      }, function () {
        var initialMove = _this.state.isTouch ? _this.initialTouchMove : _this.initialMove;

        initialMove(pageX, pageY);

        if (_this.state.isTouch) {
          _this.zoomImg.addEventListener('touchmove', _this.handleTouchMove, { passive: false });
        }

        if (_this.props.afterZoomIn) {
          _this.props.afterZoomIn();
        }
      });
    };

    _this.zoomOut = function (callback) {
      _this.setState({
        isZoomed: false
      }, function () {
        if (_this.props.afterZoomOut) {
          _this.props.afterZoomOut();
        }

        if (callback) {
          callback();
        }
      });
    };

    _this.setDefaults = function () {
      _this.isLoaded = false;
      _this.onLoadCallback = null;
      _this.zoomImg = null;
      _this.bounds = {};
      _this.offsets = {};
      _this.ratios = {};
    };

    _this.getBounds = function (img, isFullscreen) {
      if (isFullscreen) {
        return {
          width: window.innerWidth,
          height: window.innerHeight,
          left: 0,
          top: 0
        };
      }

      return img.getBoundingClientRect();
    };

    _this.getOffsets = function (pageX, pageY, left, top) {
      return {
        x: pageX - left,
        y: pageY - top
      };
    };

    _this.getRatios = function (bounds, zoomImg) {
      return {
        x: (zoomImg.offsetWidth - bounds.width) / bounds.width,
        y: (zoomImg.offsetHeight - bounds.height) / bounds.height
      };
    };

    _this.state = {
      isActive: false,
      isTouch: false,
      isZoomed: false,
      isFullscreen: false,
      left: 0,
      top: 0
    };

    _this.setDefaults();
    return _this;
  }

  InnerImageZoom.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        src = _props.src,
        srcSet = _props.srcSet,
        sizes = _props.sizes,
        sources = _props.sources,
        zoomSrc = _props.zoomSrc,
        zoomSrcSet = _props.zoomSrcSet,
        alt = _props.alt,
        fadeDuration = _props.fadeDuration,
        className = _props.className;


    var zoomImageProps = {
      src: zoomSrc || src,
      srcSet: zoomSrcSet || srcSet,
      fadeDuration: this.state.isFullscreen ? 0 : fadeDuration,
      top: this.state.top,
      left: this.state.left,
      isZoomed: this.state.isZoomed,
      onLoad: this.handleLoad,
      onTouchStart: this.handleTouchStart,
      onClose: this.state.isTouch ? this.handleCloseClick : null
    };

    return _react2.default.createElement(
      'figure',
      {
        className: 'iiz ' + (className ? className : ''),
        ref: function ref(el) {
          _this2.img = el;
        },
        onTouchStart: this.handleInitialTouchStart,
        onClick: this.handleClick,
        onMouseEnter: this.state.isTouch ? null : this.handleMouseEnter,
        onMouseMove: this.state.isTouch || !this.state.isZoomed ? null : this.handleMouseMove,
        onMouseLeave: this.state.isTouch ? null : this.handleCloseClick
      },
      _react2.default.createElement(_Image2.default, {
        src: src,
        srcSet: srcSet,
        sizes: sizes,
        sources: sources,
        alt: alt
      }),
      this.state.isActive && _react2.default.createElement(
        _react.Fragment,
        null,
        this.state.isFullscreen ? _react2.default.createElement(
          _FullscreenPortal2.default,
          { className: 'iiz__zoom-portal' },
          _react2.default.createElement(_ZoomImage2.default, zoomImageProps)
        ) : _react2.default.createElement(_ZoomImage2.default, zoomImageProps)
      ),
      !this.state.isZoomed && _react2.default.createElement('span', { className: 'iiz__btn iiz__hint' })
    );
  };

  return InnerImageZoom;
}(_react.Component);

InnerImageZoom.propTypes = process.env.NODE_ENV !== "production" ? {
  src: _propTypes2.default.string.isRequired,
  srcSet: _propTypes2.default.string,
  sizes: _propTypes2.default.string,
  sources: _propTypes2.default.array,
  zoomSrc: _propTypes2.default.string,
  zoomSrcSet: _propTypes2.default.string,
  alt: _propTypes2.default.string,
  fadeDuration: _propTypes2.default.number,
  fullscreenOnMobile: _propTypes2.default.bool,
  mobileBreakpoint: _propTypes2.default.number,
  className: _propTypes2.default.string,
  afterZoomIn: _propTypes2.default.func,
  afterZoomOut: _propTypes2.default.func
} : {};

InnerImageZoom.defaultProps = {
  fadeDuration: 150,
  mobileBreakpoint: 640
};

exports.default = InnerImageZoom;
module.exports = exports['default'];