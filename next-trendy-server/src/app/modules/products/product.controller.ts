import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product is created successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'products are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getAllProductsForVariant = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductsFromDBForVariant(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'products are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ProductServices.getSingleProductFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product  is retrieved successfully',
    data: result,
  });
});
const getAllProductsByCategory = catchAsync(async (req, res) => {
  const category = req.params.category;
  console.log(category);

  const result = await ProductServices.getAllProductsByCategoryFromDB(category);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'category product  is retrieved successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product is deleted successfully',
    data: result,
  });
});
const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.updateProduct(id,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'product updated successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  getAllProductsByCategory,
  deleteProduct,
  getAllProductsForVariant,
  updateProduct
};
