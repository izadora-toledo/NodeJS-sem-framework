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
            const url = request.url; 
            const splitURL = url.split("/");             
            console.log(splitURL);          
            const idUser = splitURL[2];       
            const userIndex = users.findIndex((user) => user.id === idUser);         
            request.on("data", (data) => {
                const dataUser = JSON.parse(data);
                users[userIndex] = { 
                    id: idUser,
                    ...dataUser
                };
            }).on("end", () => { 
                return response.end(JSON.stringify(users));
            });       
        }
    }
}).listen(4000, () => console.log("Server ir running on PORT 4000 :)"));


/* FIM DO PROJETO */

// Única dependência usada foi o nodemon para que não precisasse ficar reiniciando o servidor e ter que ficar parando toda hora. 