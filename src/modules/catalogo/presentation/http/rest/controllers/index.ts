import { adicionarCategoriaProdutoUseCase, alterarStatusProdutoUseCase, atualizarCategoriaUseCase, atualizarProdutoUseCase, deletarCategoriaUseCase, deletarProdutoUseCase, inserirCategoriaUseCase, inserirProdutoUseCase, recuperarCategoriaPorIdUseCase, recuperarProdutoPorIdUseCase, recuperarProdutosPorCategoriaUseCase, recuperarTodasCategoriasUseCase, recuperarTodosProdutosUseCase, removerCategoriaProdutoUseCase } from "@modules/catalogo/application/use-cases";
import { RecuperarCategoriaPorIdExpressController } from "./recuperar-categoria-por-id/recuperar-categoria-por-id.express.controller";
import { RecuperarTodasCategoriaExpressController } from "./recuperar-todas-categorias/recuperar-todas-categorias.express.controller";
import { InserirCategoriaExpressController } from "./inserir-categoria/inserir-categoria.express.controller";
import { AtualizarCategoriaExpressController } from "./atualizar-categoria/atualizar-categoria.express.controller";
import { DeletarCategoriaExpressController } from "./deletar-categoria/deletar-categoria.express.controller";
import { RecuperarTodosProdutosExpressController } from "./recuperar-todos-produtos/recuperar-todos-produtos.express.controller";
import { AdicionarCategoriaProdutoExpressController } from "./adicionar-categoria-produto/adicionar-categoria-produto.express.controller";
import { AtualizarProdutoExpressController } from "./atualizar-produto/atualizar-produto.express.controller";
import { AlterarStatusProdutoExpressController } from "./alterar-status-produto/alterar-status-produto.express.controller";
import { DeletarProdutoExpressController } from "./deletar-produto/deletar-produto.express.controller";
import { InserirProdutoExpressController } from "./inserir-produto/inserir-produto.express.controller";
import { RecuperarProdutoPorIdExpressController } from "./recuperar-produto-por-id/recuperar-produto-por-id.express.controller";
import { RecuperarProdutosPorCategoriaExpressController } from "./recuperar-produtos-por-categoria/recuperar-produtos-por-categoria.express.comtroller";
import { RemoverCategoriaProdutoExpressController } from "./remover-categoria-produto/remover-categoria-produto.express.controller";

const recuperarCategoriaPorIdController = new RecuperarCategoriaPorIdExpressController(recuperarCategoriaPorIdUseCase);
const recuperarTodasCategoriasController = new RecuperarTodasCategoriaExpressController(recuperarTodasCategoriasUseCase);
const inserirCategoriaController = new InserirCategoriaExpressController(inserirCategoriaUseCase);
const atualizarCategoriaController = new AtualizarCategoriaExpressController(atualizarCategoriaUseCase);
const deletarCategoriaController = new DeletarCategoriaExpressController(deletarCategoriaUseCase);

const adicionarCategoriaProdutoController = new AdicionarCategoriaProdutoExpressController(adicionarCategoriaProdutoUseCase);
const alterarStatusProdutoController = new AlterarStatusProdutoExpressController(alterarStatusProdutoUseCase);
const atualizarProdutoController = new AtualizarProdutoExpressController(atualizarProdutoUseCase);
const deletarProdutoController = new DeletarProdutoExpressController(deletarProdutoUseCase);
const inserirProdutoController = new InserirProdutoExpressController(inserirProdutoUseCase);
const recuperarProdutoPorIdController = new RecuperarProdutoPorIdExpressController(recuperarProdutoPorIdUseCase);
const recuperarTodosProdutosController = new RecuperarTodosProdutosExpressController(recuperarTodosProdutosUseCase);
const recuperarProdutosPorCategoriaController = new RecuperarProdutosPorCategoriaExpressController(recuperarProdutosPorCategoriaUseCase);
const removerCategoriaProdutoController = new RemoverCategoriaProdutoExpressController(removerCategoriaProdutoUseCase);




export {
    recuperarCategoriaPorIdController,
    recuperarTodasCategoriasController,
    inserirCategoriaController,
    atualizarCategoriaController,
    deletarCategoriaController,
    adicionarCategoriaProdutoController,
    alterarStatusProdutoController,
    atualizarProdutoController,
    deletarProdutoController,
    inserirProdutoController,
    recuperarProdutoPorIdController,
    recuperarTodosProdutosController,
    recuperarProdutosPorCategoriaController,
    removerCategoriaProdutoController
}