<<<<<<< HEAD
import { IProduto, CriarProdutoProps, RecuperarProdutoProps } from "./produto.types" ;
import {
    NomeProdutoTamanhoMinimoInvalido, NomeProdutoTamanhoMaximoInvalido,
    DescricaoProdutoTamanhoMinimoInvalido, DescricaoProdutoTamanhoMaximoInvalido,
    PrecoProdutoValorMinimoInvalido, ProdutoNumeroMinimoCategoriaInvalido,
    ProdutoNumeroMaximoCategoriaInvalido } from "./produto.exception";
import { Entity } from "../../../../shared/domain/entity";
import { Categoria } from "../categoria/categoria.entity";
=======
import { ProdutoMap } from "@modules/catalogo/mappers/produto.map";
import { Entity } from "@shared/domain/entity";
import { Categoria } from "../categoria/categoria.entity";
import {
    DescricaoProdutoTamanhoMaximoInvalido,
    DescricaoProdutoTamanhoMinimoInvalido,
    NomeProdutoTamanhoMaximoInvalido,
    NomeProdutoTamanhoMinimoInvalido,
    PrecoProdutoValorMinimoInvalido,
    ProdutoNumeroMaximoCategoriaInvalido,
    ProdutoNumeroMinimoCategoriaInvalido
} from "./produto.exception";
import { CriarProdutoProps, IProduto, RecuperarProdutoProps } from "./produto.types";
>>>>>>> 29ac4bd (Commit refatorando e configurando)

class Produto extends Entity<IProduto> implements IProduto {

    ///////////////////////
	//Atributos de Classe//
	///////////////////////

    private _nome: string;
    private _descricao: string;
    private _valor: number;
    private _categorias: Array<Categoria>;
            
    ///////////////
	//Gets e Sets//
	///////////////

    public get nome(): string {
        return this._nome;
    }
    private set nome(value: string) {
        if (value.trim().length < 5) {
            throw new NomeProdutoTamanhoMinimoInvalido();
        }

        if (value.trim().length > 50) {
            throw new NomeProdutoTamanhoMaximoInvalido();
        }

        this._nome = value;
    }

    public get descricao(): string {
        return this._descricao;
    }
    private set descricao(value: string) {
        if (value.trim().length < 10) {
            throw new DescricaoProdutoTamanhoMinimoInvalido();
        }

        if (value.trim().length > 200) {
            throw new DescricaoProdutoTamanhoMaximoInvalido();
        }

        this._descricao = value;
    }

    public get valor(): number {
        return this._valor;
    }
    private set valor(value: number) {
        if (value < 0) {
            throw new PrecoProdutoValorMinimoInvalido();
        }

        this._valor = value;
    }

    public get categorias(): Array<Categoria> {
        return this._categorias;
    }
    private set categorias(value: Array<Categoria>) {
        if (value.length < 1) {
            throw new ProdutoNumeroMinimoCategoriaInvalido();
        }

        if (value.length > 3) {
            throw new ProdutoNumeroMaximoCategoriaInvalido();
        }

        this._categorias = value;
    }

    //////////////
	//Construtor//
	//////////////

    private constructor(produto:IProduto){
        super(produto.id);
        this.nome = produto.nome;
        this.descricao = produto.descricao;
        this.valor = produto.valor;
        this.categorias = produto.categorias;
    }

    /////////////////////////
    //Static Factory Method//
    /////////////////////////

    public static criar(props: CriarProdutoProps): Produto {
        return new Produto(props);
    }

    public static recuperar(props: RecuperarProdutoProps): Produto {
        return new Produto(props);
    }

<<<<<<< HEAD
}

export { Produto }
=======
    ///////////
    //Métodos//
    ///////////

    public toDTO(): IProduto {
        return ProdutoMap.toDTO(this);
    }

}

export { Produto };
>>>>>>> 29ac4bd (Commit refatorando e configurando)