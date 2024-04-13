const { statusMap, generalSuccesMap, generalErrorMap } = require('../constants/internalMessageMaps');
const { userRegisterSchema } = require('../yup/userYupSchema');
const createNewUserRecord = require('../utils/createNewUserRecord');

const getUserFromDB = require('../utils/checkUserExistInDB');

const signupController = async (req, res) => {
  try {
    const { user } = req.body;
    const parsedUser = await userRegisterSchema.validate(user);

    const getUserWithEmail = await getUserFromDB('email', parsedUser.email);

    if (getUserWithEmail) {
      return res.status(400).json({
        status: statusMap.error,
        error: generalErrorMap['user/alreadyExists'],
      });
    }

    const getUserWithUsername = await getUserFromDB('user_name', parsedUser.user_name);

    if (getUserWithUsername) {
      return res.status(400).json({
        status: statusMap.error,
        error: generalErrorMap['user/enterUniqueUsername'],
      });
    }

    const signupUser = await createNewUserRecord(parsedUser);

    if (!signupUser) {
      return res.status(500).json({
        status: statusMap.error,
        error: generalErrorMap['server/internalError'],
      });
    }

    return res.status(200).json({
      status: statusMap.success,
      data: generalSuccesMap['user/signup'],
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        status: statusMap.error,
        error: err.errors[0],
      });
    }

    return res.status(500).json({
      status: statusMap.error,
      error: generalErrorMap['server/internalError'],
    });
  }
};

const signinController = async (req, res) => {
  // Get user input and validate it
  // Check if user exist
  // Check credentials
  // Check for total user sessions
  // If successful login, create new user session
};

const signoutController = () => {
  // Take a parameter to check to delete all user sessions or current one
  // Delete user session
};

module.exports = { signupController };
