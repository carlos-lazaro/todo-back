import { CategoryDto, PaginationDto } from "../dtos";
import { CategoryModel, CategoryModelType } from "../entities";

class CategoryService {
  model: CategoryModelType;

  constructor(model: CategoryModelType) {
    this.model = model;
  }

  async getById(id: string) {
    const category = await this.model.findOne({ _id: id });

    return category;
  }

  async getAll(id: string, paginationDto: PaginationDto) {
    const categorys = await this.model
      .find({})
      .skip((paginationDto.page - 1) * paginationDto.limit)
      .limit(paginationDto.limit)
      .exec();

    return categorys;
  }

  async create(categoryDto: CategoryDto) {
    const category = await this.model.create(categoryDto);

    return category;
  }

  async update(id: string, categoryDto: CategoryDto) {
    const category = await this.model.findOneAndUpdate(
      { _id: id },
      categoryDto,
    );

    return category;
  }

  async delete(id: string) {
    const { deletedCount } = await this.model.deleteOne({ _id: id });

    return deletedCount;
  }
}

const categoryService = new CategoryService(CategoryModel);

export { categoryService };
