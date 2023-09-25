// Fazemos o post e get retornarem as informações no array
// Continuação do arquivo-um, pois agora vamos remover o console.log(JSON.parse(data)) pra criar realmente um objeto.
const http = require("http");
const {randomUUID} = require("crypto"); // essa função vai criar um ID únic randômico, ele é um ID não sequencial trazendo mais segurança pra nossa aplicação.
const users = [];

const server = http.createServer((request, response) => {
    if (request.url === "/users") { 
        if (request.method === 'GET') {
            return response.end(JSON.stringify(users)); // Vamos trocar a mensagem " a aplicação está no ar, para o nosso array user", teoricamente ele trás o array vazio, pois da um reload toda vez que a aplicação roda e limpa o array, então pra que apareça as informações basta dar um SEND (salvar) a requisição POST e depois dar um SEND na requisição GET
        }
        if (request.method === 'POST') {
            request.on("data", (data) => {
                // Abrindo essa função para criar um objeto user, porque além do name e username, eu quero criar um id para esse usuario. Pra isso usaremos uma função de dentro do módulo crypto
                const dataUser = JSON.parse(data);
                const user = {
                    id: randomUUID(),
                    ...dataUser // vamos usar um rest operator para pegar tudo que existir dentro do nosso dataUser
                }
                // Aqui nosso usuário já vai ter sido salvo no nosso array
                users.push(user);
            }).on("end", () => { // Vamos criar algo pra ele só retornar a resposta pro usuário quando ele de fato completar a nossa requisição
                return response.end(JSON.stringify(users)); // Trocamos a frase CHAMADA POST FUNCIONANDO pelo array de usuarios que deve ser retornado em formato de string.
                /*
                    O retorno que vai aparecer pro usuário no insomnia, será o mesmo que esse abaixo quando completar a requisição:
                    [
                        {
                            "id": "93e5523a-fd99-4263-8b32-1017b612d43b",
                            "name": "Izadora",
                            "username": "Iza"
                        }
                    ]
                */
            }); 
        }
    }
}).listen(4000, () => console.log("Server ir running on PORT 4000 :)"));

