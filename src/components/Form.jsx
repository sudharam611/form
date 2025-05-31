import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import useForm from "../hook/useForm";

const FormContext = createContext();

export const useFormContext = () => useContext(FormContext);

const Form = ({
  children,
  initialValues = {},
  onFinish,
  onFinishFailed,
  disabled: disabledProp = false,
  layout = "horizontal",
  variant = "outlined",
  size = "default",
  requiredMark = "default",
  defaultValues = {},
  labelWrap,
}) => {
  //   console.log(defaultValues);
  //   console.log(disabled);
  const formFieldsRef = useRef([]);
  const form = useForm(initialValues);
  const [isDisabled, setIsDisabled] = useState(disabledProp);

  const registerField = (field) => {
    const existingIndex = formFieldsRef.current.findIndex(
      (f) => f.name === field.name
    );

    const fieldData = {
      ...field,
      dependencies: field.dependencies || [], // ✅ Store dependencies as empty array if not provided
      rules: field.rules || [],
      validateFirst: field.validateFirst || false,
    };

    if (existingIndex !== -1) {
      formFieldsRef.current[existingIndex] = fieldData;
    } else {
      formFieldsRef.current.push(fieldData);
    }
  };
  // const validateField = (name, value, formValues) => {
  //   const field = formFieldsRef.current.find((f) => f.name === name);
  //   if (!field) return true;

  //   let isValid = true;
  //   let newError = null;
  //   for (let rule of field.rules) {
  //     //console.log(rule);
  //     if (typeof rule === "function") {
  //       console.log("Inide function");
  //       rule = rule({ getFormValues: () => formValues });
  //       console.log("rule", rule);
  //       if (!rule) continue;
  //     }

  //     if (rule.required && !value) {
  //       isValid = false;
  //       newError = { message: rule.errorMessage, warningOnly: false };
  //       if (field.validateFirst) break;
  //     } else if (rule.validator && !rule.validator(value, formValues)) {
  //       if (!rule.warningOnly) isValid = false;
  //       newError = {
  //         message: rule.errorMessage,
  //         warningOnly: rule.warningOnly || false,
  //       };
  //       if (field.validateFirst) break;
  //     }
  //   }
  //   form.setErrors((prev) => ({
  //     ...prev,
  //     [name]: newError || "",
  //   }));
  //   console.log(form.errors);
  //   return isValid;
  // };

  const validateField = (name, value, formValues) => {
    const field = formFieldsRef.current.find((f) => f.name === name);
    if (!field) return true;

    let isValid = true;
    let newError = null;

    for (let rule of field.rules) {
      // If rule is a function, call it with getFormValues
      if (typeof rule === "function") {
        rule = rule({ getFormValues: () => formValues });
        if (!rule) continue;
      }

      // Handle dynamic required
      let requiredCheck = false;
      if (typeof rule.required === "function") {
        requiredCheck = rule.required(value, formValues);
      } else {
        requiredCheck = rule.required;
      }

      if (
        requiredCheck &&
        (value === undefined || value === null || value === "")
      ) {
        isValid = false;
        newError = { message: rule.errorMessage, warningOnly: false };
        if (field.validateFirst) break;
      } else if (rule.validator && !rule.validator(value, formValues)) {
        if (!rule.warningOnly) isValid = false;
        newError = {
          message: rule.errorMessage,
          warningOnly: rule.warningOnly || false,
        };
        if (field.validateFirst) break;
      }
    }

    form.setErrors((prev) => ({
      ...prev,
      [name]: newError || "",
    }));

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = form.validate(formFieldsRef.current);
    if (isValid) {
      onFinish?.(form.formValues);
      //form.resetForm();
    } else {
      onFinishFailed?.(form.errors);
    }
  };

  useEffect(() => {
    if (form && defaultValues) {
      form.setDefaultValues(defaultValues);
    }
  }, [form, defaultValues]);

  // Handle disabling logic separately
  useEffect(() => {
    setIsDisabled(disabledProp);
  }, [disabledProp]);

  return (
    <>
      {disabledProp && (
        <label>
          <input
            type="checkbox"
            checked={isDisabled}
            onChange={(e) => setIsDisabled(e.target.checked)}
            className="disable-form"
          />
          Form disabled
        </label>
      )}
      <FormContext.Provider
        value={{
          ...form,
          registerField,
          validateField,
          disabled: isDisabled,
          layout,
          variant,
          size,
          requiredMark,
          labelWrap,
          formFieldsRef,
        }}
      >
        <form onSubmit={handleSubmit} className={`form-layout-${layout}`}>
          {children}
        </form>
      </FormContext.Provider>
    </>
  );
};

export default Form;
