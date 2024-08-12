## Documentação da API

### Endpoints

#### 1. **Criar Tarefa**
   - **Endpoint:** `/api/tasks.php`
   - **Método:** `POST`
   - **Parâmetros:**
     - `titulo` (string, obrigatório): Título da tarefa.
     - `descricao` (string, opcional): Descrição da tarefa.
     - `status` (string, opcional): Status da tarefa (padrão: `pending`).
   - **Exemplo de Request:**
     ```bash
     curl -X POST http://localhost/tarefas/api/tasks.php -H "Content-Type: application/json" -d '{"titulo": "Nova Tarefa", "descricao": "Descrição da tarefa", "status": "pending"}'
     ```
   - **Exemplo de Resposta:**
     ```json
     {
       "message": "Tarefa adicionada com sucesso."
     }
     ```

#### 2. **Listar Todas as Tarefas**
   - **Endpoint:** `/api/tasks.php`
   - **Método:** `GET`
   - **Parâmetros:** Nenhum
   - **Exemplo de Request:**
     ```bash
     curl -X GET http://localhost/tarefas/api/tasks.php
     ```
   - **Exemplo de Resposta:**
     ```json
     [
       {
         "id": 1,
         "titulo": "Tarefa 1",
         "descricao": "Descrição da tarefa 1",
         "status": "pending"
       },
     ]
     ```

#### 3. **Obter uma Tarefa Específica**
   - **Endpoint:** `/api/tasks.php?id={id}`
   - **Método:** `GET`
   - **Parâmetros:**
     - `id` (int, obrigatório): ID da tarefa.
   - **Exemplo de Request:**
     ```bash
     curl -X GET http://localhost/tarefas/api/tasks.php?id=1
     ```
   - **Exemplo de Resposta:**
     ```json
     {
       "id": 1,
       "titulo": "Tarefa 1",
       "descricao": "Descrição da tarefa 1",
       "status": "pending"
     }
     ```

#### 4. **Atualizar Tarefa**
   - **Endpoint:** `/api/tasks.php?id={id}`
   - **Método:** `PUT`
   - **Parâmetros:**
     - `id` (int, obrigatório): ID da tarefa.
     - `titulo` (string, obrigatório): Título da tarefa.
     - `descricao` (string, opcional): Descrição da tarefa.
     - `status` (string, opcional): Status da tarefa.
   - **Exemplo de Request:**
     ```bash
     curl -X PUT http://localhost/tarefas/api/tasks.php?id=1 -H "Content-Type: application/json" -d '{"titulo": "Tarefa Atualizada", "descricao": "Nova descrição", "status": "completed"}'
     ```
   - **Exemplo de Resposta:**
     ```json
     {
       "message": "Tarefa atualizada com sucesso."
     }
     ```

#### 5. **Deletar Tarefa**
   - **Endpoint:** `/api/tasks.php?id={id}`
   - **Método:** `DELETE`
   - **Parâmetros:**
     - `id` (int, obrigatório): ID da tarefa.
   - **Exemplo de Request:**
     ```bash
     curl -X DELETE http://localhost/tarefas/api/tasks.php?id=1
     ```
   - **Exemplo de Resposta:**
     ```json
     {
       "message": "Tarefa deletada com sucesso."
     }
     ```

