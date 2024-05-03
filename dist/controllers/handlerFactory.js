import catchAsync from '../utils/catchAsync.js';
import AppError from '../utils/appError.js';
export const deleteAll = (Model) => catchAsync(async (req, res) => {
    await Model.truncate();
    res.status(204).json({
        status: 'success',
        data: null,
    });
});
export const deleteOne = (Model) => catchAsync(async (req, res, next) => {
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
});
export const updateOne = (Model) => catchAsync(async (req, res, next) => {
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
export const createOne = (Model) => catchAsync(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(200).json({
        status: 'success',
        data: {
            data: newDoc,
        },
    });
});
export const getOne = (Model) => catchAsync(async (req, res, next) => {
    const doc = await Model.findByPk(req.params.id);
    if (!doc) {
        return next(new AppError('No document found with that id', 404));
    }
    res.status(200).json({
        status: 'success',
        data: doc,
    });
});
