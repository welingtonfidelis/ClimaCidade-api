
# ClimaCidade - API

  

O projeto tem como foco aprendizado e demonstração de habilidades na construção de uma API Rest em NodeJs e MongoDB juntamente com uma página web em ReactJs. A aplicação **ClimaCidade** fornece ao usuário a possibilidade de buscar informações à cerca do clima de cidades através de uma busca na API [OpenWeatherMap]. Também é possível através aplicação conferir as 5 cidades mais buscadas e o histórico de buscas, ambos atualizados em tempo real com uso de [socket].

Também foi introduzido no projeto a possibilidade de uso de [docker container] para criar uma instância da API e do banco MongDB.

  

* Obs.: Este é o backend do projeto, o frontend está [aqui].

  

### Requisitos

  

* [NodeJs] - Nodejs 10 ou superior;

* [Docker] - **OPTATIVO** Docker para uso de containers;

* [MongoDB] - Banco de dados não relacional (pode-se usar um banco criado na plataforma [MongoDB Atlas] ou um banco [MongoDB local]);

  

### Instalação

  

* Sem uso de docker - **API** alterar as configurações de conexão ao banco dentro do arquivo /api/src/Database/config.js. Note que existem 3 maneiras de conectar ao seu banco MongoDB aqui, a primeira é utilizando uma conexão fornecida através da plataforma MongoDB Atlas, a segunda com banco MongoDB local (atualmente "descomentada" no arquivo config.js) e a terceira com uso de um docker container juntamente com a versão da api em docker container. Ainda dentro da pasta api, crie um arquivo na raiz desta pasta chamado .env (observe o arquivo .env.example), onde deve-se colocar as informações de conexão de seu banco na platafroma MongDB Atlas (caso esteja utilizando) e a chave para acesso à API do OpenWeatherMap, onde você pode conseguir esta chave com cadastro gratuito [neste link]. Para finalizar a etapa da api, execute através de seu terminal os comandos npm install ou yarn install em seguinda npm start ou yarn start, se tudo ocorrer bem, você verá a mensagem "server running in 3001".

* Utilizando docker: caso deseje executar a api e o banco de dados através de um container automático, dentro de /api/src/Database/config.js, "comente" as linhas referentes à conexão com banco local e "descomente" as linhas referentes à conexão com docker. Em seguida, execute o comando docker-compose up. Este comando criará um container contendo o banco de dados e outro contendo a api deste projeto já em execução na porta 3001.

  

### Utilizando a aplicação

No painel esquerdo da aplicação, é possível inserir um nome de cidade e ao clicar em buscar, caso a cidade esteja disponível na api do OpenWeatherMap, as informações sobre clima desta cidade serão apresentados logo abaixo do campo de busca. Já no painel direito, na tabela superior ficam as cidades mais buscadas na aplicação, e na tabela inferior, o histórico de busca das cidades ordenadas por data e horário. Vale ressaltar que estas tabelas são atualizadas assim que qualquer usuário da aplicação faça uma busca.

Caso queira utilizar apenas a api deste projeto, pode importar [este arquivo] e utilizá-lo no [Postman]. Estes endpoints e seus retornos estão mais detalhados na seção abaixo.

  

### Endpoint e retorno

Endpoint: http://localhost:3001/weather/Passos

Retorno:

```

{

"status": true,

"response": {

"feelsLike": 14.9,

"tempNow": 15.25,

"tempMin": 15.25,

"tempMax": 15.25,

"humidity": 83,

"windSpeed": 1.55,

"weather": "nuvens dispersas",

"city": "Passos",

"country": "BR",

"updatedAt": "2020-06-18T23:55:55.132Z",

"icon": "http://openweathermap.org/img/w/03n.png"

}

}

```

  

Endpoint: http://localhost:3001/history

Retorno:

```

{

"status": true,

"response": [

{

"_id": "5eebf7acf95f740c24499d57",

"name": "Passos",

"count": 2,

"createdAt": "2020-06-18T23:24:28.573Z",

"updatedAt": "2020-06-18T23:54:44.481Z",

"__v": 0

},

{

"_id": "5eebfc1032a10e1275c10b03",

"name": "Itaú",

"count": 4,

"createdAt": "2020-06-18T23:43:12.469Z",

"updatedAt": "2020-06-18T23:48:41.363Z",

"__v": 0

},

{

"_id": "5eebfb4238f2e410502f475e",

"name": "Bom Despacho",

"count": 4,

"createdAt": "2020-06-18T23:39:46.464Z",

"updatedAt": "2020-06-18T23:41:21.907Z",

"__v": 0

}

]

}

```

  

Endpoint: http://localhost:3001/top

Retorno:

```

{

"status": true,

"response": [

{

"_id": "5eebfb4238f2e410502f475e",

"name": "Bom Despacho",

"count": 4,

"createdAt": "2020-06-18T23:39:46.464Z",

"updatedAt": "2020-06-18T23:41:21.907Z",

"__v": 0

},

{

"_id": "5eebfc1032a10e1275c10b03",

"name": "Itaú",

"count": 4,

"createdAt": "2020-06-18T23:43:12.469Z",

"updatedAt": "2020-06-18T23:48:41.363Z",

"__v": 0

},

{

"_id": "5eebf7acf95f740c24499d57",

"name": "Passos",

"count": 2,

"createdAt": "2020-06-18T23:24:28.573Z",

"updatedAt": "2020-06-18T23:54:44.481Z",

"__v": 0

}

]

}

```

  

### Contato

welingtonfidelis@gmail.com

Sugestões e pull requests são sempre bem vindos =)

  

License

----

  

MIT

  

**Free Software, Hell Yeah!**

  

[//]:  #  (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

  

[OpenWeatherMap]: <https://openweathermap.org/current>

[socket]: <https://socket.io/>

[NodeJs]: <https://nodejs.org/en/>

[docker container]: <https://www.docker.com/resources/what-container>

[Postman]: <https://www.postman.com/downloads/>

[Docker]: <https://www.docker.com/get-started>

[MongoDB]: <https://www.mongodb.com/>

[MongoDB Atlas]: <https://www.mongodb.com/cloud/atlas>

[MongoDB local]: <https://docs.mongodb.com/manual/installation/>

[neste link]: <https://home.openweathermap.org/users/sign_up>

[este arquivo]: <https://drive.google.com/file/d/1VRgWlxOq4EGwEKVqGXaj_G7F0irC6kSk/view?usp=sharing>

[aqui]: <https://github.com/welingtonfidelis/ClimaCidade-web>