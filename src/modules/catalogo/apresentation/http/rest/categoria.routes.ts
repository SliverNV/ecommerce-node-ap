import express from 'express';
import { recuperarCategoriaPorIdController } from './controllers';


const categoriaRouter = express.Router();

categoriaRouter.get(
    '/:id',
    (request, response, next) =>  recuperarCategoriaPorIdController.recuperar(request, response, next)
);


export { categoriaRouter };