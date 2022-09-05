import { querySelect, querySelectAll, createElem } from "./utils.js";

const cvc = querySelectAll(".security-number");
const cardNum = querySelectAll(".card-number");
const cardName = querySelectAll(".card-name");
const expMonth = querySelectAll(".exp-month");
const expYear = querySelectAll(".exp-year");

const nameInput = querySelect("#user-name");
const cardNumInput = querySelect("#user-card-number");
const expMonthInput = querySelect("#exp-date-month");
const expYearInput = querySelect("#exp-date-year");
const cvcInput = querySelect("#cvc");

const submitFormBtn = querySelect(".submit-form");
const form = querySelect("form");
const thankYouState = querySelect(".thank-you-state");
const continueBtn = querySelect("#continue-btn");

//Changes the informations on the card.
const cardInfoChange = (input, changingElem) => {
  changingElem.forEach((elem) => {
    elem.innerText = input.value.toUpperCase();
  });
};

//Limits the characters in the input.
const charLimiter = (input, quantity) => {
  if (input.value.length >= quantity) {
    input.value = input.value.slice(0, quantity);
  }
};

//Limits date inputs so the user cannot provide more than requested number in input field.
const dateLimit = (input, quantity) => {
  if (input.value > quantity) {
    input.value = "";
  }
};

//Provide the input data to the card.
const cardNumChange = () => {
  cardNum.forEach((elem) => {
    if (elem.innerText === "0000 0000 0000 0000") {
      elem.innerText = "";
    }

    elem.innerText = ` ${cardNumInput.value.slice(
      0,
      4
    )} ${cardNumInput.value.slice(4, 8)} ${cardNumInput.value.slice(
      8,
      12
    )} ${cardNumInput.value.slice(12, 16)} `;
  });
};

const cardNumCheck = (event) => {
  let key = window.event ? event.which : event.keyCode;
  if (key < 48 || key > 57) {
    const span = createElem("span");
    span.textContent = "Wrong format, numbers only";
    span.classList.add("error-msg");
    cardNumInput.parentElement.append(span);
    cardNumInput.classList.add("error");
    return false;
  }
  return true;
};

const cvcCheck = () => {
  if (cvcInput.value !== "") {
    if (cvcInput.value.length < 3) {
      const span = createElem("span");
      span.textContent = "CVC code is too short";
      span.classList.add("error-msg");
      cvcInput.parentElement.append(span);
      cvcInput.classList.add("error");
      return false;
    }
    return true;
  } else {
    if (cvcInput.value === "") {
      const span = createElem("span");
      span.textContent = "Can't be blank";
      span.classList.add("error-msg");
      cvcInput.parentElement.append(span);
      cvcInput.classList.add("error");
    }
    return false;
  }
};

const dateCheck = () => {
  if (expYearInput.value !== "" && expMonthInput.value !== "") {
    return true;
  } else {
    if (expYearInput.value === "" || expMonthInput.value === "") {
      const span = createElem("span");
      span.textContent = "Can't be blank";
      span.classList.add("error-msg");
      expYearInput.parentElement.parentElement.append(span);
      console.log(span);

      if (expYearInput.value === "" && expMonthInput.value === "") {
        expYearInput.classList.add("error");
        expMonthInput.classList.add("error");
      }
      if (expYearInput.value === "") {
        expYearInput.classList.add("error");
      }
      if (expMonthInput.value === "") {
        expMonthInput.classList.add("error");
      }
    }
    return false;
  }
};

//Changes name of the user on the card.
nameInput.addEventListener("keyup", (event) => {
  event.preventDefault();
  cardInfoChange(nameInput, cardName);
  if (!nameInput.value) {
    cardName.forEach((element) => {
      element.innerText = "JANE APPLESEED";
    });
  }
});

//Makes a default state if user input becomes empty again and activates cardNumChange fn.
cardNumInput.addEventListener("keyup", (event) => {
  event.preventDefault();
  cardNumChange();
  charLimiter(cardNumInput, 16);
  if (!cardNumInput.value) {
    cardNum.forEach((elem) => {
      elem.innerText = "0000 0000 0000 0000";
    });
  }
});

//Throws out error on CardNumInput.
cardNumInput.addEventListener("keypress", cardNumCheck, false);

//Removes error state for input.
cardNumInput.addEventListener("focus", () => {
  const errMsg = cardNumInput.parentElement.querySelector(".error-msg");
  cardNumInput.classList.remove("error");
  errMsg?.remove();
});

//Provide the input data to the card.
expMonthInput.addEventListener("keyup", (event) => {
  event.preventDefault();
  dateLimit(expMonthInput, 12);
  charLimiter(expMonthInput, 2);
  cardInfoChange(expMonthInput, expMonth);
  if (!expMonthInput.value) {
    expMonth.forEach((element) => {
      element.innerText = "00";
    });
  }
});

//Makes the date on a card whole if needed.
expMonthInput.addEventListener("focusout", () => {
  if (expMonthInput.value.length === 1) {
    expMonth.forEach((elem) => (elem.textContent = `0${expMonthInput.value}`));
  }
});

//Removes error state for input.
expMonthInput.addEventListener("focus", () => {
  const errMsg =
    expMonthInput.parentElement.parentElement.querySelector(".error-msg");
  expMonthInput.classList.remove("error");
  errMsg?.remove();
});

//Provide the input data to the card.
expYearInput.addEventListener("keyup", (event) => {
  event.preventDefault();
  dateLimit(expYearInput, 99);
  charLimiter(expYearInput, 2);
  cardInfoChange(expYearInput, expYear);
  if (!expYearInput.value) {
    expYear.forEach((element) => {
      element.innerText = "00";
    });
  }
});

//Makes the date on a card whole if needed.
expYearInput.addEventListener("focusout", () => {
  if (expYearInput.value.length === 1) {
    expYear.forEach((elem) => (elem.textContent = `0${expYearInput.value}`));
  }
});

//Removes error state for input.
expYearInput.addEventListener("focus", () => {
  const errMsg =
    expYearInput.parentElement.parentElement.querySelector(".error-msg");
  expYearInput.classList.remove("error");
  errMsg?.remove();
});

//Provide the input data to the card.
cvcInput.addEventListener("keyup", (event) => {
  event.preventDefault();
  charLimiter(cvcInput, 3);
  cardInfoChange(cvcInput, cvc);
  if (!cvcInput.value) {
    cvc.forEach((element) => {
      element.innerText = "000";
    });
  }
});

//Removes error state for input.
cvcInput.addEventListener("focus", () => {
  const errMsg = cvcInput.parentElement.querySelector(".error-msg");
  cvcInput.classList.remove("error");
  errMsg?.remove();
});

//Checks the date and CVC on confirm click.
submitFormBtn.addEventListener("click", () => {
  if (!dateCheck() && !cvcCheck()) {
    return;
  } else if (!dateCheck() || !cvcCheck()) {
    const excessMsg = querySelect(".exp-date .error-msg");
    excessMsg?.remove();
    return;
  }
  form.style.display = "none";
  thankYouState.style.display = "flex";
});

//Refreshes the site and comes back to the blank form.
continueBtn.addEventListener("click", () => {
  window.location.reload();
});
