const { readdirSync, readFileSync } = require('fs')

// Para mais informação, acessar:
// https://github.com/5antos/JS-Randomness/tree/master/Translation

module.exports = class {
  constructor(client, languagesFolderPath='./src/translations') {
    this.client = client
    this.languagesFolderPath = languagesFolderPath
  }


  /**
   * @note O erro 'Unexpected end of JSON input' vai ser retornado se existir um JSON vazio de algum idioma
   * @param {string} topic String para traduzir
   * @param {string} language Idioma da tradução
   * @param {object} [placeholders={}] Placeholders para substituir na string traduzida
   * @param {object} [bindTo=this.client] Objeto onde armazenar as traduções
   * @returns {string|null} String traduzida. Retorna null se o idioma ou a linguagem forem inválidos
   */
  translate = (topic, language, placeholders={}, bindTo=this.client) => {
    const languages = bindTo?.translation?.languages || readdirSync(this.languagesFolderPath).map(l => [l.slice(0,2)])
  
    if (!languages.flat().includes(language)) return null
  
    for (var i = 0; i < languages.length; i++)
      languages[i][1] = JSON.parse(readFileSync(`${this.languagesFolderPath}/${languages[i][0]}.json`, { encoding: 'utf8' }).replace(/\s|\r|\n|\t/g, ' '))
  
    if (bindTo) {
      bindTo.translation = bindTo?.translation || {}
      bindTo.translation.languages = languages
    } 
  
    const translated = topic
      .replace(/:/g, '.')
      .split('.')
      .reduce((obj, curr) => obj?.[curr], languages[languages.findIndex(l => l[0] === language)][1])
      || null

    return translated && Object.entries(placeholders)?.length ? this.applyPlaceholders(placeholders, translated) : translated
  }


  // https://github.com/5antos/JS-Randomness/blob/master/placeholders.js
  applyPlaceholders = (placeholders, string, delimiters=['{','}']) => {
    return string.replace(new RegExp(Object.keys(placeholders).map(k => `${delimiters[0]}${k}${delimiters[1]}`).join('|'), 'g'), match => placeholders[match.replace(new RegExp(delimiters.join('|'), 'g'), '')])
  }
}
