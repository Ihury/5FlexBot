const { readdirSync, readFileSync } = require('fs')

// Para mais informação, acessar:
// https://github.com/5antos/JS-Randomness/tree/master/Translation

class Translator {
  constructor(client, languagesFolderPath='./src/translations') {
    this.client = client
    this.languagesFolderPath = languagesFolderPath
  }


  /**
   * @note O erro 'Unexpected end of JSON input' vai ser retornado se existir um JSON vazio de algum idioma
   * @param {string} topic String para traduzir
   * @param {string} language Idioma da tradução
   * @param {object} [bindTo=this.client] Objeto onde armazenar as traduções
   * @returns {string|null} String traduzida. Retorna null se o idioma ou a linguagem forem inválidos
   */
  t = (topic, language, bindTo=this.client) => {
    const languages = bindTo?.translation?.languages || readdirSync(path).map(l => [l.slice(0,2)])
  
    if (!languages.flat().includes(language)) return null
  
    for (var i = 0; i < languages.length; i++)
      languages[i][1] = JSON.parse(readFileSync(`${path}/${languages[i][0]}.json`, { encoding: 'utf8' }).replace(/\s|\r|\n|\t/g, ' '))
  
    if (bindTo) {
      bindTo.translation = bindTo?.translation || {}
      bindTo.translation.languages = languages
    } 
  
    return topic.replace(/:/g, '.').split('.').reduce((obj, curr) => obj?.[curr], languages[languages.findIndex(l => l[0] === language)][1]) || null
  }
}

module.exports = Translator
