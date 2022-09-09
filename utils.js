export const querySelect = (elem) => document.querySelector(elem);
export const querySelectAll = (elem) => document.querySelectorAll(elem);
export const createElem = (elem) => document.createElement(elem);
export const createError = (errorMessage, input) => {
  const span = createElem("span");
  span.textContent = errorMessage;
  span.classList.add("error-msg");
  input.parentElement.append(span);
  input.classList.add("error");
};
