import Chance from 'chance';
import WORKER from '../bl/enums/worker.enum';

const chance = new Chance();

export default class LocalWorkerModel {
  public type: WORKER;
  public name: String = '';
  public orderId: string = '';
  constructor(type: WORKER) {
    this.type = type;
    this.name = chance.first();
  }
}
