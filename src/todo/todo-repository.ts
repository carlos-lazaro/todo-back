import { Model, PipelineStage, RootQuerySelector } from "mongoose";

import { PaginationDto } from "../dtos";
import { Todo, TodoModel } from "../entities";
import { Repository } from "../repository";

class TodoRepository extends Repository<Todo> {
  populationCategoryPipeline = {
    $lookup: {
      from: "categories", // The name of the Category collection
      localField: "categories", // Field in the 'Todo' model
      foreignField: "_id", // Field in the 'Category' model
      as: "categories", // Field name to store the populated data
    },
  };

  constructor(model: Model<Todo>) {
    super(model);
  }

  async getOne(filter: RootQuerySelector<Todo>) {
    const category = await this.model
      .findOne(filter)
      .populate("categories")
      .exec();

    return category;
  }

  async getPage(
    filter: RootQuerySelector<Todo>,
    paginationDto: PaginationDto,
    extraPipeline: PipelineStage[] = [],
  ): Promise<{ count: number; items: Todo[] }> {
    const [data] = await this.getByPipeline([
      {
        $match: filter,
      },
      this.populationCategoryPipeline,
      ...extraPipeline,
      ...paginationDto.mongoosePipeline(),
    ]);

    return data;
  }

  async getPageCountByTitle(
    filter: RootQuerySelector<Todo>,
    paginationDto: PaginationDto,
    extraPipeline: PipelineStage[] = [],
  ): Promise<{ count: number; items: Todo[] }> {
    const [data] = await this.getByPipeline([
      {
        $match: filter,
      },
      {
        $group: {
          _id: "$title",
          count: { $sum: 1 },
          title: { $first: "$title" },
        },
      },
      {
        $sort: { count: -1 },
      },
      ...extraPipeline,
      ...paginationDto.mongoosePipeline(),
    ]);

    return data;
  }
}

const todoRepository = new TodoRepository(TodoModel);

export { TodoRepository, todoRepository };
