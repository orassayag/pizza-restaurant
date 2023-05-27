import SEGMENTATION from '../bl/enums/segmentation.enum';

export default class LocalToppieModel {
  public name: String;
  public segmentation: SEGMENTATION;

  constructor(toppie: any) {
    this.name = toppie.name;
    this.segmentation = toppie.segmentation;
  }
}
