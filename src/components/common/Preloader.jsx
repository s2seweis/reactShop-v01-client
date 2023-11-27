import React from 'react';
import logoWordmark from '../../../static/logo-wordmark.png';
import dignlogo from '../../../static/dign-logo.png';
import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';

const Preloader = () => (
  <div className="preloaderNew">
    <svg version="1.1" id="L3" x="0px" y="0px"
      width="180"
      height="400"
      viewBox="0 0 100 100" enableBackground="new 0 0 0 0">
      <defs>
        <clipPath id="myCircle">
          <circle cx="50" cy="50" r="44" fill="#FFFFFF" />
        </clipPath>
      </defs>
      <image
        style={{ marginLeft: "50px", height: "90px", width: "100%" }}
        href="../../../static/dign-logo.png"
        clipPath="url(#myCircle)"
      />
      <circle fill="#fff" stroke="black" strokeWidth="3" cx="8" cy="54" r="6" >
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 50 44"
          to="360 50 44"
          repeatCount="indefinite" />
      </circle>
    </svg>
  </div>
);

export default Preloader;
