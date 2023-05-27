import mongoose from 'mongoose';
import ENV from '../../config/env';
import Logger from './logger.provider';
import CustomError from '../custom/error.custom';

export default class MongoDBProvider {
  private constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Initiate the mongodb provider.
   *
   * @return {Promise<void>}
   */
  public static async initiate(): Promise<void> {
    try {
      await mongoose.connect(ENV.database.connection_url);
      Logger.info(`MongoDB provider initiated successfully: ${ENV.database.connection_url}`);
    } catch (err) {
      throw new CustomError({
        message: `MongoDB provider failed to be initiated: ${err}`,
        status: 500,
      });
    }
  }
}
