import { faker } from '@faker-js/faker';
import { beforeAll, describe, expect, test } from 'vitest';
import { Categoria } from '../categoria/categoria.entity';
import { Produto } from './produto.entity';
import {
    DescricaoProdutoTamanhoMaximoInvalido,
    DescricaoProdutoTamanhoMinimoInvalido,
    NomeProdutoTamanhoMaximoInvalido,
    NomeProdutoTamanhoMinimoInvalido,
    PrecoProdutoValorMinimoInvalido,
    ProdutoNumeroMaximoCategoriaInvalido,
    ProdutoNumeroMinimoCategoriaInvalido
} from "./produto.exception";
import { CriarProdutoProps } from './produto.types';

let nomeProdutoValido: string;
let nomeProdutoTamanhoMinInvalido: string;
let nomeProdutoTamanhoMaxInvalido: string;
let descricaoProdutoValido: string;
let descricaoProdutoTamanhoMinInvalido: string;
let descricaoProdutoTamanhoMaxInvalido: string;
let valorProdutoValido: number;
let valorMinProdutoInvalido: number;
let categoriasValidas: Array<Categoria>;
let categoriasQtdMinInvalidas: Array<Categoria>;
let categoriasQtdMaxInvalidas: Array<Categoria>;

//chamado uma vez antes de iniciar a execução de todos os testes no contexto atual.
beforeAll(async () => {

    //Preenchendo as variáveis com dados em conformidade com as restrições de regra de negócio para o nome do produto
    nomeProdutoValido = faker.string.alpha({length:{min:5,max:50}});
    nomeProdutoTamanhoMinInvalido = faker.string.alpha({length:{min:0,max:4}});
    nomeProdutoTamanhoMaxInvalido = faker.string.alpha({length:{min:51,max:51}});

    //Preenchendo as variáveis com dados em conformidade com as restrições de regra de negócio para o nome do produto
    descricaoProdutoValido = faker.string.alpha({length:{min:10,max:200}});
    descricaoProdutoTamanhoMinInvalido = faker.string.alpha({length:{min:0,max:9}});
    descricaoProdutoTamanhoMaxInvalido = faker.string.alpha({length:{min:201,max:201}});

    //Preenchendo as variáveis com dados em conformidade com as restrições de regra de negócio para o nome do produto
    valorProdutoValido = faker.number.int({min:1,max:2000})
    valorMinProdutoInvalido = faker.number.int({min:-10,max: 0})

    //Preenchendo as variáveis com dados em conformidade com as restrições de regra de negócio para o nome do produto
    const categoriaValida01 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
    const categoriaValida02 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
    const categoriaValida03 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
    const categoriaValida04 = Categoria.criar({nome:faker.string.alpha({length:{min:3,max:50}})});
    categoriasValidas = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03], {min:1,max:3});
    categoriasQtdMinInvalidas = [];
    categoriasQtdMaxInvalidas = faker.helpers.arrayElements<Categoria>([categoriaValida01,categoriaValida02,categoriaValida03,categoriaValida04], {min:4,max:4});

})

//Suite de Teste de Unidade - Entidade de Domínio
//Usando o 'describe', você pode definir como um conjunto de testes ou benchmarks relacionados
describe('Entidade de Domínio: Criar Produto', () => {

    //Teste define um conjunto de expectativas relacionadas. 
    test('Deve Criar Um Produto Válido', async () => {

        //Dado (Given)
        const produtoValido: CriarProdutoProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(Produto.criar(produtoValido))
            .to.be.instanceof(Produto);

    });

    test('Não Deve Criar Produto Com Nome Inválido (Tamanho Mínimo)', async () => {

        //Dado (Given)
        //Nome menor que 5 caracteres
        const produtoNomeInvalido: CriarProdutoProps = {
            nome: nomeProdutoTamanhoMinInvalido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(NomeProdutoTamanhoMinimoInvalido);

    });

    test('Não Deve Criar Produto Com Nome Inválido (Tamanho Máximo)', async () => {

        //Dado (Given)
        //Nome maior que 50 caracteres
        const produtoNomeInvalido: CriarProdutoProps = {
            nome: nomeProdutoTamanhoMaxInvalido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(NomeProdutoTamanhoMaximoInvalido);

    });

    test('Não Deve Criar Descrição Mínima do Produto Inválido (Tamanho Mínimo)', async () => {

        //Dado (Given)
        //Nome menor que 10 caracteres
        const descricaoProdutoInvalido: CriarProdutoProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoTamanhoMinInvalido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(descricaoProdutoInvalido))
            .toThrowError(DescricaoProdutoTamanhoMinimoInvalido);

    });

    test('Não Deve Criar Descrição Máxima do Produto Inválido (Tamanho Máximo)', async () => {

        //Dado (Given)
        //Nome maior que 200 caracteres
        const descricaoProdutoInvalido: CriarProdutoProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoTamanhoMaxInvalido,
            valor: valorProdutoValido,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(descricaoProdutoInvalido))
            .toThrowError(DescricaoProdutoTamanhoMaximoInvalido);

    });

    test('Não Deve Criar Produto Preço Mínimo Inválido (Valor Mínimo)', async () => {

        //Dado (Given)
        //Nome menor que 1 caracteres
        const valorProdutoInvalido: CriarProdutoProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorMinProdutoInvalido,
            categorias: categoriasValidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(valorProdutoInvalido))
            .toThrowError(PrecoProdutoValorMinimoInvalido);

    });

    test('Não Deve Criar Produto Número de Categoria Inválido (Número Mínimo Categoria)', async () => {

        //Dado (Given)
        //Nome menor que 1 categoria
        const categoriaProdutoInvalido: CriarProdutoProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasQtdMinInvalidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(categoriaProdutoInvalido))
            .toThrowError(ProdutoNumeroMinimoCategoriaInvalido);
    });

    test('Não Deve Criar Produto Número de Categoria Inválido (Número Máximo Categoria)', async () => {

        //Dado (Given)
        //Nome menor que 3 categorias
        const categoriaProdutoInvalido: CriarProdutoProps = {
            nome: nomeProdutoValido,
            descricao: descricaoProdutoValido,
            valor: valorProdutoValido,
            categorias: categoriasQtdMaxInvalidas
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(categoriaProdutoInvalido))
            .toThrowError(ProdutoNumeroMaximoCategoriaInvalido);
    });

});