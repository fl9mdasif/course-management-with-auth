import httpStatus from 'http-status';
import { User } from '../user/mode.user';
import { TLoginUser } from './interface.auth';
import AppError from '../../errors/AppError';
import config from '../../config';
import { createToken } from './utils.auth';

const loginUser = async (payload: TLoginUser) => {
  //
  // 1. checking if the user is exist
  const user = await User.isUserExists(payload.username);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, `This user is not found !'`);
  }
  // console.log(user);

  //   2. checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(
      httpStatus.FORBIDDEN,
      `Password of '${user.role}' do not matched`,
    );
  // console.log(user);

  // 3. create token and sent to the client
  const jwtPayload = {
    username: user.username,
    email: user.email,
    role: user.role,
  };
  //   console.log(jwtPayload);

  // create token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // refresh token
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    data: { jwtPayload },
    accessToken,
    refreshToken,
  };
};

export const authServices = {
  loginUser,
};