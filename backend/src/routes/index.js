/* 
 Metodos HTTP: GET, PUT, POST, DELETE

 Tipos de Parametros:
    Query Params -> request.query (filtros, ordenação, paginação, ...)
    Route Params ->  request.params ( identificar um recurso na alteração ou remoção)
    Body -> request.body (Dados para criação ou alteração de um registro)
 */ 
//Express: micro-framework para as rotas da api//requisição de apenas a função 'Router' do express
import { Router } from 'express';
import DevController from '../controllers/DevController.js';
import SearchController from '../controllers/SearchController.js';

const routes = Router();

routes.get('/devs', DevController.index)
routes.post('/devs', DevController.store)
routes.get('/search', SearchController.index)
routes.put('/devs/:id', DevController.update);
routes.delete('/devs/:id', DevController.destroy);

export {routes};