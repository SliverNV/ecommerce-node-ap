<<<<<<< HEAD
import { Produto } from "../domain/produto/produto.entity"
=======
import { Produto } from "../domain/produto/produto.entity";
>>>>>>> 29ac4bd (Commit refatorando e configurando)
import { IProduto, RecuperarProdutoProps } from "../domain/produto/produto.types";

class ProdutoMap {

    public static toDTO(produto: Produto): IProduto {
        return {
          id: produto.id,
          nome: produto.nome,
          descricao: produto.descricao,
          valor: produto.valor,
          categorias: produto.categorias
        }
    }

    public static toDomain(produto: RecuperarProdutoProps): Produto {
        return Produto.recuperar(produto);
    }
    
}

<<<<<<< HEAD
export { ProdutoMap }
=======
export { ProdutoMap };
>>>>>>> 29ac4bd (Commit refatorando e configurando)
