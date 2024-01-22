import express from "express";
import { adicionarCategoriaProdutoController, alterarStatusProdutoController, atualizarProdutoController, deletarProdutoController, inserirProdutoController, recuperarProdutoPorIdController, recuperarProdutosPorCategoriaController, recuperarTodosProdutosController, removerCategoriaProdutoController } from "./controllers";
import { contentTypeMiddleware } from "@main/presentation/http/middlewares/content-type.middleware";
import { authUsuario } from "@main/presentation/http/middlewares/auth-usuario.middleware";
import { validaInputInserirProduto } from "../middlewares/valida-input-inserir-produto.middleware";
import { validaInputAtualizarProduto } from "../middlewares/valida-input-atualizar-produto.middleware";


const produtoRouter = express.Router();

produtoRouter.get(
    '/:id',
    (request, response, next) => recuperarProdutoPorIdController.recuperar(request, response, next)
);

produtoRouter.get(
    '/',
    (request, response, next) =>  recuperarTodosProdutosController.recuperar(request, response, next)
);

produtoRouter.post(
    '/',
    authUsuario(['ADMINISTRADOR']),
    contentTypeMiddleware,
    validaInputInserirProduto,
    (request, response, next) =>  inserirProdutoController.inserir(request, response, next)
);

produtoRouter.put(
    '/:id',
    authUsuario(['ADMINISTRADOR']),
    contentTypeMiddleware,
    validaInputAtualizarProduto,
    (request, response, next) => atualizarProdutoController.atualizar(request, response, next)
);

produtoRouter.delete(
    '/:id',
    authUsuario(['ADMINISTRADOR']),
    (request, response, next) => deletarProdutoController.deletar(request, response, next)
);

produtoRouter.post(
    '/:add-category/:id',
    authUsuario(['ADMINISTRADOR']),
    contentTypeMiddleware,
    (request, response, next) => adicionarCategoriaProdutoController.adicionarCategoria(request, response, next)
);

produtoRouter.delete(
    '/remove-category/:id/:categoryId',
    authUsuario(['ADMINISTRADOR']),
    contentTypeMiddleware,
    (request, response, next) => removerCategoriaProdutoController.removerCategoria(request, response, next)
);

produtoRouter.get(
    '/category/:id',
    (request, response, next) => recuperarProdutosPorCategoriaController.recuperarPorCategoria(request, response, next)
);

produtoRouter.put(
    '/:id/status',
    authUsuario(['ADMINISTRADOR']),
    contentTypeMiddleware,
    (request, response, next) => alterarStatusProdutoController.alterarStatus(request, response, next)
);

export { produtoRouter }