# 5FlexBot
Um BOT de Discord com imensas funcionalidades, incluindo a possibilidade de conexão a servidores de FiveM.


## Passos para criar a DB e as tabelas todas

1. `npx sequelize db:create`
2. `npx sequelize db:migrate`


## Ligar o BOT

1. `npm start`


## Exemplos de como fazer queries (retornam Promise)

1. SELECT: this.client[tabela].findByPk() => https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findByPk
2. INSERT: this.client[tabela]create() => https://sequelize.org/master/class/lib/model.js~Model.html#static-method-create
3. UPDATE: this.client[tabela]update() => https://sequelize.org/master/class/lib/model.js~Model.html#static-method-update
4. DELETE: this.client[tabela]destroy() => https://sequelize.org/master/class/lib/model.js~Model.html#static-method-destroy