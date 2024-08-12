# Lista de Tarefas

Este é um projeto de gestão de tarefas, desenvolvido com PHP para o backend e HTML, CSS, JavaScript e Bootstrap para o frontend. Ele permite que os usuários adicionem, editem, visualizem e excluam tarefas, além de aplicar filtros e realizar buscas.

## Funcionalidades

- **Adicionar Tarefas**: Permite que o usuário adicione uma nova tarefa com título, descrição e status (Pendente ou Concluída).
- **Visualizar Tarefas**: Exibe uma lista de todas as tarefas, com opções para filtrar por status (Todas, Pendentes ou Concluídas) e buscar por palavras-chave.
- **Editar Tarefas**: Permite que o usuário edite o título, a descrição e o status de uma tarefa existente.
- **Excluir Tarefas**: Permite que o usuário exclua uma tarefa.

## Tecnologias Utilizadas

### Frontend

- **HTML**: Para a estruturação do conteúdo.
- **CSS**: Para a estilização da interface.
- **JavaScript**: Para manipulação de eventos e interação com o backend.
- **Bootstrap**: Para estilização e design responsivo.

### Backend

- **PHP**: Para o desenvolvimento do backend.
- **MySQL**: Para o banco de dados.

## Como Executar o Projeto

### Pré-requisitos

- Servidor local.
- PHP 7.4 ou superior.
- MySQL 5.7 ou superior.

### Passos

1. Clone o repositório para o seu servidor local
2. Crie um banco de dados MySQL chamado tarefas
3. Importe o arquivo SQL 'tarefas.sql'
4. Configure o arquivo 'db.php' para se comunicar com o banco de dados ('username' e 'password')
5. Inicie o Apache e o mySQL.
6. Para visualizar o projeto, acesse: http://localhost/tarefas/public/


### Possíveis melhorias

- Autenticação para múltiplos usuários.
- Inclusão de tarefas por voz.
- Estimativa de tempo para realização da tarefa.
- Alertas para tarefas atrasadas.


