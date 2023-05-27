import Chance from 'chance';
import UserModel from '../models/user.model';

const chance = new Chance();

export default class ChanceProvider {
  constructor() {
    throw new Error({ message: 'Cannot create an instance of a static class' });
  }

  static createRandomUser() {
    return new UserModel({
      firstName: chance.first(),
      lastName: chance.last(),
      address: chance.street(),
      houseNumber: +chance.zip(),
      city: chance.city(),
      email: chance.email(),
      phone: chance.phone(),
      dateOfBirth: chance.birthday({ string: true }),
      isNewsLetter: chance.bool(),
      gender: chance.bool() ? 'F' : 'M',
      imageId: chance.integer({ min: 1, max: 50 }),
    });
  }
}
