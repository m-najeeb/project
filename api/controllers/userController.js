const ResponseService = require("../../src/services/responseService");
const constants = require("../../src/utilities/constants");
const messages = require("../../src/utilities/messages");
const userValidation = require("../../src/validations/userValidations");
const userImplementation = require("../implementation/userImplementation");

class UserController {
  async signUp(req, res) {
    try {
      const data = req.body;
      const { error, value } = await userValidation.signUp(data);
      if (error) {
        ResponseService.status = constants.CODE.BAD_REQUEST;
        return res
          .status(ResponseService.status)
          .send(
            ResponseService.responseService(
              constants.STATUS.ERROR,
              error.details[0].message,
              messages.INVALID_DATA
            )
          );
      }
      const response = await userImplementation.signUp(value);
      res.status(ResponseService.status).send(response);
    } catch (error) {
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async signIn(req, res) {
    try {
      const data = req.body;
      const { error, value } = await userValidation.signIn(data);
      if (error) {
        ResponseService.status = constants.CODE.BAD_REQUEST;
        return res
          .status(ResponseService.status)
          .send(
            ResponseService.responseService(
              constants.STATUS.ERROR,
              error.details[0].message,
              messages.INVALID_DATA
            )
          );
      }
      const response = await userImplementation.signIn(value);
      res.status(ResponseService.status).send(response);
    } catch (error) {
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async verifyOTP(req, res) {
    try {
      const data = req.body;
      if (!data) {
        ResponseService.status = constants.CODE.BAD_REQUEST;
        return res
          .status(ResponseService.status)
          .send(
            ResponseService.responseService(
              constants.STATUS.ERROR,
              error.details[0].message,
              messages.INVALID_DATA
            )
          );
      }

      const email = data.email.toLowerCase();
      const otp = data.otp;

      const response = await userImplementation.verifyOTP(email, otp);
      res.status(ResponseService.status).send(response);
    } catch (error) {
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }

  async profileEdit(req, res) {
    try {
      const data = req.body;
      const { error, value } = await userValidation.profileEdit(data);
      if (error) {
        ResponseService.status = constants.CODE.BAD_REQUEST;
        return res
          .status(ResponseService.status)
          .send(
            ResponseService.responseService(
              constants.STATUS.ERROR,
              error.details[0].message,
              messages.INVALID_DATA
            )
          );
      }
      const response = await userImplementation.profileEdit(value);
      res.status(ResponseService.status).send(response);
    } catch (error) {
      ResponseService.status = constants.CODE.INTERNAL_SERVER_ERROR;
      return ResponseService.responseService(
        constants.STATUS.EXCEPTION,
        error.message,
        messages.EXCEPTION
      );
    }
  }
}

module.exports = new UserController();
