import { NextFunction, Request, Response } from "express";
import { ExpressController } from "@shared/presentation/http/express.controller";
import { ICategoria } from "@modules/catalogo/domain/categoria/categoria.types";
import { RecuperarCategoriaPorIdUseCase } from "@modules/catalogo/application/use-cases/recuperar-categoria-por-id/recuperar-categoria-por-id.use-case";

class RecuperarCategoriaPorIdExpressController extends ExpressController {

    private _recuperarCategoriaPorIdUseCase: RecuperarCategoriaPorIdUseCase;
 
    constructor(recuperarCategoriaPorIdUseCase: RecuperarCategoriaPorIdUseCase) {
        super();
        this._recuperarCategoriaPorIdUseCase = recuperarCategoriaPorIdUseCase;
    }
 
    async recuperar(request: Request, response: Response, next: NextFunction) {
      try {
        const uuid:string = request.params.id;
        const categoriaDTO: ICategoria = await this._recuperarCategoriaPorIdUseCase.execute(uuid);
        this.sendSuccessResponse(response,categoriaDTO);
      } catch (error) {
        next(error);
      }
    }
 
  }

export { RecuperarCategoriaPorIdExpressController }