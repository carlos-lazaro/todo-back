import { PipelineStage, RootQuerySelector } from "mongoose";

import { PaginationDto, TodoDto } from "../dtos";
import { Todo } from "../entities";
import { TodoRepository, todoRepository } from "./todo-repository";

class TodoService {
  todoRepository: TodoRepository;

  constructor(repository: TodoRepository) {
    this.todoRepository = repository;
  }

  async getOne(filter: RootQuerySelector<Todo>) {
    const todo = await this.todoRepository.model
      .findOne(filter)
      .populate("categories")
      .exec();

    return todo;
  }

  async getAll(filter: RootQuerySelector<Todo>) {
    const todo = await this.todoRepository.model
      .find(filter)
      .populate("categories")
      .exec();

    return todo;
  }

  async getPage(
    filter: RootQuerySelector<Todo>,
    paginationDto: PaginationDto,
    extraPipeline: PipelineStage[] = [],
  ): Promise<{ count: number; items: Todo[] }> {
    const data = await todoRepository.getPage(
      filter,
      paginationDto,
      extraPipeline,
    );

    return data;
  }

  async getPageCountByTitle(
    filter: RootQuerySelector<Todo>,
    paginationDto: PaginationDto,
    extraPipeline: PipelineStage[] = [],
  ): Promise<{ count: number; items: Todo[] }> {
    const data = await this.todoRepository.getPageCountByTitle(
      filter,
      paginationDto,
      extraPipeline,
    );

    return data;
  }

  async create(todoDto: TodoDto) {
    const todo = await this.todoRepository.create(todoDto);

    return todo;
  }

  async update(filter: RootQuerySelector<Todo>, todoDto: TodoDto) {
    const todo = await this.todoRepository.update(filter, todoDto);

    return todo;
  }

  async delete(filter: RootQuerySelector<Todo>) {
    const deletedCount = await this.todoRepository.delete(filter);

    return deletedCount;
  }
}

const todoService = new TodoService(todoRepository);

export { todoService };
