import React from 'react';

export default function useErrorPopup() {

  const [isError, setError] = React.useState({
    errorText: "",
    isActive: false,
  });

  async function handleShowError(err) {
    const newErr = await err;
    setErrorPopupFields(newErr.message, true);
    setTimeout(() => setErrorPopupFields(newErr.message, false), 3000);
  }

  function setErrorPopupFields(message, active) {
    setError({ errorText: message, isActive: active });
  }

  return {
    isError,
    handleShowError
  }
}