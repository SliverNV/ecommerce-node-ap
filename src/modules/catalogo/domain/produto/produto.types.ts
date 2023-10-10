import { IDatasControle, KeysDatasControle } from "@shared/domain/date.types";
import { Categoria } from "../categoria/categoria.entity";

enum StatusProduto {
    ATIVO = "ATIVO",
    DESATIVO = "DESATIVO"
}

//Todos os atributos/propriedades que um produto deve ter no sistema
//Auxilia na criação de invariantes e modelos ricos
interface IProduto extends IDatasControle{
    id?: string;
    nome:string;
    descricao:string;
    valor: number;
    categorias: Array<Categoria>;
    status?: StatusProduto
}

//Atributos que são necessários para criar um produto 
//Tipo representa um dos estados do ciclo de vida da entidade
//Garantir a integridade dos dados de um objeto
type CriarProdutoProps = Omit<IProduto, "id" | KeysDatasControle>;

//Atributos que são necessários para recuperar uma categoria
//Tipo representa um dos estados do ciclo de vida da entidade
type RecuperarProdutoProps = IProduto & {
    id: NonNullable<IProduto['id']>
};

export {
    IProduto, 
    CriarProdutoProps,
    RecuperarProdutoProps,
    StatusProduto
}