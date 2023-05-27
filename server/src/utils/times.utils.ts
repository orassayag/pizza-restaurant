import CustomError from '../custom/error.custom';

export default class TimesUtils {
  private constructor() {
    throw new CustomError({ message: 'Cannot create an instance of a static class' });
  }

  /**
   * Get process time.
   *
   * This function gets an record object, calculate it's process time, and return it in
   * a string representation for the client.
   * @param record - The record to calculate the process time.
   * @return {object}
   */
  public static getProcessTime(record: any): String {
    // Calculate processing time in seconds.
    const processingTimeSeconds = Math.floor(
      (record.updatedAt.getTime() - record.createdAt.getTime()) / 1000
    );
    // Convert processing time to MM:ss format.
    const minutes = Math.floor(processingTimeSeconds / 60);
    const seconds = processingTimeSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Delay.
   *
   * This function gets a seconds number and performs a delay. This function simulates the work process
   * of each of the workers.
   * @param seconds - The number of seconds to perform a delay.
   * @return {Promise<void>}
   */
  public static delay(seconds: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
}
