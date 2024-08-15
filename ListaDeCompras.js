import { adicionarItem, listarItens, listarItensPorCategoria, listarItensPorStatus, editarLista, removerItem, marcarComoComprado, quantidadesDeItens } from './FunExport';

function main() {
    let exite = false;
    while (!exite) {
        console.log(`=========== Funções ===========
                        [1] - Adicionar item;
                        [2] - Listar lista;
                        [3] - Editar lista;
                        [4] - Remover item;
                        [5] - Marcar como comprado;
                        [6] - Resumo da lista;
                        [7] - Fechar programa.`)

        const comando = prompt('Digite o número de sua escolha: ')

        switch (comando) {
            case '1':
                let nomeItem = prompt('Qual o item que você quer adcionar: ')
                let quantidade = Number(prompt('Quantos você quer comprar: '))
                let categoria = prompt('Qual a categoria do item: ')
                adicionarItem(nomeItem, quantidade, categoria)
                break;
            case '2':
                let escolha = prompt(`Escolha qual ordem você quer listar a lista: 
                    [1]_ Ordem alfabetica;
                    [2]_ Ordem por categoria;
                    [3]_ Ordem por quantidade;
                    [4]_ Filtrar por: categoria ou status
                    `)
                let ordem = ''
                if (escolha == '1') {
                    ordem = 'alfabetica'
                    listarItens(ordem);
                } else if (escolha == '2') {
                    ordem = 'categoria'
                    listarItens(ordem);
                } else if (escolha == '3') {
                    ordem = 'quantidade'
                    listarItens(ordem);
                } else if (escolha == '4') {
                    let filtro = prompt(`Pesquisar produtos por:
                        [01] Filtrar por categoria;
                        [02] Filtrar por status (comprado/não comprado).
                        `)
                    if (filtro == '01') {
                        let qualCategoria = prompt('Qual categoria de produtos você quer exibir: ')
                        listarItensPorCategoria(qualCategoria);
                    } else if (filtro == '02') {
                        let perfil = prompt(`Mostrar os intens comprados[c] ou os não comprados[nc]? `)
                        let status = perfil === 'c' ? true : false;
                        listarItensPorStatus(status);
                    }
                } else {
                    console.log('Opção inválida!')
                }
                break;
            case '3':
                const nomeItemASerMudado = prompt('Qual o nome do item que você quer editar: ')
                const novoNome = prompt('Digite o novo nome (deixe em branco para manter o mesmo): ')
                const novaQuantidade = prompt('Digite o nova quantidade (deixe em branco para manter o mesmo): ')
                const novaCategoria = prompt('Digite o nova categoria (deixe em branco para manter o mesmo): ')
                const atualizado = {}
                if (novoNome) atualizado.nome = novoNome;
                if (novaQuantidade) atualizado.quantidade = novaQuantidade
                if (novaCategoria) atualizado.categoria = novaCategoria
                const usuarioAtualizado = editarLista(nomeItemASerMudado, atualizado);
                if (usuarioAtualizado) {
                    console.log('Usuário atualizado com sucesso!', usuarioAtualizado);
                } else {
                    console.log('Usuário não encontrado!');
                }
                break;
            case '4':
                const itemASerRemovido = prompt(`Qual item você quer excluir: `)
                const confirmação = prompt(`Certeza que quer remover esse item [sim/nao]: `)
                if (confirmação == 'sim') {
                    removerItem(itemASerRemovido);
                } else if (confirmação == 'nao') {
                    console.log('OK! Item não removido')
                }
                break;
            case '5':
                const itemComprado = prompt('Qual o nome do item está comprado: ')
                marcarComoComprado(itemComprado)
                break;
            case '6':
                const resumo = quantidadesDeItens()
                console.log('Resumo da Lista de Compras:');
                console.log(`Total de Itens: ${resumo.totalItens}`);
                console.log('Itens por Categoria:');
                for (const [categorias, quantidade] of Object.entries(resumo.categorias)) {
                    console.log(`- ${categorias}: ${quantidade}`);
                }
                console.log(`Total de Itens Comprados: ${resumo.comprados}`);
                console.log(`Total de Itens Não Comprados: ${resumo.naoComprados}`);
                break;
            case '7':
                exite = true
                break;

        }
    }
}

main()