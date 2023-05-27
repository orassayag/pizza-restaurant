import CONSTANTS from '../config/constants.config';
import CustomError from '../custom/error.custom';

export default class AppsUtils {
  private constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Check if PRODUCTION or QA by parameter.
   *
   * Check if the current environment is PRODUCTION or QA by parameter.
   * @param environment - The input parameter to check for the environment.
   * @return {boolean}
   */
  public static isProductionOrQA(environment: string | undefined): boolean {
    return (
      process.env.NODE_ENV === CONSTANTS.ENVIRONMENTS.PRODUCTION ||
      environment?.trim().toLowerCase() === CONSTANTS.ENVIRONMENTS.QA
    );
  }
}
