
# ePET-frontend  

## Introdução 

Neste repositório está contida a implementação do frontend da plataforma do PET-CC UFRN, Programa de Educação Tutorial da Universidade do Rio Grande do Norte.

- [Pré-requisitos](#pré-requisitos) - Requisitos para executar o projeto.
- [Como executar](#como-executar) - Instruções sobre como executar o projeto.


## Pré-requisitos :eyes:

Faz-se necessário os seguintes programas para executar o projeto com suas respectivas versões recomendadas:


| Nome: | Versão:  |    
| :---------- | :------------- |
|`NPM` 	| 3.5.2 |  
|`Vue CLI` 	| 3.11.0 |  
|`Node` 	| 8.10.0 |  



    Pode-se utilizar o Yarn ao invés do NPM. Diante disso, recomenda-se o uso a partir da versão `1.21.1`.
### Observação :warning:
Além disso, é necessário adicionar as credenciais da API no arquivo axios.js, o arquivo é uma instância do axios.example.js:

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

Para facilitar o desenvolvimento, aconselha-se a usar o programa no modo de desenvolvedor. Diante disso, execute o seguinte comando:

``` bash
# serve with hot reloading at localhost:3000
$ npm run dev # Or yarn dev
```

Em seguida, abra o navegador e acesse o seguinte endereço [http://localhost:3000](http://localhost:3000).

### Produção

Em estágio de produção, aconselha-se a usar o programa no modo de produção. Diante disso, execute os seguintes comandos:

``` bash
# build for production and launch the server
$ npm run build
$ npm start
```

### Observação :construction:

No momento o login ainda não foi desenvolvido, por isso existe o arquivo user.js com um usuário fantásia. No futuro os dados desse usuário serão recuperados do usuário que está logado.
