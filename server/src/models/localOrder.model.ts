import SIZE from '../bl/enums/size.enum';
import LocalToppieModel from './localToppie.model';

export default class LocalOrderModel {
  public size: SIZE;
  public toppies: LocalToppieModel[];

  constructor(order: any) {
    this.size = order.size;
    this.toppies = order.toppies.map((toppie: any) => new LocalToppieModel(toppie));
  }
}
