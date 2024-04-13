const generalErrorMap = {
  'auth/unauthorized': 'You are not authenticated',
  'user/alreadyExists': 'User already exist. Please signin',
  'user/enterUniqueUsername': 'Username is already taken',
  'server/internalError': 'Internal server error. Please try again later.',
};

const generalSuccesMap = {
  'user/signup': 'User registered successfully',
};

const statusMap = {
  error: 'ERROR',
  success: 'SUCCESS',
};

const validationErrorMap = {
  emptyFieldErrors: {
    username: 'Username is required',
    email: 'Email is required',
    password: 'Password is required',
    firstName: 'First name is required',
    lastName: 'Last name is required',
  },
  lengthErrors: {
    username: 'Username must be between 5 and 256 characters',
    password: 'Password must be between 12 and 256 characters',
    firstName: 'First name must be at most 256 characters',
    lastName: 'Last name must be at most 256 characters',
  },
  formatErrors: {
    email: 'Please enter valid email',
    firstName: 'First name must contain only alphabetic characters',
    lastName: 'Last name must contain only alphabetic characters',
  },
};

module.exports = { generalErrorMap, generalSuccesMap, statusMap, validationErrorMap };
