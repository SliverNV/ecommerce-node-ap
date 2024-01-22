import { ProdutoApplicationExceptions } from "@modules/catalogo/application/exceptions/produto.application.exception";
import { RecuperarProdutoPorIdUseCase } from "@modules/catalogo/application/use-cases/recuperar-produto-por-id/recuperar-produto-por-id.use-case";
import { IProduto } from "@modules/catalogo/domain/produto/produto.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";

class RecuperarProdutoPorIdExpressController extends ExpressController {

    private _recuperarProdutoPorIdUseCase: RecuperarProdutoPorIdUseCase;
 
    constructor(recuperarProdutoPorIdUseCase: RecuperarProdutoPorIdUseCase) {
        super();
        this._recuperarProdutoPorIdUseCase = recuperarProdutoPorIdUseCase;
    }

    async recuperar(request: Request, response: Response, next: NextFunction) {
        try {
            const uuid:string = request.params.id;
            const ProductDTO: IProduto = await this._recuperarProdutoPorIdUseCase.execute(uuid);
            this.sendSuccessResponse(response, ProductDTO);
        } catch (error) {
            if (error instanceof ProdutoApplicationExceptions.ProdutoNaoEncontrado) {
                error = new HttpErrors.NotFoundError({message: error.message});
            }
            next(error);
        }
    } 
}

export { RecuperarProdutoPorIdExpressController }