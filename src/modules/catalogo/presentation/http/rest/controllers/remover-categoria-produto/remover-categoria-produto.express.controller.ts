import { CategoriaApplicationExceptions } from "@modules/catalogo/application/exceptions/categoria.application.exception";
import { ProdutoApplicationExceptions } from "@modules/catalogo/application/exceptions/produto.application.exception";
import { RemoverCategoriaProdutoUseCase } from "@modules/catalogo/application/use-cases/remover-categoria-produto/remover-categoria-produto.use-case";
import { RecuperarProdutoProps } from "@modules/catalogo/domain/produto/produto.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class RemoverCategoriaProdutoExpressController extends ExpressController {

    private _removerCategoriaProdutoUseCase: RemoverCategoriaProdutoUseCase;

    constructor(removerCategoriaProdutoUseCase: RemoverCategoriaProdutoUseCase) {
        super();
        this._removerCategoriaProdutoUseCase = removerCategoriaProdutoUseCase;
    }

    async removerCategoria(request: Request, response: Response, next: NextFunction) {
        try {
            const produtoInputDTO: RecuperarProdutoProps = request.body as RecuperarProdutoProps;
            const categoriaProdutoRemovida: boolean = await this._removerCategoriaProdutoUseCase.execute(produtoInputDTO);
            this.sendSuccessResponse(response, categoriaProdutoRemovida); 
        } catch (error) {
            if (error instanceof CategoriaApplicationExceptions.CategoriaNaoEncontrada) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            if (error instanceof ProdutoApplicationExceptions.ProdutoNaoEncontrado) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            next(error);
        }
    }
}

export { RemoverCategoriaProdutoExpressController }