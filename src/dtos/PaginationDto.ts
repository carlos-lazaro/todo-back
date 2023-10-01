import Joi from "joi";

export class PaginationDto {
  readonly page;
  readonly limit;

  constructor(dependencies?: { page?: number; limit?: number }) {
    this.page = dependencies?.page ?? 1;
    this.limit = dependencies?.limit ?? 10;
  }

  mongoosePipeline() {
    return [
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          items: {
            $push: "$$ROOT",
          },
        },
      },
      {
        $project: {
          _id: 0,
          count: 1,
          page: this.page,
          items: {
            $slice: ["$items", this.itemsToSkip(), this.limit],
          },
        },
      },
    ];
  }

  itemsToSkip() {
    return Math.max(this.page - 1, 0) * this.limit;
  }

  public static Schema() {
    return Joi.object({
      page: Joi.number().integer().min(1).optional(),
      limit: Joi.number().integer().min(1).optional(),
    }).and("page", "limit");
  }
}
