let tarefaIdAtual = null;
let tarefas = [];

function mostrarToast(mensagem, tipo = 'success') {
    const containerToast = document.getElementById('container-toast');
    const toastId = `toast-${Date.now()}`;
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${tipo} border-0`;
    toast.id = toastId;
    toast.role = 'alert';
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${mensagem}
            </div>
        </div>
    `;
    containerToast.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast, { delay: 3000 });
    bsToast.show();
    toast.addEventListener('hidden.bs.toast', () => {
        toast.remove();
    });
}

function obterTarefas() {
    fetch('http://localhost/tarefas/api/tasks.php')
        .then(response => response.json())
        .then(data => {
            tarefas = data;
            exibirTarefas(tarefas);
        });
}

function exibirTarefas(tarefasFiltradas) {
    let saida = '';
    tarefasFiltradas.forEach(tarefa => {
        saida += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card tarefa-card" onclick="visualizarTarefa(${tarefa.id})">
                    <div class="card-body">
                        <h5 class="card-title">${tarefa.titulo}</h5>
                        <p class="card-text">${tarefa.descricao}</p>
                    </div>
                </div>
            </div>`;
    });
    document.getElementById('tarefas').innerHTML = saida;
}

function filtrarTarefas() {
    const valorFiltro = document.getElementById('selectFiltro').value;
    if (valorFiltro === 'all') {
        exibirTarefas(tarefas);
    } else {
        const tarefasFiltradas = tarefas.filter(tarefa => tarefa.status === valorFiltro);
        exibirTarefas(tarefasFiltradas);
    }
}

function buscarTarefas() {
    const termoBusca = document.getElementById('inputBusca').value.toLowerCase();
    const tarefasFiltradas = tarefas.filter(tarefa =>
        tarefa.titulo.toLowerCase().includes(termoBusca) ||
        tarefa.descricao.toLowerCase().includes(termoBusca)
    );
    exibirTarefas(tarefasFiltradas);
}

function adicionarTarefa(e) {
    e.preventDefault();
    let titulo = document.getElementById('titulo').value;
    let descricao = document.getElementById('descricao').value;
    let status = document.getElementById('status').value;

    fetch('http://localhost/tarefas/api/tasks.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: titulo, descricao: descricao, status: status })
    })
        .then(response => response.json())
        .then(data => {
            mostrarToast(data.message, 'success');
            $('#modalAdicionarTarefa').modal('hide');
            obterTarefas();
            document.getElementById('titulo').value = '';
            document.getElementById('descricao').value = '';
            document.getElementById('status').value = 'pending';
        })
        .catch(error => {
            mostrarToast('Erro ao adicionar tarefa.', 'danger');
        });
}

function deletarTarefa(id) {
    fetch(`http://localhost/tarefas/api/tasks.php?id=${id}`, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            mostrarToast(data.message, 'success');
            obterTarefas();
        })
        .catch(error => {
            mostrarToast('Erro ao deletar tarefa.', 'danger');
        });
}

function visualizarTarefa(id) {
    tarefaIdAtual = id;
    fetch(`http://localhost/tarefas/api/tasks.php?id=${id}`)
        .then(response => response.json())
        .then(tarefa => {
            document.getElementById('visualizarTitulo').textContent = tarefa.titulo;
            document.getElementById('visualizarDescricao').textContent = tarefa.descricao;
            document.getElementById('visualizarStatus').textContent = tarefa.status === 'pending' ? 'Pendente' : 'Concluída';
            $('#modalVisualizarTarefa').modal('show');
        });
}

function mostrarModalEditar(id) {
    fetch(`http://localhost/tarefas/api/tasks.php?id=${id}`)
        .then(response => response.json())
        .then(tarefa => {
            tarefaIdAtual = id;
            document.getElementById('editarTitulo').value = tarefa.titulo;
            document.getElementById('editarDescricao').value = tarefa.descricao;
            document.getElementById('editarStatus').value = tarefa.status;
            $('#modalEditarTarefa').modal('show');
        });
}

function mostrarModalVisualizar() {
    $('#modalEditarTarefa').modal('hide');
    setTimeout(() => {
        $('#modalVisualizarTarefa').modal('show');
    }, 500);
}

function editarTarefa(e) {
    e.preventDefault();
    let novoTitulo = document.getElementById('editarTitulo').value;
    let novaDescricao = document.getElementById('editarDescricao').value;
    let novoStatus = document.getElementById('editarStatus').value;

    fetch(`http://localhost/tarefas/api/tasks.php?id=${tarefaIdAtual}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: novoTitulo, descricao: novaDescricao, status: novoStatus })
    })
        .then(response => response.json())
        .then(data => {
            mostrarToast(data.message, 'success');
            $('#modalEditarTarefa').modal('hide');
            obterTarefas();
        })
        .catch(error => {
            mostrarToast('Erro ao editar tarefa.', 'danger');
        });
}

function fecharModal() {
    $('#modalAdicionarTarefa').modal('hide');
    $('#modalVisualizarTarefa').modal('hide');
    $('#modalEditarTarefa').modal('hide');
}

document.getElementById('formAdicionarTarefa').addEventListener('submit', adicionarTarefa);
document.getElementById('formEditarTarefa').addEventListener('submit', editarTarefa);
window.onload = obterTarefas;
