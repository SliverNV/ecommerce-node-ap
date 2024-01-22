import { CategoriaApplicationExceptions } from "@modules/catalogo/application/exceptions/categoria.application.exception";
import { ProdutoApplicationExceptions } from "@modules/catalogo/application/exceptions/produto.application.exception";
import { AdicionarCategoriaProdutoUseCase } from "@modules/catalogo/application/use-cases/adicionar-categoria-produto/adicionar-categoria-produto.use-case";
import { RecuperarProdutoProps } from "@modules/catalogo/domain/produto/produto.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class AdicionarCategoriaProdutoExpressController extends ExpressController {

    private _adicionarCategoriaProdutoUseCase: AdicionarCategoriaProdutoUseCase;

    constructor(adicionarCategoriaProdutoUseCase: AdicionarCategoriaProdutoUseCase) {
        super();
        this._adicionarCategoriaProdutoUseCase = adicionarCategoriaProdutoUseCase;
    }

    async adicionarCategoria(request: Request, response: Response, next: NextFunction) {
        try {
            const produtoInputDTO: RecuperarProdutoProps = request.body as RecuperarProdutoProps;
            const categoriaProdutoAdicionado: boolean = await this._adicionarCategoriaProdutoUseCase.execute(produtoInputDTO);
            this.sendSuccessResponse(response, categoriaProdutoAdicionado); 
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

export { AdicionarCategoriaProdutoExpressController }