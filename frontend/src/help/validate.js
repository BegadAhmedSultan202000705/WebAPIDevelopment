export const emailValidator = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!emailRegex.test(email)) {
    return {
      isEmailValid: false,
      msg: "Please enter a valid email address",
    };
  }
  return {
    isEmailValid: true,
  };
};

export const fieldValidation = (fields) => {
  for (const field in fields) {
    const value = fields[field];

    if (!value) {
      return {
        isDataValid: false,
        field,
        msg: `Please provide a valid ${field}`,
      };
    }

    if (field === "email") {
      const { isEmailValid, msg } = emailValidator(value);
      if (!isEmailValid) {
        return {
          isDataValid: false,
          field,
          msg,
        };
      }
    }

    if (field === "password" && fields["confirmPassword"]) {
      if (value !== fields["confirmPassword"]) {
        return {
          isDataValid: false,
          field,
          msg: "Password and confirm password fields do not match",
        };
      }
    }
  }

  return {
    isDataValid: true,
  };
};

export const isEqualStrings = (strings) => {
  for (let i = 0; i < strings.length - 1; i++) {
    for (let j = i + 1; j < strings.length; j++) {
      if (strings[i].localeCompare(strings[j]) !== 0) {
        return false;
      }
    }
  }

  return true;
};
