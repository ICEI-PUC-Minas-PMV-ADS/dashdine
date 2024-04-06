
const Pedido = require('../models/Pedido');
const Cardapio = require('../models/Cardapio');
const { processarPagamento } = require('../services/pagamentoService');

// Pega histórico de pedidos de um usuário por id
const pegaUserPedidos = async (req, res) => {
    try {
        const id = req.params.id;
        const pegaPedidos = await Pedido.find({ "usuario": id }, "-__v")
            .populate({
                path: 'itensPedido.itemId',
                select: '-createdAt -updatedAt -ativo -__v'
            });
        if (!pegaPedidos || pegaPedidos.length === 0) return res.status(204).json({ 'Mensagem': 'Sem pedidos registrados' });

        const pedidosComItens = pegaPedidos.map(pedido => {
            const pedidoFormatado = pedido.toObject();
            const detalhesItensUnicos = new Map();
            pedido.itensPedido.forEach(item => {
                const itemId = item.itemId._id.toString();
                if (!detalhesItensUnicos.has(itemId)) {
                    detalhesItensUnicos.set(itemId, {
                        itemId: itemId,
                        quantidade: item.quantidade,
                        detalhesItem: {
                            nome: item.itemId.nome,
                            descricao: item.itemId.descricao,
                            valor: item.itemId.valor
                        }
                    });
                }
            });
            pedidoFormatado.itensPedido = [...detalhesItensUnicos.values()];
            return pedidoFormatado;
        });

        const { startIndex, endIndex } = req.paginacao;
        const pedidos = pedidosComItens.slice(startIndex, endIndex);

        return res.status(200).json({ pedidos, Total: pedidosComItens.length });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro interno.' });
    }
}
// Pega pedidos com status em confirmação
const pegaPedidosConf = async (req, res) => {
    try {
        const pegaPedidos = await Pedido.find({ statusConfirmacao: "Aguardando confirmação" }, "-__v")
            .populate({
                path: 'itensPedido.itemId',
                select: '-createdAt -updatedAt -ativo -__v'
            })
            .populate({
                path: 'usuario',
                select: '-senha -__v -endereco -telefone -cargos -refreshToken -createdAt -updatedAt'
            });
        if (!pegaPedidos || pegaPedidos.length === 0) return res.status(204).json({ 'Mensagem': 'Sem pedidos aguardando confirmação' });
        
        // Mapeia os pedidos para incluir detalhes únicos dos itens de pedido
        const pedidosComItens = pegaPedidos.map(pedido => {
            const pedidoFormatado = pedido.toObject();
            const detalhesItensUnicos = new Map();
            pedido.itensPedido.forEach(item => {
                if (item.itemId) { // Verifica se itemId está definido
                    const itemId = item.itemId._id.toString();
                    if (!detalhesItensUnicos.has(itemId)) {
                        detalhesItensUnicos.set(itemId, {
                            itemId: itemId,
                            quantidade: item.quantidade,
                            detalhesItem: {
                                nome: item.itemId.nome,
                                descricao: item.itemId.descricao,
                                valor: item.itemId.valor
                            }
                        });
                    }
                }
            });
            pedidoFormatado.itensPedido = [...detalhesItensUnicos.values()];
            return pedidoFormatado;
        });

        const { startIndex, endIndex } = req.paginacao;
        const pedidos = pedidosComItens.slice(startIndex, endIndex);

        return res.status(200).json({ pedidos, Total: pedidosComItens.length });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erro interno.' });
    }
}
// Criar Pedido
const criarPedido = async (req, res) => {
    try {
        const { itensPedido, endereco, telefone, precoTotal, usuario } = req.body;

        const itensExistentes = await Cardapio.find({ _id: { $in: itensPedido.map(item => item.itemId) } });
        if (itensExistentes.length !== itensPedido.length) return res.status(400).json({ success: false, error: 'Um ou mais itens do pedido não foram encontrados no cardápio' });

        const invalidQuantities = itensPedido.filter(item => typeof item.quantidade !== 'number' || item.quantidade <= 0);
        if (invalidQuantities.length > 0) return res.status(400).json({ success: false, error: 'Você está tentando comprar ou vender seu lanche?' });

        const novoPedido = {
            itensPedido: itensPedido.map(item => ({ itemId: item.itemId, quantidade: item.quantidade })),
            endereco,
            telefone,
            statusPagamento: 'Aguardando pagamento',
            statusConfirmacao: 'Aguardando confirmação',
            precoTotal,
            usuario
        };

        // Cria o pedido no banco de dados
        const pedido = await Pedido.create(novoPedido);

        res.status(201).json({ success: true, data: pedido, codigo: pedido.codigo })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// Processar pagamento
const pagarPedido = async (req, res) => {
    try {
        const id = req.params.id;
        const pedido = await Pedido.findById(id, "-__v");

        if (!pedido) return res.status(404).json({ success: false, error: 'Pedido não encontrado' });

        if (pedido.statusPagamento === 'Confirmado') return res.status(400).json({ success: false, message: 'Este pedido já foi pago anteriormente' });

        const resultadoPagamento = await processarPagamento(pedido);

        if (resultadoPagamento.success) {
            pedido.statusPagamento = 'Confirmado';
            await pedido.save();

            res.status(201).json({ success: true, message: resultadoPagamento.message, data: pedido });
        } else {
            pedido.statusPagamento = 'Erro de pagamento';
            await pedido.save();

            res.status(400).json({ success: false, message: resultadoPagamento.message });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// Controller para o proprietário confirmar o pedido
const confirmarPedido = async (req, res) => {
    try {
        const id = req.params.id;
        const pedido = await Pedido.findById(id);

        if (!pedido) return res.status(404).json({ success: false, error: 'Pedido não encontrado' });

        pedido.statusConfirmacao = 'Confirmado';
        await pedido.save();

        res.status(201).json({ success: true, message: 'Pedido confirmado com sucesso', data: pedido });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// Controller para o proprietário cancelar o pedido
const cancelarPedido = async (req, res) => {
    try {
        const id = req.params.id;

        const pedido = await Pedido.findById(id);

        if (!pedido) {
            return res.status(404).json({ success: false, error: 'Pedido não encontrado' });
        }

        pedido.statusConfirmacao = 'Cancelado';
        await pedido.save();

        res.status(201).json({ success: true, message: 'Pedido cancelado com sucesso', data: pedido });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// Controller para o proprietário liberar o pedido
const liberarPedido = async (req, res) => {
    try {
        const id = req.params.id;

        const pedido = await Pedido.findById(id);

        if (!pedido) return res.status(404).json({ success: false, error: 'Pedido não encontrado' });

        pedido.statusConfirmacao = 'Liberado';
        await pedido.save();

        res.status(201).json({ success: true, message: 'Pedido liberado com sucesso', data: pedido });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// Controller para o proprietário informar que o pedido está em trânsito
const informarEmTransito = async (req, res) => {
    try {
        const id = req.params.id;

        const pedido = await Pedido.findById(id);

        if (!pedido) return res.status(404).json({ success: false, error: 'Pedido não encontrado' });

        pedido.statusConfirmacao = 'Em transito';
        await pedido.save();

        res.status(201).json({ success: true, message: 'Pedido informado como em trânsito com sucesso', data: pedido });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
// Controller para o proprietário/cliente informar que o pedido foi entregue
const informarEntregue = async (req, res) => {
    try {
        const id = req.params.id;

        const pedido = await Pedido.findById(id);

        if (!pedido) return res.status(404).json({ success: false, error: 'Pedido não encontrado' });

        pedido.statusConfirmacao = 'Entregue';
        await pedido.save();

        res.status(201).json({ success: true, message: 'Pedido informado como entregue com sucesso', data: pedido });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
module.exports = {
    pegaUserPedidos,
    pegaPedidosConf,
    criarPedido,
    pagarPedido,
    confirmarPedido,
    cancelarPedido,
    liberarPedido,
    informarEmTransito,
    informarEntregue
}