module.exports = function (env) {
  env.addFilter('toLocaleString', function(input, locale = 'es-CL') {
    number = parseFloat(input);

    return (isNaN(number) || !(typeof Intl == 'object' && Intl && typeof Intl.NumberFormat == 'function'))
      ? input
      : number.toLocaleString(locale);
  });
}
