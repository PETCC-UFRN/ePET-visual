
# ePET-frontend  

## Introdução 

Neste repositorio esta contida implementacao do front-end da plataforma do PET-CC.

- [Pre-requisitos](#pre-requisitos) - Pre-requisto para executar o projeto.
- [Como executar](#como-executar) - Reference links.


## Pre-requisitos

Faz-se necessario os seguintes programas para executar o projeto:

    - NPM ou Yarn

Além disso é necessário adicionar as credenciais da API no arquivo axios.js, o arquivo é uma instância do axios.example.js:

```shell
cp axios.example.js axios.js
``` 

## Como executar

Em seu computador execute os seguintes comandos:

``` bash
$ git clone   
$ cd ePET-frontend

# install dependencies
$ npm install # Or yarn install
```

### Desenvolvimento

Para facilitar o desenvolvimento, aconselha-se a usar o programa no modo de desenvolvedor. Diante disso, execute os seguinte comando:

``` bash
# serve with hot reloading at localhost:3000
$ npm run dev # Or yarn dev
```

Em seguida, abra o navegador e acesse a seguinte endereco [http://localhost:3000](http://localhost:3000)

### Producao

Em estagio de producao, aconselha-se a usar o programa no modo de producao. Diante disso, execute os seguinte comando:

``` bash
# build for production and launch the server
$ npm run build
$ npm start
```
