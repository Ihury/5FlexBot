class Logger {
  static colors() {
    return {
      // Reset
      r: '\x1b[0m',

      // Effects
      e: {
        bright: '\x1b[1m',
        dim: '\x1b[2m',
        underscore: '\x1b[4m',
        blink: '\x1b[5m',
        reverse: '\x1b[7m',
        hidden: '\x1b[8m'
      },
      
      // Text
      t: {
        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m'
      },
      
      // Background
      b: {
        black: '\x1b[40m',
        red: '\x1b[41m',
        green: '\x1b[42m',
        yellow: '\x1b[43m',
        blue: '\x1b[44m',
        magenta: '\x1b[45m',
        cyan: '\x1b[46m',
        white: '\x1b[47m'
      }
    }
  }

  /**
   * @param {object} tag { color: string, msg: string }
   * @param {object} message { color: string, msg: string }
   */
  static log(tag, message) {
    const { color: tColor, msg: tMsg } = tag
    const { color: mColor, msg: mMsg } = message
    const colors = this.colors()

    console.log(
      `${colors.t[tColor]||colors.t.white}[${tMsg}]${colors.r}`,
      `${colors.t[mColor]||colors.t.white}${mMsg}${colors.r}`
    )
  }
}

module.exports = Logger
