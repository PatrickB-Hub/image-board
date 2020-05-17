import Validator from "validator";

interface ValidInput {
  email?: string | undefined,
  password?: string | undefined,
}

export default (
  data: {
    email: string,
    password: string
  }
) => {

  let errors: ValidInput = {};

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "The email is invalid.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "The password may only be between 6 and 30 characters long.";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  }
}