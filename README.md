## Introdução 

Neste repositório está contida a implementação do frontend utilizando-se do framework progressivo Nuxt.Js - baseado em Vue.JS - e do template de dashboard CoreUI da plataforma do PET-CC UFRN, Programa de Educação Tutorial da Universidade do Rio Grande do Norte.

- [Pré-requisitos](#pré-requisitos) - Requisitos para executar o projeto.
- [Como instalar e executar](#como-instalar-e-executar) - Instruções sobre como executar o projeto.
- [Dasboard do usuário](#dasboard-do-usuário) - Explicação sobre organização adotada no dasboard do usuário.
- [Referências](#referências) - Link contendo material de referência.
- [Contribuidores](#contribuidores) - Pessoas que ajudaram no desenvolvimento do projeto.


## Pré-requisitos

Faz-se necessário os seguintes programas para executar o projeto:

    
- `NPM`  
- `Node` 	  

Alguns artigos que podem ajudar a realizar a instalação:  
- [How to Install Node.js and npm on Ubuntu 18.04](https://linuxize.com/post/how-to-install-node-js-on-ubuntu-18.04/)
- [How to Install Latest Node.js and NPM on Ubuntu with PPA](https://tecadmin.net/install-latest-nodejs-npm-on-ubuntu/)

## Como instalar e executar

Em seu computador execute os seguintes comandos para clonagem do repositório localmente e instalação das dependências do projeto:

``` bash
$ git clone https://github.com/PETCC-UFRN/ePET-visual.git  
$ cd ePET-visual

$ npm install
```

### Desenvolvimento

Para facilitar o desenvolvimento, aconselha-se a usar o programa no modo de desenvolvedor onde ocorre atualização automática em tela das mudanças feitas em código. Diante disso, execute o seguinte comando:

``` bash
$ npm run dev
```

Em seguida, abra o navegador e acesse o seguinte endereço [http://localhost:3000](http://localhost:3000).

#### Mudando endereço da API do back-end

O consumo da API do back-end pelo front-end é feito por meio do plugin **Axios**. Caso deseje modificar o endereço da API que será consumida, basta modificar o campo `baseURL` no arquivo _nuxt.config.js_.

 ```
...
axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: "https://petcc.dimap.ufrn.br:8443/api"
  },
...
 ```
Atualmente, a API do backend consumida está em [https://petcc.dimap.ufrn.br:8443/api](https://petcc.dimap.ufrn.br:8443/api).


### Produção

Em estágio de produção, aconselha-se a usar o programa no modo de produção. Diante disso, execute os seguintes comandos:

``` bash
$ npm run build
$ npm start
```
#### Usando o Docker

Para fazer uso do Docker pode-se fazer uso do arquivo `Dockerfile` disponibilizado no repositório e executar os seguintes comandos:

```
$ docker build -t nuxt-docker .    ## Gerando imagem
$ docker run --network host -d nuxt-docker ## Criando e executando container
``` 

## Dasboard do usuário

O frontend possui páginas sem com necessidade de autenticação e também tem páginas com necessidade de autenticação, o _dasboard do usuário_. Nesse contexto, o _dasboard do usuário_ irá variar de acordo com o nível de permissão dele. Ao ser criada uma nova conta, o usuário adquirirá permissão de **Usuário Comum**. 

- Permissão de **Usuário Comum** pode ver notícias, ver e solicitar tutorias e evento relacionados
- Permissão de **Petiano** possui mesmo privilégios de _Usuário Comum_ porém acrescido de gerenciamento de notícias, tutorias e evento relacionados
- Permissão de **Tutor** possui mesmo privilégios de _Petiano_ porém acrescido de gerenciar usuários e permissões

## Referências
- [Nuxt.js - Documentação (Inglês)](https://nuxtjs.org/guide)
- [Nuxt.js - Overview (Português) ](https://www.youtube.com/watch?v=6hDsWDKZ9oE)
- [Nuxt.js - Curso gratuito (Inglês)](https://vueschool.io/courses/nuxtjs-fundamentals)
- [Nuxt.js - Página oficial de links relacionados (Inglês)](https://github.com/nuxt-community/awesome-nuxt)
- [Nuxt.js - Guia prático (Inglês)](https://medium.com/@onlykiosk/the-complete-nuxt-guide-940751e1a6a5)
- [CoreUI - Demo (Inglês)](https://nuxt-coreui.netlify.app/)
- [CoreUI - Repositório no Github (Inglês)](https://github.com/muhibbudins/nuxt-coreui)
- [BootstrapVue - Documentação (Inglês)](https://bootstrap-vue.org/docs)


## Contribuidores

Samuel, Ítalo, Jhonattan, Daniel, Henrique e Abraão. 


