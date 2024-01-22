import { ProdutoApplicationExceptions } from "@modules/catalogo/application/exceptions/produto.application.exception";
import { AtualizarProdutoUseCase } from "@modules/catalogo/application/use-cases/atualizar-produto/atualizar-produto.use-case";
import { RecuperarProdutoProps } from "@modules/catalogo/domain/produto/produto.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class AtualizarProdutoExpressController extends ExpressController {

    private _atualizarProdutoUseCase: AtualizarProdutoUseCase;

    constructor(atualizarProdutoUseCase: AtualizarProdutoUseCase) {
        super();
        this._atualizarProdutoUseCase = atualizarProdutoUseCase;
    }

    async atualizar(request: Request, response: Response, next: NextFunction) {
        try {
            const produtoInputDTO: RecuperarProdutoProps = request.body as RecuperarProdutoProps;
            const produtoAtualizado: boolean = await this._atualizarProdutoUseCase.execute(produtoInputDTO);
            this.sendSuccessResponse(response, produtoAtualizado);
        } catch (error) {
            if (error instanceof ProdutoApplicationExceptions.ProdutoNaoEncontrado) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            next(error);
        }
    }
}

export { AtualizarProdutoExpressController }