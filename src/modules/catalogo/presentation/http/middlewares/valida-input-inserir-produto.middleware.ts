import { HttpErrors } from "@shared/presentation/http/http.error";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const CategoriaSchema = z.object({
    id: z.string().uuid(),
    nome: z.string().min(3).max(50)
}).strict();

const InserirProdutoSchema = z.object({
    nome: z.string().min(5).max(50),
    descricao: z.string().min(10).max(200),
    valor: z.number().min(0),
    categorias: z.array(CategoriaSchema).min(1).max(3)
}).strict();

const validaInputInserirProdutoMiddleware = (request: Request, response: Response, next: NextFunction) => {
    try {
        InserirProdutoSchema.parse(request.body);
        next();
    } catch (error: any) {
        const validacaoError = (error);
        error = new HttpErrors.BadRequestError({message: validacaoError.message});
        next(error);
    }
}

export { validaInputInserirProdutoMiddleware as validaInputInserirProduto }