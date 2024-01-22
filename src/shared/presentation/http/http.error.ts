class HttpError extends Error {
    statusCode: number;

    constructor(statusCode:number, message: string = '⚠️ Generic HTTP Error') {
        super(message);
        this.name = 'HttpError';
        this.statusCode = statusCode;
        this.message = message;
        Object.setPrototypeOf(this, HttpError.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

class BadRequestError extends HttpError {
    constructor( params?: {statusCode?: number, message?: string}) {
        const { statusCode, message} = params || {};
        super(statusCode || 400, message || '⚠️ Servidor não pode ou não irá processar a solicitação devido a um erro do cliente (por exemplo, sintaxe de solicitação malformada, enquadramento de mensagem de solicitação inválido ou solicitação de roteamento enganosa).');
        this.name = 'BadRequestError';
    }
}

class NotFoundError extends HttpError {
    constructor( params?: {statusCode?: number, message?: string}) {
        const { statusCode, message} = params || {};
        super(statusCode || 404, message || '⚠️ Servidor Não Conseguiu Encontrar o Recurso Solicitado.');
        this.name = 'NotFoundError';
    }
}

class UnsupportedMediaTypeError extends HttpError {
    constructor( params?: {statusCode?: number, message?: string}) {
        const { statusCode, message} = params || {};
        super(statusCode || 415, message || '⚠️ Servidor se Recusou a Aceitar a Requisição Porque o Formato do Payload Não é Um Formato Suportado.');
        this.name = 'UnsupportedMediaTypeError';
    }
}

class UnauthorizedError extends HttpError {
    constructor( params?: {statusCode?: number, message?: string}) {
        const { statusCode, message} = params || {};
        super(statusCode || 401, message || '⚠️ Solicitação do Cliente Não Foi Concluída Porque Não Possui Credenciais de Autenticação Válidas para o Recurso Solicitado.');
        this.name = 'UnauthorizedError';
    }
}

class ForbiddenError extends HttpError {
    constructor( params?: {statusCode?: number, message?: string}) {
        const { statusCode, message} = params || {};
        super(statusCode || 403, message || '⚠️ Servidor Entende a Solicitação, Mas Se Recusa a Autorizá-la.');
        this.name = 'ForbiddenError';
    }
}


const HttpErrors = {
    BadRequestError: BadRequestError,
    NotFoundError: NotFoundError,
    UnsupportedMediaTypeError: UnsupportedMediaTypeError,
    UnauthorizedError: UnauthorizedError,
    ForbiddenError: ForbiddenError
}

export { HttpError, HttpErrors }