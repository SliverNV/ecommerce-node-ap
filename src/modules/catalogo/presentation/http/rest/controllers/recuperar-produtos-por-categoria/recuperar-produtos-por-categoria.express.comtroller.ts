import { CategoriaApplicationExceptions } from "@modules/catalogo/application/exceptions/categoria.application.exception";
import { RecuperarProdutosPorCategoriaUseCase } from "@modules/catalogo/application/use-cases/recuperar-produtos-por-categoria/recuperar-produtos-por-categoria.use-case";
import { IProduto } from "@modules/catalogo/domain/produto/produto.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class RecuperarProdutosPorCategoriaExpressController extends ExpressController {

    private _recuperarProdutosPorCategoriaUseCase: RecuperarProdutosPorCategoriaUseCase;

    constructor(recuperarProdutosPorCategoriaUseCase: RecuperarProdutosPorCategoriaUseCase) {
        super();
        this._recuperarProdutosPorCategoriaUseCase = recuperarProdutosPorCategoriaUseCase;
    }

    async recuperarPorCategoria(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const listaProdutosDTO: Array<IProduto> = await this._recuperarProdutosPorCategoriaUseCase.execute(uuid);
            this.sendSuccessResponse(response,listaProdutosDTO);
        } catch (error) {
            if (error instanceof CategoriaApplicationExceptions.CategoriaNaoEncontrada) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            next(error);
        }
    }
}

export { RecuperarProdutosPorCategoriaExpressController }