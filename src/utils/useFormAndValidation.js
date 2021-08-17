
import {useState, useCallback} from 'react';
import {nameRegExp, passwordRegExp, emailRegExp, customMessages} from './utils';

export function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(true);

  function setCustomErrors({name, value}) {
    if (name === 'name' && value.length >= 2 && !nameRegExp.test(value)) {
      setErrors({...errors, [name]: customMessages[name]});
    }
    if (name === 'password' && value.length >=8 && !passwordRegExp.test(value)) {
      setErrors({...errors, [name]: customMessages[name]});
    }
    if (name === 'email' && !emailRegExp.test(value)) {
      setErrors({...errors, [name]: customMessages[name]});
    }
  }

  function handleChange(evt) {
    const {name, value} = evt.target;
    setValues({...values, [name]: value });
    setErrors({...errors, [name]: evt.target.validationMessage});
    setCustomErrors({name, value})
    setIsValid(evt.target.closest('form').checkValidity());
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid  = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setErrors, setIsValid };
}
