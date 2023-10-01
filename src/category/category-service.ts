import { RootQuerySelector } from "mongoose";

import { CategoryDto } from "../dtos";
import { Category } from "../entities";
import { CategoryRepository, categoryRepository } from "./category-repository";

class CategoryService {
  categoryRepository: CategoryRepository;

  constructor(repository: CategoryRepository) {
    this.categoryRepository = repository;
  }

  async getOne(filter: RootQuerySelector<Category>) {
    const category = await this.categoryRepository.getOne(filter);

    return category;
  }

  async getAll(filter: RootQuerySelector<Category>) {
    const category = await this.categoryRepository.getAll(filter);

    return category;
  }

  async create(categoryDto: CategoryDto) {
    const category = await this.categoryRepository.create(categoryDto);

    return category;
  }

  async update(filter: RootQuerySelector<Category>, categoryDto: CategoryDto) {
    const category = await this.categoryRepository.update(filter, categoryDto);

    return category;
  }

  async delete(filter: RootQuerySelector<Category>) {
    const deletedCount = await this.categoryRepository.delete(filter);

    return deletedCount;
  }
}

const categoryService = new CategoryService(categoryRepository);

export { categoryService };
