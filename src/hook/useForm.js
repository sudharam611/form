import { useEffect, useRef, useState } from "react";

const useForm = (initialValues = {}) => {
  const [formValues, setFormValues] = useState(() => ({ ...initialValues }));
  const [errors, setErrors] = useState({});
  const defaultsRef = useRef({});
  useEffect(() => {
    setFormValues({ ...initialValues });
  }, []);

  const setDefaultValues = (values) => {
    defaultsRef.current = values;
  };
  const handleChange = (name, value) => {
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // const validate = (fields) => {
  //   // console.log(fields);
  //   let isValid = true;
  //   let newErrors = {};
  //   //console.log(fields);
  //   fields.forEach(({ name, rules }) => {
  //     // console.log("name", name);
  //     const value = formValues[name];
  //     rules.forEach((rule) => {
  //       if (rule.required && !value) {
  //         isValid = false;
  //         newErrors[name] = { message: rule.errorMessage, warningOnly: false };
  //       } else if (rule.validator && !rule.validator(value)) {
  //         if (!rule.warningOnly) isValid = false;
  //         newErrors[name] = {
  //           message: rule.errorMessage,
  //           warningOnly: rule.warningOnly || false,
  //         };
  //         console.log(newErrors);
  //       }
  //     });
  //   });
  //   setErrors(newErrors);
  //   return isValid;
  // };
  const validate = (fields) => {
    let isValid = true;
    let newErrors = {};
    fields.forEach(({ name, rules, validateFirst }) => {
      const value = formValues[name];
      for (let rule of rules) {
        if (rule.required && !value) {
          isValid = false;
          newErrors[name] = { message: rule.errorMessage, warningOnly: false };
          if (validateFirst) break;
        } else if (rule.validator && !rule.validator(value)) {
          if (!rule.warningOnly) isValid = false;
          newErrors[name] = {
            message: rule.errorMessage,
            warningOnly: rule.warningOnly || false,
          };
          if (validateFirst) break;
        }
      }
    });
    setErrors(newErrors);
    return isValid;
  };

  // Submit handler
  // const handleSubmit = (fields, callback) => {
  //   return (e) => {
  //     e.preventDefault();
  //     const isValid = validate(fields);
  //     if (isValid) {
  //       // setErrors({});
  //       callback(formValues);
  //       //resetForm();
  //     }
  //   };
  // };

  // Reset form to empty
  const resetForm = () => {
    const cleared = Object.keys(formValues).reduce((acc, key) => {
      acc[key] = "";
      return acc;
    }, {});
    setFormValues(cleared);
    setErrors({});
  };

  // Fill form with default values
  const fillForm = () => {
    console.log("filling");
    // setFormValues(defaultValues);
    // console.log(formValues);
    setFormValues({ ...defaultsRef.current });
    setErrors({});
  };

  return {
    formValues,
    errors,
    setErrors,
    handleChange,
    // handleSubmit,
    resetForm,
    fillForm,
    setFormValues,
    validate,
    setDefaultValues,
  };
};

export default useForm;
