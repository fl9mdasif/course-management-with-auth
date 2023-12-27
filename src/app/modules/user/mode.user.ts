import { Schema, model } from 'mongoose';
import { TUser, UserModel } from './interface.user';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser, UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 12,
      // select: 0,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
    },

    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

// hash the password
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const student = this;

  // Store hash in your password DB.

  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// compare bcrypt password for auth
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// Exclude password field when converting to JSON
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
  },
});

// for auth
// find user exists
userSchema.statics.isUserExists = async function (name: string) {
  return await User.findOne({ username: name }).select('+password');
};

// jwt password time checking
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  // console.log(passwordChangedTimestamp, jwtIssuedTimestamp);
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
