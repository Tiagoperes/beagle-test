const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

function getUrlToSchema(fileContent) {
  const schemaUrl = fileContent.match(/schemaUrl:\s*['"]([^'"]+)['"]/)
  const baseUrl = fileContent.match(/baseUrl:\s*['"]([^'"]+)['"]/)
  const url = (schemaUrl && schemaUrl[1]) || (baseUrl && baseUrl[1] && `${baseUrl[1]}/schema.ts`)
  return url
}

async function loadContentsFromUrl(url) {
  const response = await fetch(url)
  return response.text()
}

function writeSchemaToFile(configPath, schema, url) {
  const schemaPath = `${path.dirname(configPath)}/schema.ts`
  fs.writeFileSync(schemaPath, schema)
  console.info(`Updated file "${schemaPath}" with schema at "${url}"`)
}

async function processConfigurationFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, { encoding: 'utf8' })
    const url = getUrlToSchema(content)
    if (!url) throw new Error(`Error: can\'t find schemaUrl or baseUrl in ${filePath}`)
    const schema = await loadContentsFromUrl(url)
    writeSchemaToFile(filePath, schema, url)
  } catch (error) {
    console.error(error)
  }
}

function start() {
  const configFilesValue = process.env.CONFIG_FILES
  if (!configFilesValue) {
    console.error('Error while updating server driven ui schemas: no configuration files have been provided. Example of call: CONFIG_FILES=./src/sdui/config.ts yarn update-sdui-schema.')
    return
  }
  const files = configFilesValue.split(' ')
  files.forEach(processConfigurationFile)
}

start()
