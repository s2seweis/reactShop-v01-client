"use strict";
(self["webpackChunkecommerce_react"] = self["webpackChunkecommerce_react"] || []).push([[279],{

/***/ 65279:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7085);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(8212);
/* harmony import */ var components_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(64427);
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(94649);
/* harmony import */ var hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(76031);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(67294);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(28216);
/* harmony import */ var redux_actions_miscActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(94432);
/* harmony import */ var redux_actions_ingredientActions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(41786);
/* harmony import */ var yup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(19501);
/* harmony import */ var _edit_ingredient_ConfirmModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9478);
/* harmony import */ var _edit_ingredient_EditForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(87697);
/* harmony import */ var redux_saga_effects__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(34857);
/* harmony import */ var _component_ingredient__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(29691);













// Just add this feature if you want :P

var UserWishListTab = function UserWishListTab(parameters) {
  var _ingredients$paramete;
  (0,hooks__WEBPACK_IMPORTED_MODULE_1__/* .useDocumentTitle */ .jr)('Edit Account | Shirts Sale! - Ingredients ');
  (0,hooks__WEBPACK_IMPORTED_MODULE_1__/* .useScrollTop */ .j)();

  // const modal = useModal();
  var dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__/* .useDispatch */ .I0)();
  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    return function () {
      dispatch((0,redux_actions_miscActions__WEBPACK_IMPORTED_MODULE_9__/* .setLoading */ .K4)(false));
    };
  }, []);
  var _useSelector = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__/* .useSelector */ .v9)(function (state) {
      return {
        profile: state.profile,
        ingredients: state.ingredients,
        auth: state.auth,
        isLoading: state.app.loading
      };
    }),
    ingredients = _useSelector.ingredients,
    profile = _useSelector.profile,
    auth = _useSelector.auth,
    isLoading = _useSelector.isLoading;
  var initFormikValues = {
    fullname: ingredients.email || '',
    email: ingredients.email || '',
    address: ingredients.address || '',
    mobile: ingredients.mobile || {},
    avatar: ingredients.avatar || {},
    banner: ingredients.banner || {},
    parameters1: (ingredients === null || ingredients === void 0 || (_ingredients$paramete = ingredients.parameters1) === null || _ingredients$paramete === void 0 ? void 0 : _ingredients$paramete.map(function (person) {
      return {
        name: person.name,
        preis1: person.preis1
      };
    })) || []
  };
  var _useFileHandler = (0,hooks__WEBPACK_IMPORTED_MODULE_1__/* .useFileHandler */ .bE)({
      avatar: {},
      banner: {}
    }),
    imageFile = _useFileHandler.imageFile,
    isFileLoading = _useFileHandler.isFileLoading,
    onFileChange = _useFileHandler.onFileChange;
  var update = function update(form) {
    dispatch((0,redux_actions_ingredientActions__WEBPACK_IMPORTED_MODULE_10__/* .updateIngredient */ .kA)({
      updates: {
        fullname: form.email,
        email: form.email,
        address: form.address,
        mobile: form.mobile,
        // it stazys empty when updating it
        avatar: form.avatar,
        banner: form.banner,
        parameters1: form.parameters1 || []
      },
      files: {
        bannerFile: imageFile.banner.file,
        avatarFile: imageFile.avatar.file
      }
      // credentials
    }));
  };

  var onSubmitUpdate = function onSubmitUpdate(form) {
    // check if data has changed
    var fieldsChanged = Object.keys(form).some(function (key) {
      return ingredients[key] !== form[key];
    });
    if (fieldsChanged || Boolean(imageFile.banner.file || imageFile.avatar.file)) {
      update(form);
    } else {
      console.log("failed to add: ");
    }
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(components_common__WEBPACK_IMPORTED_MODULE_0__/* .Boundary */ .EW, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_component_ingredient__WEBPACK_IMPORTED_MODULE_8__/* .IngredientsNavbar */ .h, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
    className: "product-admin-items"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
    className: "edit-user"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("h3", {
    className: "text-center"
  }, "Edit Ingredients"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(formik__WEBPACK_IMPORTED_MODULE_11__/* .Formik */ .J9, {
    initialValues: initFormikValues,
    validateOnChange: true
    // validationSchema={FormSchema}
    ,
    onSubmit: onSubmitUpdate
    // onSubmit={onSubmitAdd}
    // onSubmit={(onSubmitUpdate, {resetForm}) => {
    //   console.log(onSubmitUpdate);
    //   resetForm({ initFormikValues });
    // } }
  }, function (values, setValues) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(react__WEBPACK_IMPORTED_MODULE_2__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: "user-profile-banner"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: "user-profile-banner-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(components_common__WEBPACK_IMPORTED_MODULE_0__/* .ImageLoader */ .S3, {
      alt: "Banner",
      className: "user-profile-banner-img",
      src: imageFile.banner.url || ingredients.banner
    }), isFileLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: "loading-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, null)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("label", {
      className: "edit-button edit-banner-button",
      htmlFor: "edit-banner"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("input", {
      accept: "image/x-png,image/jpeg",
      disabled: isLoading,
      hidden: true,
      id: "edit-banner",
      onChange: function onChange(e) {
        return onFileChange(e, {
          name: 'banner',
          type: 'single'
        });
      },
      type: "file"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: "user-profile-avatar-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(components_common__WEBPACK_IMPORTED_MODULE_0__/* .ImageLoader */ .S3, {
      alt: "Avatar",
      className: "user-profile-img",
      src: imageFile.avatar.url || ingredients.avatar
    }), isFileLoading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
      className: "loading-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, null)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("label", {
      className: "edit-button edit-avatar-button",
      htmlFor: "edit-avatar"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("input", {
      accept: "image/x-png,image/jpeg",
      disabled: isLoading,
      hidden: true,
      id: "edit-avatar",
      onChange: function onChange(e) {
        return onFileChange(e, {
          name: 'avatar',
          type: 'single'
        });
      },
      type: "file"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_ant_design_icons__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_edit_ingredient_EditForm__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, null));
  }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserWishListTab);

/***/ })

}]);
//# sourceMappingURL=279.e2b1963fb29c9f68544a.js.map