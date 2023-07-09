import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractDatabaseSchema } from './database.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { CreateIndexesOptions } from 'mongodb';

export abstract class AbstractDatabaseRepository<
  TDocument extends AbstractDatabaseSchema,
> {
  protected abstract readonly logger: Logger;
  protected constructor(protected readonly model: Model<TDocument>) {}

  async create(document: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as TDocument;
  }

  async findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument> {
    const document = await this.model.findOne(
      filterQuery,
      {},
      {
        lean: true,
      },
    );
    if (!document) {
      this.logger.warn(
        `Document not found with ${filterQuery}`,
        JSON.stringify(filterQuery),
      );
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    const document = await this.model.findOneAndUpdate(filterQuery, update, {
      new: true,
      lean: true,
    });
    if (!document) {
      this.logger.warn(
        `Document not found with ${filterQuery}`,
        JSON.stringify(filterQuery),
      );
      throw new NotFoundException('Document not found');
    }
    return document;
  }

  async find(filterQuery: FilterQuery<TDocument>) {
    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findOneAndDelete(filterQuery: FilterQuery<TDocument>) {
    return this.model.findOneAndDelete(filterQuery, { lean: true });
  }

  async createIndex(options: CreateIndexesOptions) {
    return this.model.createIndexes(options as any);
  }
}
