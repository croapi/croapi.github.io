/**
 * Play Lottie animations on hover
 * @requires https://github.com/LottieFiles/lottie-player
 */

export default (() => {
  const playerContainers = document.querySelectorAll('.animation-on-hover')
  playerContainers.forEach((container) => {
    container.addEventListener('mouseover', () => {
      const players = container.querySelectorAll('lottie-player')
      players.forEach((player) => {
        player.setDirection(1)
        player.play()
      })
    })

    container.addEventListener('mouseleave', () => {
      const players = container.querySelectorAll('lottie-player')
      players.forEach((player) => {
        player.setDirection(-1)
        player.play()
      })
    })
  })
})()
