const { HtmlValidate } = require('html-validate')
const fs = require('fs')
const path = require('./config.js')
const configureLogger = require('./logger.js')

const log = configureLogger('Validator')

const validateHtmlFile = (file) => {
  return new Promise((resolve) => {
    fs.readFile(file, 'utf8', (readErr, data) => {
      if (readErr) {
        log.error('', `Error reading ${file}: ${readErr.message}`)
        resolve(false)
        return
      }

      const report = htmlvalidate.validateStringSync(data)

      if (!report.valid) {
        log.error(file, 'Validation failed')
        report.results.forEach((result) => {
          result.messages.forEach((message) => {
            log.warn(
              `  ${message.message} (line ${message.line}, col ${message.column})`
            )
          })
        })
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}

// Load the configuration file
const configFile = fs.readFileSync('./.htmlvalidate.json', 'utf8')
const config = JSON.parse(configFile)
const htmlvalidate = new HtmlValidate(config)

const processValidation = async () => {
  const validationPromises = []

  for (const dir of path.html) {
    try {
      const stats = await fs.promises.stat(dir)

      if (!stats.isDirectory()) {
        // Skip non-existing or non-directory paths
        continue
      }

      const files = await fs.promises.readdir(dir)

      if (!files.length) {
        // Skip empty directories
        continue
      }

      const htmlFiles = files.filter((file) => file.endsWith('.html'))

      if (!htmlFiles.length) {
        log.info('', `No HTML files found in the ${dir} directory.`)
        continue
      }

      htmlFiles.forEach((file) => {
        validationPromises.push(validateHtmlFile(`${dir}/${file}`))
      })
    } catch (err) {
      log.error('', `Error processing directory ${dir}: ${err.message}`)
    }
  }

  const results = await Promise.all(validationPromises)

  if (results.every((result) => result)) {
    log.success('', 'All HTML files validated successfully')
  }
}

processValidation()
