import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import httpStatus from 'http-status';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../errors/AppError';
import { User } from '../modules/user/mode.user';
import { TUserRole } from '../modules/user/interface.user';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, username, iat } = decoded;

    // checking if the user is exist
    const user = await User.isUserExists(username);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    // check if password update time
    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        `'${role}' is are not authorized`,
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
