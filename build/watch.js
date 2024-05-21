const path = require('./config')
const browserSync = require('browser-sync').create()
const { spawn } = require('child_process')

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm'

browserSync.init({
  server: {
    baseDir: './',
  },
  open: true,
})

browserSync.watch(['./*.html', './**/*.html']).on('change', () => {
  browserSync.reload()
})

browserSync.watch(`${path.scss}/**/*.scss`).on('change', () => {
  const stylesProcess = spawn(npmCmd, ['run', 'styles:minified'], {
    stdio: 'inherit',
  })

  stylesProcess.on('close', () => {
    browserSync.reload('*.css')
  })
})

browserSync.watch(`${path.src_js}/**/*.js`).on('change', () => {
  const scriptsProcess = spawn(npmCmd, ['run', 'scripts:minified'], {
    stdio: 'inherit',
  })

  scriptsProcess.on('close', () => {
    browserSync.reload()
  })
})
