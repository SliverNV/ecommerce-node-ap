import { IProduto, CriarProdutoProps, RecuperarProdutoProps } from "./produto.types" ;
import { NomeProdutoTamanhoMinimoInvalido, NomeProdutoTamanhoMaximoInvalido, DescricaoProdutoTamanhoMinimoInvalido, DescricaoProdutoTamanhoMaximoInvalido,
    PrecoProdutoValorMinimoInvalido, ProdutoNumeroMinimoCategoriaInvalido, ProdutoNumeroMaximoCategoriaInvalido } from "./produto.exception";
import { Entity } from "../../../shared/domain/entity";

class Produto extends Entity<IProduto> implements IProduto {

    ///////////////////////
	//Atributos de Classe//
	///////////////////////

    private _nome: string;
    private _descricao: string;
    private _valor: number;
    private _pNumero: number;
    
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

    public get pNumero(): number {
        return this._pNumero;
    }
    private set pNumero(value: number) {
        if (value < 1) {
            throw new ProdutoNumeroMinimoCategoriaInvalido();
        }

        if (value > 3) {
            throw new ProdutoNumeroMaximoCategoriaInvalido();
        }

        this._pNumero = value;
    }

    //////////////
	//Construtor//
	//////////////

    private constructor(produto:IProduto){
        super(produto.id);
        this.nome = produto.nome;
        this.descricao = produto.descricao;
        this.valor = produto.valor;
        this.pNumero = produto.pNumero;
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

}

export { Produto }