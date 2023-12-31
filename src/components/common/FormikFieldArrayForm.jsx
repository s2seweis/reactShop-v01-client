import React from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, FieldArray } from "formik";

const FormikFieldArrayForm = ({ parameters }) => (

  <div>
    <Formik
      initialValues={parameters}
      onSubmit={values =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 5000)
      }
    >
      {({ values }) => (
        <Form>
          <FieldArray
            name="paramLists"
            render={arrayHelpers => (
              <div>
                {values.paramLists.length > 0 &&
                  values.paramLists.map((paramList, index) => (
                    <div key={index}>
                      {Object.keys(paramList).map(param => (
                        <Field
                          key={`${param}`}
                          name={`paramLists.${index}.${param}`}
                          placeholder={`${index}.${param}`}
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
                    arrayHelpers.push({ name: "", euro: "" })
                  }
                >
                  {" "}
                  +{" "}
                </button>
              </div>
            )}
          />
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </Form>
      )}
    </Formik>
  </div>
);

export default FormikFieldArrayForm;