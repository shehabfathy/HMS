export const USERNAME_VALIDATION = {
  required: "User name is required",
  pattern: {
    value: /^[A-Za-z0-9]{7,8}$/,
    message: "Must include letters and digits, max 8 characters",
  },
};

export const Email_validation = {
  required: "email is required",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Invalid email address",
  },
};

export const PASSWORD_VALIDATION = {
  required: "Password is required",
  pattern: {
    value:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-{}[\]:;"\\|,.<>/?]).{6,}$/,
    message:
      "Password must contain at least 6 characters, including uppercase, lowercase, number, and special character",
  },
};

export const COUNTRY_VALIDATION = {
  required: "Country is required",
  pattern: {
    value: /^[A-Za-z ]{2,50}$/,
    message: "Please enter a valid country name (letters only).",
  },
};

export const PHONENUMBER_VALIDATION = {
  required: "Phone number is required",
  pattern: {
    value: /^01[1205][0-9]{8}$/,
    message: "Please enter a valid phone number.",
  },
};
