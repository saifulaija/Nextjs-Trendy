import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { VariantServices } from './variant.service';


const createVariant = catchAsync(async (req, res) => {
  const result = await VariantServices.createVariant(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variant is created successfully',
    data: result,
  });
});
const getAllVariants = catchAsync(async (req, res) => {
  const result = await VariantServices.getAllVariants();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variants are fetched successfully',
    data: result,
  });
});
const updateVariant = catchAsync(async (req, res) => {
  const{id}=req.params
  
  const result = await VariantServices.updateVariant(id,req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Variants updated successfully',
    data: result,
  });
});


export const VariantControllers = {
  createVariant,
  getAllVariants,
  updateVariant


};
