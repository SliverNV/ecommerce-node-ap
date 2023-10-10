import { Produto } from "../domain/produto/produto.entity";
import { IProduto, RecuperarProdutoProps } from "../domain/produto/produto.types";
import { ProdutoComCategoriaPrisma } from "@shared/infra/database/prisma.types";
import { Categoria } from "../domain/categoria/categoria.entity";
import { CategoriaMap } from "./categoria.map";

class ProdutoMap {
    
    public static toDTO(produto: Produto): IProduto {
        return {
            id: produto.id,
            nome: produto.nome,
            descricao: produto.descricao,
            valor: produto.valor,
            categorias: produto.categorias,
            dataCriacao: produto.dataCriacao,
            dataAtualizacao: produto.dataAtualizacao,
            dataExclusao: produto.dataExclusao
        }
    }

    public static toDomain(produto: RecuperarProdutoProps): Produto {
        return Produto.recuperar(produto);
    }

    public static fromPrismaModelToDomain(produto: ProdutoComCategoriaPrisma): Produto {

        const categorias: Array<Categoria> = [];

        produto.categorias.map(
            (categoria) => {
                categorias.push(
                    CategoriaMap.fromPrismaModelToDomain(categoria.categoria)
                )
            }
        );

        return this.toDomain(
            {
                id: produto.id,
                nome: produto.nome,
                descricao: produto.descricao,
                valor: produto.valor,
                categorias: categorias,
                dataCriacao: produto.dataCriacao,
                dataAtualizacao: produto.dataAtualizacao,
                dataExclusao: produto.dataExclusao
            }
        );
    }

}

export { ProdutoMap };
