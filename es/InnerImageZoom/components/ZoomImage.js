import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

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


  return React.createElement(
    Fragment,
    null,
    React.createElement('img', {
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
    onClose && React.createElement('button', {
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
  src: PropTypes.string,
  srcSet: PropTypes.string,
  fadeDuration: PropTypes.number,
  top: PropTypes.number,
  left: PropTypes.number,
  isZoomed: PropTypes.bool,
  onLoad: PropTypes.func,
  onTouchStart: PropTypes.func,
  onClose: PropTypes.func
} : {};

export default ZoomImage;