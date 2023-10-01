import { Model } from "mongoose";

import { Category, CategoryModel } from "../entities";
import { Repository } from "../repository";

class CategoryRepository extends Repository<Category> {
  constructor(model: Model<Category>) {
    super(model);
  }
}

const categoryRepository = new CategoryRepository(CategoryModel);

export { CategoryRepository, categoryRepository };
