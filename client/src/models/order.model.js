import * as yup from 'yup';
import ToppieModel from './toppie.model';

export default class OrderModel {
  constructor(size, toppies) {
    this.size = size;
    this.toppies = toppies;
  }

  static validationSchema = yup.object().shape({
    size: yup.string().required('Size is required'),
    toppies: yup
      .array()
      .of(ToppieModel.validationSchema)
      .required('At least one Toppie is required'),
  });
}
