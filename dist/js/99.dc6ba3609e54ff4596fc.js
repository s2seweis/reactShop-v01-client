"use strict";
(self["webpackChunkecommerce_react"] = self["webpackChunkecommerce_react"] || []).push([[99],{

/***/ 68099:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var components_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(64427);
/* harmony import */ var constants_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(50409);
/* harmony import */ var helpers_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(89722);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(45697);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(67294);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28216);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(16550);
/* eslint-disable indent */







var UserProfile = function UserProfile(props) {
  // profile = users, in firebase
  var profile = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__/* .useSelector */ .v9)(function (state) {
    return state.profile;
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "user-profile"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "user-profile-block"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "user-profile-banner"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "user-profile-banner-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(components_common__WEBPACK_IMPORTED_MODULE_0__/* .ImageLoader */ .S3, {
    alt: "Banner",
    className: "user-profile-banner-img",
    src: profile.banner
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "user-profile-avatar-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(components_common__WEBPACK_IMPORTED_MODULE_0__/* .ImageLoader */ .S3, {
    alt: "Avatar",
    className: "user-profile-img",
    src: profile.avatar
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("button", {
    className: "button button-small user-profile-edit",
    onClick: function onClick() {
      return props.history.push(constants_routes__WEBPACK_IMPORTED_MODULE_3__/* .ACCOUNT_EDIT */ .EO);
    },
    type: "button"
  }, "Edit Account1")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "user-profile-details"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h2", {
    className: "user-profile-name"
  }, profile.fullname), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Email"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h5", null, profile.email), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Address"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", null), profile.address ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h5", null, profile.address) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h5", {
    className: "text-subtle text-italic"
  }, "Address not set"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Address"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", null), profile.role ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h5", null, profile.role) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h5", {
    className: "text-subtle text-italic"
  }, "Address not set"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Mobile"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", null), profile.mobile ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h5", null, profile.mobile.value) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h5", {
    className: "text-subtle text-italic"
  }, "Mobile not set"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Country"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", null), profile.mobile ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h5", null, profile.mobile.country) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h5", {
    className: "text-subtle text-italic"
  }, "Mobile not set"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Country Code"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", null), profile.mobile ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h5", null, profile.mobile.countryCode) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h5", {
    className: "text-subtle text-italic"
  }, "Mobile not set"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Date Joined"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", null), profile.dateJoined ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h5", null, (0,helpers_utils__WEBPACK_IMPORTED_MODULE_4__/* .displayDate */ .Po)(profile.dateJoined)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h5", {
    className: "text-subtle text-italic"
  }, "Not available"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", null, "Date Added"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("br", null), profile.dateAdded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h5", null, (0,helpers_utils__WEBPACK_IMPORTED_MODULE_4__/* .displayDate */ .Po)(profile.dateAdded)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h5", {
    className: "text-subtle text-italic"
  }, "Not available"))));
};
UserProfile.propTypes = {
  history: prop_types__WEBPACK_IMPORTED_MODULE_5___default().shape({
    push: (prop_types__WEBPACK_IMPORTED_MODULE_5___default().func)
  }).isRequired
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_router_dom__WEBPACK_IMPORTED_MODULE_6__/* .withRouter */ .EN)(UserProfile));

/***/ })

}]);
//# sourceMappingURL=99.dc6ba3609e54ff4596fc.js.map