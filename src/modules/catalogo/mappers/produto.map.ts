import { Produto } from "../domain/produto.entity"
import { ICategoria, RecuperarCategoriaProps } from "../domain/categoria.types";
import { IProduto } from "../domain/produto.types";

class ProdutoMap {

    public static toDTO(produto: Produto): IProduto {
        return {
          id: produto.id,
          nome: produto.nome
          descricao: string;
          valor: number;
          pNumero: number;
        }
    }

    public static toDomain(produto: RecuperarCategoriaProps): Produto {
        return Produto.recuperar(produto);
    }

}

export { ProdutoMap }