import { InserirProdutoUseCase } from "@modules/catalogo/application/use-cases/inserir-produto/inserir-produto.use-case";
import { CriarProdutoProps, IProduto } from "@modules/catalogo/domain/produto/produto.types";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { NextFunction, Request, Response } from "express";

class InserirProdutoExpressController extends ExpressController {

    private _inserirProdutoUseCase: InserirProdutoUseCase;

    constructor(inserirProdutoUseCase: InserirProdutoUseCase) {
      super();
      this._inserirProdutoUseCase = inserirProdutoUseCase;
    }

    async inserir(request: Request, response: Response, next: NextFunction) {
        try {
            const ProdutoInputDTO: CriarProdutoProps = request.body;
            const ProdutoOutputDTO: IProduto = await this._inserirProdutoUseCase.execute(ProdutoInputDTO);
            this.sendSuccessResponse(response,ProdutoOutputDTO);
        } catch (error) {
            next(error);
        }
    } 
}

export { InserirProdutoExpressController }