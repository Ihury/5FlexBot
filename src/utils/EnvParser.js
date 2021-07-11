const { readFileSync } = require('fs')

class EnvParser {
  constructor(envPath='.env') {
    this.envPath = envPath
  }


  parseEnv() {
    const content = readFileSync(this.envPath, { encoding: 'utf8' })

    return Object.fromEntries(content
      .replace(/\r/g, '')
      .split('\n')
      .map(line => {
        let [key,value] = line.split('=')

        if (/\[.+\]/.test(value))
          value = JSON.parse(value).map(v => ''+v)

        return [ key, value ]
      })
    )
  }
}

module.exports = EnvParser
