import { useState, useCallback, useEffect } from "react";
import {
  nameRegExp,
  passwordRegExp,
  emailRegExp,
  customMessages,
} from "./utils";

export function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    setIsValid(!Object.values(errors).some((error) => error.length !== 0));
  }, [errors]);

  function setCustomErrors({ name, value }) {
    if (name === "name" && value.length >= 2 && !nameRegExp.test(value)) {
      setErrors({ ...errors, [name]: customMessages[name] });
    }
    if (
      name === "password" &&
      value.length >= 8 &&
      !passwordRegExp.test(value)
    ) {
      setErrors({ ...errors, [name]: customMessages[name] });
    }
    if (name === "email" && !emailRegExp.test(value)) {
      setErrors({ ...errors, [name]: customMessages[name] });
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setCustomErrors({ name, value });
  }

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
    setValues,
    setErrors,
    setIsValid,
  };
}
