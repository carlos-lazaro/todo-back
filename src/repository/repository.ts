import {
  AnyKeys,
  Document,
  Model,
  PipelineStage,
  RootQuerySelector,
  UpdateQuery,
} from "mongoose";

import { PaginationDto } from "../dtos";

class Repository<T extends Document> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async getOne(filter: RootQuerySelector<T>) {
    const category = await this.model.findOne(filter).exec();

    return category;
  }

  async getAll(filter: RootQuerySelector<T>) {
    const category = await this.model.find(filter).exec();

    return category;
  }

  async getByPipeline(pipeline: PipelineStage[]) {
    const data = await this.model.aggregate(pipeline).exec();

    return data;
  }

  async getPage(
    filter: RootQuerySelector<T>,
    paginationDto: PaginationDto,
    extraPipeline: PipelineStage[] = [],
  ): Promise<{ count: number; items: T[] }> {
    const [data] = await this.getByPipeline([
      {
        $match: filter,
      },
      ...extraPipeline,
      ...paginationDto.mongoosePipeline(),
    ]);

    return data;
  }

  async create(dto: AnyKeys<T>) {
    const category = await this.model.create(dto);

    return category;
  }

  async update(filter: RootQuerySelector<T>, dto: UpdateQuery<T>) {
    const data = await this.model.findOneAndUpdate(filter, dto).exec();

    return data;
  }

  async delete(filter: RootQuerySelector<T>) {
    const { deletedCount } = await this.model.deleteOne(filter).exec();

    return deletedCount;
  }
}

export { Repository };
