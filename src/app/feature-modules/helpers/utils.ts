export default class Utils {
  static async sleep(ms: number = 60): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), ms);
    });
  }
}
