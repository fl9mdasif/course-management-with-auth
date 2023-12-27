import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { response } from '../../utils/sendResponse';
import { authServices } from './service.auth';
import config from '../../config';

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);

  // console.log(req.body);

  const { data, accessToken, refreshToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  response.createSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User login successfully!',
    data: {
      user: data.jwtPayload,
      token: accessToken,
    },
  });
});

export const authControllers = {
  loginUser,
};
