/* Um dos módulos para criar o servidor é o HTTP, ele tem uma função chamada createServer, essa função recebe dois parametros que são o REQ e o RES */
/* REQ (request é tudo que a gente recebe) é tudo que o usuário está enviando para o nosso servidor (aplicação), exemplo: login de usuario */
/* RES (response é tudo que a gente envia) é tudo que você quer retornar para o usuário (para a pessoa que fez a requisição (REQ))*/

// Primeiramente vamos importar o módulo HTTP
// O .listen é o responsável por subir o nosso servidor, onde declaramos o primeiro parametro que é a porta que vai receber a aplicação, e o segundo passamos uma função apenas com um console.log e uma mensagem de que o servidor está rodando na porta 4000 pra ter certeza que nossa aplicação funcionou.
/* 
    Métodos http 
    GET - Buscar um dado
    POST - Inserir um dado
    PUT - Alterar um dado
    DELETE - Remover um dado
*/
const http = require("http");

const server = http.createServer((request, response) => {
// Aqui dentro será criado tudo que é pra ser feito quando o servidor estiver rodando.

const users = [];

if (request.url === "/users") { // Esse if verifica se o valor que eu estou RECEBENDO é igual a uma barra /
    if (request.method === 'GET') {
        return response.end("A aplicação está no ar!"); // Caso ele tenha essa condição de ser uma barra, ele retornará essa mensagem.
    }

    if (request.method === 'POST') {
        request.on("data", (data) => console.log(JSON.parse(data))); // o data é tudo que vem através do body da minha requisição no insomnia, ou seja, é através dele que vamos conseguir pegar as informações que estamos passando no insomnia. O primeiro parametro é qual o tipo de evento ou seja o data é o evento e o segundo é o objeto que queremos de fato receber da nossa requisição, pra testar basta apertar o SEND lá no insomnia. Perceba que ele trará um retorno como Buffer, então precisamos converter pra uma forma que dê para entender o que está chegando. Basta usar o JSON.parse(), agora vamos pegar tudo que veio no nosso data e guardar dentro de um array como se fosse receber uma lista de usuários.
        return response.end("Chamada POST funcionando!");
    }
}

// Para fazer com uma url que seja do tipo post, temos duas formas de fazer: 1 - fazer a verificação do método 2 - ou fazer a verificação da url
}).listen(4000, () => console.log("Server ir running on PORT 4000 :)"));

/* 
    Para deixar o código mais clean, pode fazer assim também
    server.listen(4000);
*/

// Para rodar o arquivo index.js use o comando 'node index.js' sem as aspas.
// Se você tentar acessar no navegador o localhost:4000 ele vai ficar apenas rodando e não vai acontecer nada ainda, pois não definimos o que é pra ser feito.

// Para não ter que ficar reiniciando o servidor a cada alteração que fizer usando o CTRL + C, baixe a dependência: npm i nodemon -D, ela fica escutando nosso arquivo e a cada alteração feita no arquivo ela reinicia o servidor automaticamente, mas antes inicie o seu projeto node com o comando npm init -y pra que ele crie nosso arquivo package.json.
// Package.json é nosso arquivo de configuração do nosso projeto (nome do projeto, versão das dependências do projeto)
// A pasta node modules é onde fica todas as dependências do nosso projeto

/* 
    Dentro do package json, altere a linha do script test para o nome do debug que você deseja usar pra rodar o servidor com o nodemon, igual o exemplo abaixo:
    "scripts": {
        "dev": "nodemon index.js"
    },
    E aí pra rodar o script basta usar o comando npm run dev
*/

/*
    Por padrão o navegador só tem como receber chamadas GET, como queremos testar a chamada POST usaremos o Insomnia
    Tem uma extensão chamada REST CLIENT que conseguimos fazer chamadas rest direto pelo vscode. Mas não vamos usar ela nesse projeto.

    Abra o Insomnia, crie uma nova pasta de request, crie um novo request do tipo POST com o nome de Create User e no local da url coloque http://localhost:4000/users e clique em SEND e vai
    perceber que vai trazer código 200 de sucesso com a nossa mensagem definida no IF que criamos -> Chamada POST funcionando!.

    Faça a mesma coisa e crie um request com o tipo GET

    No request do post vamos criar um JSON com os campos name e username, igual o exemplo abaixo:
    {
        "name": "",
        "username": ""
    }    
*/

/*
    Geralmente, quando usamos framework conseguimos trabalhar com o request.body, mas nesse caso que não temos o framework, precisamos trabalhar um pouco mais com esse request. 
    Nesse caso, usaremos o request.on("data"), onde data se pronuncia DÊIRA em inglês.
*/

