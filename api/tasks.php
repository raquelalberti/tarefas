<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE");
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With");

include_once 'db.php';

$database = new Database();
$db = $database->getConnection();

$request_method = $_SERVER["REQUEST_METHOD"];

switch ($request_method) {
    case 'POST':
        adicionarTarefa($db);
        break;
    case 'GET':
        if (isset($_GET['id'])) {
            obterTarefa($db, intval($_GET['id']));
        } else {
            obterTarefas($db);
        }
        break;
    case 'PUT':
        if (isset($_GET['id'])) {
            atualizarTarefa($db, intval($_GET['id']));
        } else {
            header("HTTP/1.0 400 Bad Request");
            echo json_encode(["message" => "ID da tarefa não fornecido."]);
        }
        break;
    case 'DELETE':
        if (isset($_GET['id'])) {
            deletarTarefa($db, intval($_GET['id']));
        } else {
            header("HTTP/1.0 400 Bad Request");
            echo json_encode(["message" => "ID da tarefa não fornecido."]);
        }
        break;
    default:
        header("HTTP/1.0 405 Method Not Allowed");
        break;
}

function adicionarTarefa($db) {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->titulo)) {
        $query = "INSERT INTO tarefas (titulo, descricao, status) VALUES (:titulo, :descricao, :status)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":titulo", $data->titulo);
        $stmt->bindParam(":descricao", $data->descricao);
        $stmt->bindParam(":status", $data->status);

        if($stmt->execute()) {
            echo json_encode(["message" => "Tarefa adicionada com sucesso."]);
        } else {
            echo json_encode(["message" => "Erro ao adicionar tarefa."]);
        }
    } else {
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["message" => "O título da tarefa é obrigatório."]);
    }
}

function obterTarefas($db) {
    $query = "SELECT * FROM tarefas";
    $stmt = $db->prepare($query);
    $stmt->execute();
    $tarefas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($tarefas);
}

function obterTarefa($db, $id) {
    $query = "SELECT * FROM tarefas WHERE id = :id LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":id", $id);
    $stmt->execute();
    $tarefa = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($tarefa) {
        echo json_encode($tarefa);
    } else {
        header("HTTP/1.0 404 Not Found");
        echo json_encode(["message" => "Tarefa não encontrada."]);
    }
}

function atualizarTarefa($db, $id) {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->titulo)) {
        $query = "UPDATE tarefas SET titulo = :titulo, descricao = :descricao, status = :status WHERE id = :id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":titulo", $data->titulo);
        $stmt->bindParam(":descricao", $data->descricao);
        $stmt->bindParam(":status", $data->status);

        if($stmt->execute()) {
            echo json_encode(["message" => "Tarefa atualizada com sucesso."]);
        } else {
            echo json_encode(["message" => "Erro ao atualizar tarefa."]);
        }
    } else {
        header("HTTP/1.0 400 Bad Request");
        echo json_encode(["message" => "O título da tarefa é obrigatório."]);
    }
}

function deletarTarefa($db, $id) {
    $query = "DELETE FROM tarefas WHERE id = :id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":id", $id);

    if($stmt->execute()) {
        echo json_encode(["message" => "Tarefa deletada com sucesso."]);
    } else {
        echo json_encode(["message" => "Erro ao deletar tarefa."]);
    }
}
