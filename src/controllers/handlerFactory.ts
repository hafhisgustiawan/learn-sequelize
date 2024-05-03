import { Model, ModelCtor } from 'sequelize';
import catchAsync from '../utils/catchAsync.js';
import { NextFunction, Request, Response } from 'express';
import AppError from '../utils/appError.js';

export const deleteAll = (Model: ModelCtor<Model<any, any>>) =>
  catchAsync(async (req: Request, res: Response) => {
    await Model.truncate();

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

export const deleteOne = (Model: ModelCtor<Model<any, any>>) =>
  catchAsync(
    async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
      const doc = await Model.findByPk(req.params.id);

      if (!doc) {
        return next(new AppError('No document found with that id', 404));
      }

      await Model.destroy({
        where: {
          id: req.params.id,
        },
      });

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );

export const updateOne = (Model: ModelCtor<Model<any, any>>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByPk(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }

    const newDoc = await doc.update(req.body);

    res.status(200).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
  });

export const createOne = (Model: ModelCtor<Model<any, any>>) =>
  catchAsync(async (req: Request, res: Response) => {
    const newDoc = await Model.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        data: newDoc,
      },
    });
  });

export const getOne = (Model: ModelCtor<Model<any, any>>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByPk(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }
    // TODO: POPULATE LIKE MONGO

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

//TODO: GET ALL NEEDED
