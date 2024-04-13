const yup = require('yup');
const { validationErrorMap } = require('../constants/internalMessageMaps');

const userRegisterSchema = yup.object().shape({
  user_name: yup
    .string()
    .required(validationErrorMap.emptyFieldErrors.username)
    .min(5, validationErrorMap.lengthErrors.username)
    .max(256, validationErrorMap.lengthErrors.username)
    .lowercase(),
  email: yup
    .string()
    .required(validationErrorMap.emptyFieldErrors.email)
    .email(validationErrorMap.formatErrors.email)
    .lowercase(),
  password: yup
    .string()
    .required(validationErrorMap.emptyFieldErrors.password)
    .min(12, validationErrorMap.lengthErrors.password)
    .max(256, validationErrorMap.lengthErrors.password)
    .lowercase(),
  first_name: yup
    .string()
    .required(validationErrorMap.emptyFieldErrors.firstName)
    .max(256, validationErrorMap.lengthErrors.firstName)
    .matches(/^[a-zA-Z]+$/, validationErrorMap.formatErrors.firstName)
    .lowercase(),
  last_name: yup
    .string()
    .required(validationErrorMap.emptyFieldErrors.lastName)
    .max(256, validationErrorMap.lengthErrors.lastName)
    .matches(/^[a-zA-Z]+$/, validationErrorMap.formatErrors.lastName)
    .lowercase(),
});

module.exports = { userRegisterSchema };
