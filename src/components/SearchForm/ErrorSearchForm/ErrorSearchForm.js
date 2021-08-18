import "./ErrorSearchForm.css";

function ErrorSearchForm({isEmptyQuery}) {
  return (
    <span className={`error-search-form ${isEmptyQuery ? "error-search-form_active" : "" }`}>Нужно ввести ключевое слово</span>
  )
}

export default ErrorSearchForm;
