export class AppUtil {
  static getFormattedDate(date: any) {
    let dateObject = new Date(date);
    if (isNaN(dateObject.getDate())) {
      dateObject = new Date();
    }
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return (
      year +
      (month > 9 ? `-${month}` : `-0${month}`) +
      (day > 9 ? `-${day}` : `-0${day}`)
    );
  }

  static getExcelDateToJSDate(date: any) {
    return date
      ? this.getFormattedDate(
          new Date(
            typeof date == 'string' &&
            (date.includes('-') || date.includes('/'))
              ? date
              : Math.round((date - 25569) * 86400 * 1000)
          )
        )
      : '';
  }

  static uid() {
    const letters = 'abcdefghijklmnopqrstuvwxyz' + 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const allowedChars = '0123456789' + letters;
    const NUMBER_OF_CODEPOINTS = allowedChars.length;
    const CODESIZE = 11;
    let uid;
    uid = letters.charAt(Math.random() * letters.length);
    for (let i = 1; i < CODESIZE; ++i) {
      uid += allowedChars.charAt(Math.random() * NUMBER_OF_CODEPOINTS);
    }
    return uid;
  }

  static getHttpAuthorizationHeader(username: string, password: string) {
    return {
      'Content-Type': 'application/json',
      Authorization:
        'Basic ' + Buffer.from(`${username}:${password}`).toString('base64')
    };
  }
}
