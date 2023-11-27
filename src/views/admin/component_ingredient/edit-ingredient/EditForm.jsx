import { ArrowLeftOutlined, CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { CustomInput, CustomMobileInput } from 'components/formik';
import { ADMIN_SETTINGS, ADMIN_INGREDIENDTS_NEW } from 'constants/routes';
import { Field, useFormikContext, FieldArray } from 'formik';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addSettings, updateSetting } from 'redux/actions/settingActions';
import {
  useDocumentTitle, useFileHandler, useModal, useScrollTop
} from 'hooks';
import { useState } from "react";
import { FiArrowLeftCircle, FiArrowRightCircle, FiArrowDownCircle, FiArrowUpCircle } from 'react-icons/fi';

const EditForm = ({ isLoading, authProvider }) => {
  const history = useHistory();
  const { values, submitForm, resetForm } = useFormikContext();
  // small
  const [isActive, setIsActive] = useState(false);
  // Test Start
  const [favorite, setFavorite] = useState(false);
  // medium
  const [isActive1, setIsActive1] = useState(false);
  // large
  const [isActive2, setIsActive2] = useState(false);
  // xl
  const [isActive3, setIsActive3] = useState(false);

  const [selected, setIsSelected] = useState("");
  const ingredients = useSelector((state) => state.ingredients);

  // Test: React Final Form
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  const onSubmit = async values => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };

  return (
    <div className="user-profile-details">
      <div className="dropdown-new">
        <div
          onClick={(e) => {
            setIsActive(!isActive);
          }}
          className="button button-muted w-100-mobile">
          <h3>Ingredients Small</h3>
          {isActive ? (
            <FiArrowUpCircle
              // className='bigger' 
              style={{ color: "#F76631", width: "24px", height: "24px", marginInlineStart: "auto" }} />
          ) : (
            <FiArrowDownCircle
              style={{ color: "#F76631", width: "24px", height: "24px", marginInlineStart: "auto" }} />
          )}
          <h2>{selected}</h2>
          <span
            className={isActive ? "fas fa-caret-up" : "fas fa-caret-down"}
          />
        </div>
        <div
          className="dropdown-content"
          style={{ display: isActive ? "block" : "none" }}
        >
          <div
            className="item-new"
          >
            <div className="example-ingredients">
              <h5>example: 1.00/ 1.50/ 2.00</h5>
            </div>
            <div className='fieldarray-top' >
              <FieldArray
                name="parameters1"
                // disabled={isLoading}
                className="fieldarray"
                render={arrayHelpers => (
                  <div>
                    {values.parameters1?.length > 0 &&
                      values.parameters1.map((paramList, index) => (
                        <div key={index}>
                          {Object.keys(paramList).map(param => (
                            <Field
                              key={`${param}`}
                              name={`parameters1.${index}.${param}`}
                              // placeholder={`${"index"}.${param}`}
                              className="field-ingredients"
                              // placeholder={`${param}`}
                              placeholder={`${param}`}
                            />
                          ))}
                          <button
                            type="button"
                            style={{ width: "15px" }}
                          >
                            {" "}
                            €{" "}
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            style={{ width: "15px" }}
                          >
                            {" "}
                            -{" "}
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({ name: "", price: "" })
                      }
                    >
                      {" "}
                      +{" Add Ingredients  "}
                    </button>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="dropdown-new">
        <div
          onClick={(e) => {
            setIsActive1(!isActive1);
          }}
          className="button button-muted w-100-mobile">
          <h3>Ingredients Medium</h3>
          {isActive1 ? (
            <FiArrowUpCircle
              style={{ color: "#F76631", width: "24px", height: "24px", marginInlineStart: "auto" }} />
          ) : (
            <FiArrowDownCircle

              style={{ color: "#F76631", width: "24px", height: "24px", marginInlineStart: "auto" }} />
          )}
          <h2>{selected}</h2>
          <span
            className={isActive1 ? "fas fa-caret-up" : "fas fa-caret-down"}
          />
        </div>
        <div
          className="dropdown-content"
          style={{ display: isActive1 ? "block" : "none" }}
        >
          <div
            className="item-new"
          >
            <div className='fieldarray-top' >
              <h4>Ingredients</h4>
              <FieldArray
                name="parameters2"
                // disabled={isLoading}
                className="fieldarray"
                render={arrayHelpers => (
                  <div>
                    {values.parameters2?.length > 0 &&
                      values.parameters2.map((paramList, index) => (
                        <div key={index}>
                          {Object.keys(paramList).map(param => (
                            <Field
                              key={`${param}`}
                              name={`parameters2.${index}.${param}`}
                              placeholder={`${index}.${param}`}
                              className="field-ingredients"
                            />
                          ))}
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            {" "}
                            -{" "}
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({ name: "", price: "" })
                      }
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="dropdown-new">
        <div
          onClick={(e) => {
            setIsActive2(!isActive2);
          }}
          className="button button-muted w-100-mobile">
          <h3>Ingredients Large</h3>
          {isActive2 ? (
            <FiArrowUpCircle
              style={{ color: "#F76631", width: "24px", height: "24px", marginInlineStart: "auto" }} />
          ) : (
            <FiArrowDownCircle
              style={{ color: "#F76631", width: "24px", height: "24px", marginInlineStart: "auto" }} />
          )}
          <h2>{selected}</h2>
          <span
            className={isActive2 ? "fas fa-caret-up" : "fas fa-caret-down"}
          />
        </div>
        <div
          className="dropdown-content"
          style={{ display: isActive2 ? "block" : "none" }}
        >
          <div
            className="item-new"
          >
            {/* Here comes the component */}
            <div className='fieldarray-top' >
              <h4>Ingredients</h4>
              <FieldArray
                name="parameters3"
                // disabled={isLoading}
                className="fieldarray"
                render={arrayHelpers => (
                  <div>
                    {values.parameters3?.length > 0 &&
                      values.parameters3.map((paramList, index) => (

                        <div key={index}>
                          {Object.keys(paramList).map(param => (

                            <Field
                              key={`${param}`}
                              name={`parameters3.${index}.${param}`}
                              placeholder={`${index}.${param}`}
                              className="field-ingredients"
                            />
                          ))}
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            {" "}
                            -{" "}
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({ name: "", price: "" })
                      }
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="dropdown-new">
        <div
          onClick={(e) => {
            setIsActive3(!isActive3);
          }}
          className="button button-muted w-100-mobile">
          <h3>Ingredients Extra Large</h3>
          {isActive3 ? (
            <FiArrowUpCircle
              style={{ color: "#F76631", width: "24px", height: "24px", marginInlineStart: "auto" }} />
          ) : (
            <FiArrowDownCircle
              style={{ color: "#F76631", width: "24px", height: "24px", marginInlineStart: "auto" }} />
          )}
          <h2>{selected}</h2>
          <span
            className={isActive3 ? "fas fa-caret-up" : "fas fa-caret-down"}
          />
        </div>
        <div
          className="dropdown-content"
          style={{ display: isActive3 ? "block" : "none" }}
        >
          <div
            className="item-new"
          >
            <div className='fieldarray-top' >
              <h4>Ingredients</h4>
              <FieldArray
                name="parameters4"
                // disabled={isLoading}
                className="fieldarray"
                render={arrayHelpers => (
                  <div>
                    {values.parameters4?.length > 0 &&
                      values.parameters4.map((paramList, index) => (
                        <div key={index}>
                          {Object.keys(paramList).map(param => (
                            <Field
                              key={`${param}`}
                              name={`parameters4.${index}.${param}`}
                              placeholder={`${index}.${param}`}
                              className="field-ingredients"
                            />
                          ))}
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            {" "}
                            -{" "}
                          </button>
                        </div>
                      ))}
                    <button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({ name: "", price: "" })
                      }
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <br />
      <div className="edit-user-action">
        <button
          className="button button-muted w-100-mobile"
          disabled={isLoading}
          onClick={() => history.push(ADMIN_INGREDIENDTS_NEW)}
          type="button"
        >
          <ArrowLeftOutlined />
          &nbsp;
          Back to Settings
        </button>
        <button
          className="button w-100-mobile"
          // disabled={isLoading}
          onClick={submitForm}
          type="button"
        >
          {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
          &nbsp;
          {isLoading ? 'Loading' : 'Update Ingredients'}
        </button>
      </div>
    </div>
  );
};

EditForm.propTypes = {
  // isLoading: PropType.bool.isRequired,
  // authProvider: PropType.string.isRequired
};

export default EditForm;