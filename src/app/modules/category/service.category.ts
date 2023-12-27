import { TCategory } from './interface.category';
import { Category } from './model.category';

const createCategory = async (payload: TCategory) => {
  const result = await Category.create(payload);
  return result;
};

// get all category
const getAllCategory = async () => {
  const result = await Category.find();
  return result;
};

export const categoryServices = {
  createCategory,
  getAllCategory,
};
