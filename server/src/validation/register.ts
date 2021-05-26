import Validator from "validator";

interface ValidInput {
  email?: string,
  username?: string,
  password?: string,
  confirmPassword?: string
}

export default (
  data: {
    email: string,
    username: string,
    password: string,
    confirmPassword: string
  }
) => {

  let errors: ValidInput = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "The email is invalid.";
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username is required.";
  }

  if (!Validator.isLength(data.username, { min: 3, max: 16 })) {
    errors.username = "The username may only be between 3 and 16 characters long.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "The password may only be between 6 and 30 characters long.";
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "Please confirm the password.";
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "The passwords must match.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}