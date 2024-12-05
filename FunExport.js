let ListasDeCompras = [
    { nome: 'Arroz', categoria: 'Alimentos', quantidade: 2, comprado: true },
    { nome: 'Feijão', categoria: 'Alimentos', quantidade: 1, comprado: false },
    { nome: 'Sabonete', categoria: 'Higiene', quantidade: 5, comprado: true },
    { nome: 'Detergente', categoria: 'Limpeza', quantidade: 3, comprado: false },
    { nome: 'Pasta de Dente', categoria: 'Higiene', quantidade: 2, comprado: true },
    { nome: 'Leite', categoria: 'Alimentos', quantidade: 3, comprado: false }
];

export function adicionarItem(nomeItem, quantidade, categoria) {
    const nomeDoItem = nomeItem
    const quantidadeDoItem = quantidade
    const categoriaDoItem = categoria
    if (nomeDoItem && quantidadeDoItem && categoriaDoItem) {
        ListasDeCompras.push({
            nome: nomeDoItem,
            quantidade: parseInt(quantidadeDoItem),
            categoria: categoriaDoItem,
            comprado: false
        });
    } else {
        alert("Todos os campos são obrigatórios.")

    }
}

export function listarItens(ordem) {
    let OrdemASerListada = ordem
    if (OrdemASerListada == 'alfabetica') {
        ListasDeCompras.sort((a, b) => a.nome.localeCompare(b.nome))
        return console.table(ListasDeCompras)
    } else if(OrdemASerListada == 'categoria') {
        ListasDeCompras.sort((a,b) => a.categoria.localeCompare(b.categoria))
        return console.table(ListasDeCompras)
    } else if (OrdemASerListada == 'quantidade') {
        ListasDeCompras.sort((a, b) => a.quantidade - b.quantidade)
        return console.table(ListasDeCompras)
        }
}


export function listarItensPorCategoria(categoria){
    let produtosFiltrados = ListasDeCompras.filter(produtos => produtos.categoria === categoria)
    return console.table(produtosFiltrados)
}

export function listarItensPorStatus(status) {
    let produtosFiltrados = ListasDeCompras.filter(produtos => produtos.comprado === status)
    return console.table(produtosFiltrados)
}

export function editarLista(nomeItemASerMudado, novosDetalhes) {
    const itemMudar = ListasDeCompras.findIndex(item => item.nome === nomeItemASerMudado)
    if (itemMudar !== -1) {
        ListasDeCompras[itemMudar] = { ...ListasDeCompras[itemMudar], ...novosDetalhes }
        return ListasDeCompras[itemMudar]
    }
    return null;
}

export function removerItem (nome){
    ListasDeCompras = ListasDeCompras.filter(lista => lista.nome != nome)
    console.log(`${nome} foi removido com sucesso`)
}

export function marcarComoComprado(itemComprado){
    const item = ListasDeCompras.find(item => item.nome === itemComprado);
    if (item) {
        item.comprado = true;
        console.log(`${item.nome} foi marcado como ${item.comprado ? 'true' : 'false'}.`);
    } else {
        console.log('Item não encontrado.');
    }
    
    function atualizarLista() {
        console.clear();
        ListasDeCompras.forEach(item => {
            const status = item.comprado ? '✔️' : '❌';
            const cor = item.comprado ? '\x1b[32m' : '\x1b[31m'; 
            console.log(`${cor}${status} ${item.nome} - Quantidade: ${item.quantidade}, Categoria: ${item.categoria}\x1b[0m`);
        });
    }
    atualizarLista() 
}
export function quantidadesDeItens (){
    const resumo = {
        totalItens: ListasDeCompras.length,
        categorias: {},
        comprados: 0,
        naoComprados:0,
    }

    ListasDeCompras.forEach(item => {
        if (!resumo.categorias[item.categoria]) {
            resumo.categorias[item.categoria] = 0;
        }
        resumo.categorias[item.categoria] += item.quantidade;

        if (item.comprado){
            resumo.comprados += item.quantidade;
        } else {
            resumo.naoComprados += item.quantidade;
        }
    })
    return resumo
}