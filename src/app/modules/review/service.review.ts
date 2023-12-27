import { TReview } from './interface.review';
import { Review } from './model.review';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createReview = async (payload: TReview) => {
  const result = Review.create(payload);
  return result;
};

export const reviewService = {
  createReview,
};
