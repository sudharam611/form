import React, { useEffect, useCallback, useRef } from "react";
import { useFormContext } from "./Form";
import _ from "lodash";
import debounce from "lodash/debounce";
import { QuestionCircleOutlined } from "@ant-design/icons";
const FormItem = ({
  name,
  label,
  type = "text",
  placeholder = "",
  rules = [],
  options = [],
  tooltip = "",
  children,
  valuePropName = "value",
  validateTrigger = "onBlur",
  validateDebounce = 300,
  validateFirst = false,
  hasFeedback = false,
  validateStatus,
  help = "",
  dependencies = [],
  ...restProps
}) => {
  const {
    formValues,
    errors,
    handleChange,
    registerField,
    validateField,
    disabled,
    layout,
    variant,
    size,
    requiredMark,
    labelWrap,
    formFieldsRef,
  } = useFormContext();
  const isRequired = rules?.some((rule) => rule?.required);

  const formValuesRef = useRef(formValues); // ✅ Fix 2
  useEffect(() => {
    formValuesRef.current = formValues;
  }, [formValues]);

  useEffect(() => {
    registerField({ name, rules, validateFirst, dependencies });
  }, [name, rules, registerField, validateFirst, dependencies]);

  const debouncedValidateRef = useRef();

  useEffect(() => {
    debouncedValidateRef.current = debounce((value) => {
      console.log("debouncing");
      validateField(name, value, formValuesRef.current);
    }, validateDebounce);
  }, [validateField, validateDebounce, name]);

  // const handleInputChange = useCallback(
  //   (value) => {
  //     handleChange(name, value);
  //     if (validateTrigger === "onChange") {
  //       debouncedValidateRef.current(value);
  //     }
  //   },
  //   [handleChange, name, validateTrigger]
  // );

  // const handleInputChange = useCallback(
  //   (value) => {
  //     handleChange(name, value);

  //     if (validateTrigger === "onChange") {
  //       debouncedValidateRef.current(value);

  //       // ✅ Revalidate dependent fields
  //       formFieldsRef.current.forEach((field) => {
  //         if (field.dependencies?.includes(name)) {
  //           validateField(field.name, formValues[field.name], formValues);
  //         }
  //       });
  //     }
  //   },
  //   [handleChange, name, validateTrigger, formValues]
  // );
  // const handleInputChange = useCallback(
  //   (value) => {
  //     handleChange(name, value);

  //     if (validateTrigger === "onChange") {
  //       debouncedValidateRef.current(value);
  //     }

  //     // ✅ Trigger validation on dependent fields
  //     const dependentFields = formFieldsRef.current.filter((field) =>
  //       field.dependencies?.includes(name)
  //     );

  //     dependentFields.forEach((depField) => {
  //       const dependentValue = formValues[depField.name];
  //       validateField(depField.name, dependentValue, {
  //         ...formValues,
  //         [name]: value, // ensure current update is included
  //       });
  //     });
  //   },
  //   [handleChange, name, validateTrigger, formValues]
  // );

  // const handleInputBlur = useCallback(() => {
  //   if (validateTrigger === "onBlur") {
  //     validateField(name, formValues[name], formValues);
  //   }
  // }, [validateTrigger, validateField, name, formValues]);

  // const handleInputBlur = useCallback(() => {
  //   if (validateTrigger === "onBlur") {
  //     validateField(name, formValues[name], formValues);

  //     // Also validate dependent fields on blur
  //     const dependentFields = formFieldsRef.current.filter((field) =>
  //       field.dependencies?.includes(name)
  //     );

  //     dependentFields.forEach((depField) => {
  //       const dependentValue = formValues[depField.name];
  //       validateField(depField.name, dependentValue, formValues);
  //     });
  //   }
  // }, [validateTrigger, validateField, name, formValues]);
  //console.log(formFieldsRef.current);
  const handleInputChange = useCallback(
    (value) => {
      // Update form state
      handleChange(name, value);

      // Create a fresh snapshot of form values with current change
      const updatedFormValues = { ...formValuesRef.current, [name]: value };
      // Use latest form values from ref

      if (validateTrigger === "onChange") {
        debouncedValidateRef.current(value);
      } else {
        validateField(name, value, updatedFormValues);
      }

      // Validate dependent fields with updated values
      const dependentFields = formFieldsRef.current.filter((field) =>
        field.dependencies?.includes(name)
      );

      dependentFields.forEach((depField) => {
        const dependentValue = updatedFormValues[depField.name];
        validateField(depField.name, dependentValue, updatedFormValues);
      });
    },
    [handleChange, name, validateTrigger]
  );

  const handleInputBlur = useCallback(() => {
    if (validateTrigger === "onBlur") {
      validateField(name, formValuesRef.current[name], formValuesRef.current);

      // Validate dependent fields on blur as well
      const dependentFields = formFieldsRef.current.filter((field) =>
        field.dependencies?.includes(name)
      );

      dependentFields.forEach((depField) => {
        const dependentValue = formValuesRef.current[depField.name];
        validateField(depField.name, dependentValue, formValuesRef.current);
      });
    }
  }, [validateTrigger, validateField, name]);

  const renderRequiredIndicator = () => {
    if (
      requiredMark?.type === "customize" &&
      typeof requiredMark.render === "function"
    ) {
      return requiredMark.render(isRequired);
    }

    if (!isRequired) {
      if (requiredMark?.type === "optional" || requiredMark === "optional") {
        return <span className="optional-text">(optional)</span>;
      }
      return null;
    }

    if (requiredMark?.type === "hidden" || requiredMark === "hidden") {
      return null;
    }

    return <span className="required-asterisk">*</span>;
  };

  const getValidateStatus = () => {
    if (typeof validateStatus === "undefined") {
      const error = errors[name];
      const hasValue =
        formValues[name] !== undefined && formValues[name] !== "";

      if (!error && hasValue) return "success";
      if (error?.validating) return "validating";
      if (error?.warningOnly) return "warning";
      if (error) return "error";

      return undefined; // No status if untouched
    }

    return validateStatus;
  };

  const status = getValidateStatus();
  const renderFeedbackIcon = () => {
    if (!hasFeedback || !status) return null;
    // console.log(hasFeedback);

    switch (status) {
      case "success":
        return <span className="feedback-icon success">✔️</span>;
      case "error":
        return <span className="feedback-icon error">❌</span>;
      case "warning":
        return <span className="feedback-icon warning">⚠️</span>;
      case "validating":
        return <span className="feedback-icon validating">🔄</span>;
      default:
        return null;
    }
  };

  const renderInput = () => {
    const commonProps = {
      id: name,
      name,
      disabled,
      className: `form-input ${variant} ${size} form-input-${status}`,
      onBlur: handleInputBlur,
    };

    switch (type) {
      case "textarea":
        return (
          <textarea
            {...commonProps}
            rows={4}
            placeholder={placeholder}
            value={formValues[name] || ""}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        );

      case "select":
        return (
          <select
            {...commonProps}
            value={formValues[name] || ""}
            onChange={(e) => handleInputChange(e.target.value)}
          >
            <option value="">Select {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <input
            {...commonProps}
            type="checkbox"
            checked={formValues[name] || false}
            onChange={(e) => handleInputChange(e.target.checked)}
          />
        );

      case "radio":
        return (
          <div className="radio">
            {options.map((option) => (
              <label key={option} className="form-radio-label">
                <input
                  {...commonProps}
                  type="radio"
                  value={option}
                  checked={formValues[name] === option}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
                <span className="radio-input">{option}</span>
              </label>
            ))}
          </div>
        );

      case "file":
        return (
          <input
            {...commonProps}
            type="file"
            onChange={(e) => handleInputChange(e.target.files[0])}
          />
        );

      default:
        return (
          <input
            {...commonProps}
            type={type}
            placeholder={placeholder}
            value={formValues[name] || ""}
            onChange={(e) => handleInputChange(e.target.value)}
          />
        );
    }
  };

  const renderChildren = () => {
    if (!children) return renderInput();

    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;

      const value =
        valuePropName === "checked"
          ? formValues[name] ?? false
          : formValues[name] ?? "";

      const handleChildChange = (e) => {
        // const newValue =
        //   valuePropName === "checked"
        //     ? e.target.checked
        //     : e.target.value;
        // const newValue =
        //   valuePropName === "checked"
        //     ? e.target.checked
        //     : e.target.value
        //     ? e.target.value
        //     : e;
        const newValue =
          valuePropName === "checked"
            ? e.target.checked
            : e?.target?.value !== undefined
            ? e.target.value
            : e;

        handleInputChange(newValue); // ✅ Only update value, no validation here
        if (validateTrigger === "onChange") {
          debouncedValidateRef.current(newValue);
        }
      };

      return React.cloneElement(child, {
        ...restProps, // includes rules if passed to FormItem
        type,
        placeholder,
        name,
        rules,
        [valuePropName]: value,
        onChange: handleChildChange,
        onBlur: () => {
          if (validateTrigger === "onBlur") {
            validateField(name, formValues[name], formValues);
          }
        },
        // ✅ No onBlur validation
      });
    });
  };

  return (
    <div className={`form-item form-item-${layout}`}>
      {children ? (
        <>
          {label && (
            <label
              htmlFor={name}
              className={`form-label ${
                labelWrap ? "label-wrap" : "label-nowrap"
              }`}
            >
              {label}
            </label>
          )}
          <div className="render-children-section">
            {renderChildren()}

            {errors[name]?.message && (
              <div
                className={`${
                  errors[name].warningOnly ? "input-warning" : "input-error"
                }`}
              >
                {errors[name].message}
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <label
            htmlFor={name}
            className={`form-label ${
              labelWrap ? "label-wrap" : "label-nowrap"
            }`}
          >
            {renderRequiredIndicator()}
            {label}
            {tooltip && (
              <span className="tooltip-container">
                <QuestionCircleOutlined />
                <span className="tooltip-text">{tooltip}</span>
              </span>
            )}
          </label>
          <div className="input-field-wrapper">
            {renderChildren()}
            {renderFeedbackIcon()}

            {help && <span className="help-text">{help}</span>}
            {errors[name]?.message && (
              <div
                className={`${
                  errors[name].warningOnly ? "input-warning" : "input-error"
                }`}
              >
                {errors[name].message}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FormItem;
