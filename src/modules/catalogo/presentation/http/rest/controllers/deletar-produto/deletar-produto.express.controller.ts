import { ProdutoApplicationExceptions } from "@modules/catalogo/application/exceptions/produto.application.exception";
import { DeletarProdutoUseCase } from "@modules/catalogo/application/use-cases/deletar-produto/deletar-produto.use-case";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class DeletarProdutoExpressController extends ExpressController {

    private _deletarProdutoUseCase: DeletarProdutoUseCase;

    constructor(deletarProdutoUseCase: DeletarProdutoUseCase) {
        super();
        this._deletarProdutoUseCase = deletarProdutoUseCase;
    }
    
    async deletar(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid: string = request.params.id;
            const produtoDeletedo: boolean = await this._deletarProdutoUseCase.execute(uuid);
            this.sendSuccessResponse(response, produtoDeletedo);
        } catch (error) {
            if (error instanceof ProdutoApplicationExceptions.ProdutoNaoEncontrado) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            next(error);
        }
    }
}

export { DeletarProdutoExpressController }