import * as yup from 'yup';

export default class ToppieModel {
  constructor(name, segmentation) {
    this.name = name;
    this.segmentation = segmentation;
  }

  static validationSchema = yup.object().shape({
    name: yup.string().required('Toppie name is required'),
    segmentation: yup.string().required('Toppie segmentation is required'),
  });
}
