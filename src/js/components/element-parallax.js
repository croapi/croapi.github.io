/**
 * Element parallax effect
 * @requires https://github.com/dixonandmoe/rellax
 */

export default (() => {
  const el = document.querySelector('.rellax')

  if (el === null) return

  /* eslint-disable no-unused-vars, no-undef */
  const rellax = new Rellax('.rellax', {
    horizontal: true,
  })
  /* eslint-enable no-unused-vars, no-undef */
})()
