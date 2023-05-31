export default class NumberFormatter {

  static format(number) {
    const abbreviations = ['', 'K', 'M', 'B', 'T'];

    let index = 0;

    while (number >= 1000) {
      number /= 1000;
      index++;
    }

    return number.toFixed(2) + abbreviations[index];
  }
  
}