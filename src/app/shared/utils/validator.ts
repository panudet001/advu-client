import { FormControl } from "@angular/forms";

/* eslint-disable */

export function emailValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }
  const expr =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const result = expr.test(value);
  if (!result) {
    return {
      emailInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function mobileNumberTenDigitsValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }

  // const expr = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  const expr = /^[\d]{9}$/;
  const result = expr.test(value);
  if (!result) {
    return {
      mobileInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function charAndDashesValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }

  // Validates if the input contains only letters, dashes, and Thai characters.
  const expr = /^[a-zA-Zก-๙\-]+$/;
  const result = expr.test(value);
  if (!result) {
    return {
      mobileInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function nameThValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }
  const expr = new RegExp(
    /^[(-) \u0E00-\u0E7F]+(([\u0E00-\u0E7F ])?[\u0E00-\u0E7F]*)*$/
  );
  const result = expr.test(value);
  if (!result) {
    return {
      nameThInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function nameEnValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }

  const expr = new RegExp(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/);
  const result = expr.test(value);
  if (!result) {
    return {
      nameEnInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function uniqueIdNoValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }

  const expr = new RegExp(/^[0-9]{13}$/);
  const result = expr.test(value);
  if (!result) {
    return {
      uniqueIdNoInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function passportNoValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }

  const expr = new RegExp(/^[A-Z0-9]*$/);
  const result = expr.test(value);
  if (!result) {
    return {
      passNoInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function numberValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }

  const expr = /^[\d]*$/;
  const result = expr.test(value);
  if (!result) {
    return {
      numberInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function whiteSpaceValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }

  const expr = new RegExp(/^\s*$/);
  const result = expr.test(value);
  if (result) {
    return {
      whiteSpaceInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function positiveIntegerValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }

  const expr = /^[1-9][0-9]*$/;
  const result = expr.test(value);
  if (!result) {
    return {
      positiveIntegerInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function positiveDecimalValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }

  const expr = new RegExp(/^[1-9][0-9]*\.?\d*$/);
  const result = expr.test(value);
  if (!result) {
    return {
      positiveDecimalInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function integerThan0Validator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }

  const expr = new RegExp(/^[0-9]*$/g);
  const result = expr.test(value);
  if (!result) {
    return {
      integerThan0Invalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function nameThWithNumberValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }
  const expr = new RegExp(
    /^[(-) \u0E00-\u0E7F\d]+(([\u0E00-\u0E7F\d ])?[\u0E00-\u0E7F\d]*)*$/
  );
  const result = expr.test(value);
  if (!result) {
    return {
      nameThWithNumberInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function nameEnWithNumberValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }

  const expr = new RegExp(/^[a-zA-Z\d]+(([',. -][a-zA-Z\d ])?[a-zA-Z\d]*)*$/);
  const result = expr.test(value);
  if (!result) {
    return {
      nameEnWithNumberInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function numberWithBackSlashAndDashValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }

  const expr = RegExp(/^(([0-9\d][/][0-9\d])?[0-9\d]*)*$/);
  const result = expr.test(value);
  if (!result) {
    return {
      numberWithBackSlashAndDashInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function nameThWithNumberAndBackSlashAndDashValidator(
  control: FormControl
) {
  const value = control.value;
  if (!value) {
    return null;
  }
  const expr = new RegExp(
    /^[(-) \u0E00-\u0E7F\d\-\/]+(([\u0E00-\u0E7F\d\-\/ ])?[\u0E00-\u0E7F\d\-\/]*)*$/
  );
  const result = expr.test(value);
  if (!result) {
    return {
      nameThWithNumberAndBackSlashInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function nameThWithNumberAndDotAndDashValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }
  const expr = new RegExp(
    /^[(-) \u0E00-\u0E7F\d\.\-]+(([\u0E00-\u0E7F\d\.\- ])?[\u0E00-\u0E7F\d\.\-]*)*$/
  );
  const result = expr.test(value);
  if (!result) {
    return {
      nameThWithNumberAndDotAndDashInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function nameEnWithNumberAndDotAndDashValidator(control: FormControl) {
  const value = control.value;
  if (!value) {
    return null;
  }

  const expr = new RegExp(
    /^[a-zA-Z\d\.\-]+(([',. -][a-zA-Z\d\.\- ])?[a-zA-Z\d\.\-]*)*$/
  );
  const result = expr.test(value);
  if (!result) {
    return {
      nameEnWithNumberAndDotAndDashInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function passwordWithUpperLower8CharAndSpecialValidator(
  control: FormControl
) {
  const value = control.value;
  if (!value) {
    return null;
  }

  const expr = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
  );
  const result = expr.test(value);
  if (!result) {
    return {
      passwordWithUpperLower8CharAndSpecialInvalid: {
        inputName: value,
      },
    };
  }
  return null;
}

export function validateDateOverCurrentDate(control: FormControl) {
  const selectedDate = new Date(control.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (selectedDate > today) {
    return { validateDateOverCurrentDate: true };
  }
  return null;
}

/* eslint-enable */
