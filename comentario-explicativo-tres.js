/*
    Como receber um ID através da nossa rota?
    Vamos criar uma requisição PUT com o nome de Alter User
    Como receber o id que está no array no nosso servidor? d4a92d64-c213-4b34-acac-23212fea6744
*/
const http = require("http");
const {randomUUID} = require("crypto"); 
const users = [];

const server = http.createServer((request, response) => {
    if (request.url === "/users") { 
        if (request.method === 'GET') {
            return response.end(JSON.stringify(users)); 
        }
        if (request.method === 'POST') {
            request.on("data", (data) => {
         
                const dataUser = JSON.parse(data);
                const user = {
                    id: randomUUID(),
                    ...dataUser, 
                };
               
                users.push(user);
            }).on("end", () => { 
                return response.end(JSON.stringify(users));
               
            }); 
        }
    }

    if (request.url.startsWith("/users")) {
        if (request.method === "PUT") {
            const url = request.url; // Agora precisamos pegar os parametros da minha url
            const splitURL = url.split("/"); // Ele cria um array e separa o objeto a partir da barra /
            //console.log(split); // esse console retorna: /users/d4a92d64-c213-4b34-acac-23212fea6744
            console.log(splitURL); // esse console retorna: [ '', 'users', 'd4a92d64-c213-4b34-acac-23212fea6744' ]
            // como ele sempre vai trazer nessa sequência, podemos definir que o array user será
            const idUser = splitURL[2];
            //console.log(idUser);
            // vamos percorrer o nosso array e comparar os ids
            const userIndex = users.findIndex((user) => user.id === idUser);

            // caso eu queira alterar algum dado
            request.on("data", (data) => {
                const dataUser = JSON.parse(data);
                users[userIndex] = { // meu users na posição userIndex, eu quero que ele pegue o meu ID como sendo o idUser e mais tudo que ele tiver passando ...dataUser
                    id: idUser,
                    ...dataUser
                };
            }).on("end", () => { 
                return response.end(JSON.stringify(users));
            });       
        }
    }
}).listen(4000, () => console.log("Server ir running on PORT 4000 :)"));