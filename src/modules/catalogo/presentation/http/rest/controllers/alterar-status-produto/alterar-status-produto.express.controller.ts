import { ProdutoApplicationExceptions } from "@modules/catalogo/application/exceptions/produto.application.exception";
import { AlterarStatusProdutoUseCase } from "@modules/catalogo/application/use-cases/alterar-status-produto/alterar-status-produto.use-case";
import { RecuperarProdutoProps } from "@modules/catalogo/domain/produto/produto.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class AlterarStatusProdutoExpressController extends ExpressController {

    private _alterarStatusProdutoUseCase: AlterarStatusProdutoUseCase;

    constructor(alterarStatusProdutoUseCase: AlterarStatusProdutoUseCase) {
        super();
        this._alterarStatusProdutoUseCase = alterarStatusProdutoUseCase;
    }

    async alterarStatus(request: Request, response: Response, next: NextFunction) {
        try {
            const produtoInputDTO: RecuperarProdutoProps = request.body as RecuperarProdutoProps;
            const produtoAtualizado: boolean = await this._alterarStatusProdutoUseCase.execute(produtoInputDTO);
            this.sendSuccessResponse(response, produtoAtualizado);
        } catch (error) {
            if (error instanceof ProdutoApplicationExceptions.ProdutoNaoEncontrado) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            next(error);
        }
    }
}

export { AlterarStatusProdutoExpressController }