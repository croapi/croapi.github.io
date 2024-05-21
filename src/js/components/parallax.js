/**
 * Mouse move parallax effect
 * @requires https://github.com/wagerfield/parallax
 */

export default (() => {
  const element = document.querySelectorAll('.parallax')

  for (let i = 0; i < element.length; i++) {
    /* eslint-disable no-unused-vars, no-undef */
    const parallaxInstance = new Parallax(element[i])
    /* eslint-enable no-unused-vars, no-undef */
  }
})()
