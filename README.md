##Projeto BookBook

A empresa BookBook está com uma ideia ousada para competir de frente com grandes players do mercado de vendas de Livros físicos e eBook. Trata-se de um projeto chamado BookBook, o qual será uma rede social voltada para consumidores de livros. O sistema terá as seguintes funcionalidades: 

O sistema será protegido por uma tela de Login;

O sistema possuirá uma tela de cadastros de novos usuários;

O sistema possuirá três páginas: Busca por livros, Prateleira e Linha do tempo;

O usuário possuirá três prateleiras virtuais: Quero Ler, Lendo Atualmente e Acabei de ler;

O usuário poderá buscar por livros através da API do Google e adicionar em uma das prateleiras virtuais;

Ao adicionar o livro, o usuário poderá dar uma nota e escrever sua opinião sobre o mesmo;

A linha do tempo irá listar todos os livros lidos de todos os usuários;


O desenvolvimento do sistema deve ser feito em duas sprints, e pretendemos participar em algumas das cerimônias para analisarmos o progresso do desenvolvimento.


Informações técnicas

	O busca de livros deve ser feita na api do google, através do endpoint:

		const q = "react+js";
const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${q}`;
const getReactBooks = () => (
  fetch(`${apiUrl}`)
    .then(res => res.json())
    .then(res => console.log(date.items))
