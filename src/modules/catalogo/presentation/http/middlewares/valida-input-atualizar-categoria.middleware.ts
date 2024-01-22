import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const AtualizarCategoriaSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(3).max(50)
}).strict();

const validaInputAtualizarCategoriaMiddleware = (request: Request, response: Response, next: NextFunction) => {
    try {
      AtualizarCategoriaSchema.parse(request.body);
        next();
    } catch (error: any) {
        const validacaoError = (error);
        error = new HttpErrors.BadRequestError({message: validacaoError.message});
        next(error);
    }
}

export { validaInputAtualizarCategoriaMiddleware as validaInputAtualizarCategoria }