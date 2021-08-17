
import {useState, useCallback} from 'react';

export function useFormAndValidation() {
  const [ values, setValues ] = useState({});
  const [ errors, setErrors ] = useState({});
  const [ isValid, setIsValid ] = useState(true);

  function handleChange(evt) {
    const {name, value} = evt.target;
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\- ]+$/g;
    const passwordRegExp = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    setValues({...values, [name]: value });
    setErrors({...errors, [name]: evt.target.validationMessage});
    if (name === 'name' && value.length >= 2 && !nameRegex.test(value)) {
      setErrors({...errors, [name]: 'Введен недопустимый символ'});
    }
    if (name === 'password' && value.length >=8 && !passwordRegExp.test(value)) {
      setErrors({...errors, [name]: 'Слишком слабый пароль. Необходимо использовать латинские буквы, как минимум 1 цифру, спецсимвол, прописную и заглавные буквы.'});
    }
    setIsValid(evt.target.closest('form').checkValidity());
  }

  const resetForm = useCallback((newValues = {}, newErrors = {}, newIsValid  = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
  }, [setValues, setErrors, setIsValid]);

  return { values, handleChange, errors, isValid, resetForm, setValues, setErrors, setIsValid };
}
