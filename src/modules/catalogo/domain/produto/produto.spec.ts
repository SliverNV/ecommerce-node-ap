import { describe, expect, test } from 'vitest';
import { CriarProdutoProps, RecuperarProdutoProps } from './produto.types';
import { Produto } from './produto.entity';
import {
    NomeProdutoTamanhoMinimoInvalido, NomeProdutoTamanhoMaximoInvalido,
    DescricaoProdutoTamanhoMinimoInvalido, DescricaoProdutoTamanhoMaximoInvalido,
    PrecoProdutoValorMinimoInvalido, ProdutoNumeroMinimoCategoriaInvalido,
    ProdutoNumeroMaximoCategoriaInvalido } from "./produto.exception";
import { IDEntityUUIDInvalid } from '../../../../shared/domain/domain.exception';
import { Categoria } from '../categoria/categoria.entity';

describe('Entidade de Domínio: Criar Produto', () => {

    //Teste define um conjunto de expectativas relacionadas. 
    test('Deve Criar Um Produto Válido', async () => {

        let categoria01 = Categoria.criar({ nome: 'cama'});
        

        //Dado (Given)
        const produtoValido: CriarProdutoProps = {
            nome: 'Lençol de Casal',
            descricao: 'Lençol de Forro Duplo',
            valor: 1,
            categorias: [ categoria01 ]
        };

        //Quando (When) e Então (Then)
        expect(Produto.criar(produtoValido))
            .to.be.instanceof(Produto);

    });

    test('Não Deve Criar Produto Com Nome Inválido (Tamanho Mínimo)', async () => {

        let categoria02 = Categoria.criar({ nome: 'capas'});
        
        //Dado (Given)
        //Nome menor que 5 caracteres
        const produtoNomeInvalido: CriarProdutoProps = {
            nome: 'cama',
            descricao: 'Lençol de Forro Duplo',
            valor: 2,
            categorias: [ categoria02 ]
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(NomeProdutoTamanhoMinimoInvalido);

    });

    test('Não Deve Criar Produto Com Nome Inválido (Tamanho Máximo)', async () => {

        let categoria03 = Categoria.criar({ nome: 'capas'});
        
        //Dado (Given)
        //Nome maior que 50 caracteres
        const produtoNomeInvalido: CriarProdutoProps = {
            nome: '123456789123456789123456789123456789123456789123456789123456789123456789',
            descricao: 'Lençol de Forro Duplo',
            valor: 3,
            categorias: [ categoria03 ]
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(produtoNomeInvalido))
            .toThrowError(NomeProdutoTamanhoMaximoInvalido);

    });

    test('Não Deve Criar Descrição Mínima do Produto Inválido (Tamanho Mínimo)', async () => {

        let categoria04 = Categoria.criar({ nome: 'capas'});
        
        //Dado (Given)
        //Nome menor que 10 caracteres
        const descricaoProdutoInvalido: CriarProdutoProps = {
            nome: 'camas',
            descricao: 'Lençol',
            valor: 1,
            categorias: [ categoria04 ]
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(descricaoProdutoInvalido))
            .toThrowError(DescricaoProdutoTamanhoMinimoInvalido);

    });

    test('Não Deve Criar Descrição Máxima do Produto Inválido (Tamanho Máximo)', async () => {

        let categoria05 = Categoria.criar({ nome: 'capas'});
        
        //Dado (Given)
        //Nome maior que 200 caracteres
        const descricaoProdutoInvalido: CriarProdutoProps = {
            nome: 'camas',
            descricao: '123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789',
            valor: 2,
            categorias: [ categoria05 ]
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(descricaoProdutoInvalido))
            .toThrowError(DescricaoProdutoTamanhoMaximoInvalido);

    });

    test('Não Deve Criar Produto Preço Mínimo Inválido (Valor Mínimo)', async () => {

        let categoria05 = Categoria.criar({ nome: 'capas'});
        
        //Dado (Given)
        //Nome menor que 1 caracteres
        const valorProdutoInvalido: CriarProdutoProps = {
            nome: 'camas',
            descricao: 'Lençol de Forro Duplo',
            valor: -3,
            categorias: [ categoria05 ]
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(valorProdutoInvalido))
            .toThrowError(PrecoProdutoValorMinimoInvalido);

    });

    test('Não Deve Criar Produto Número de Categoria Inválido (Número Mínimo Categoria)', async () => {

                
        //Dado (Given)
        //Nome menor que 1 categoria
        const categoriaProdutoInvalido: CriarProdutoProps = {
            nome: 'camas',
            descricao: 'Lençol de Forro Duplo',
            valor: 1,
            categorias: [ ]
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(categoriaProdutoInvalido))
            .toThrowError(ProdutoNumeroMinimoCategoriaInvalido);
    });

    test('Não Deve Criar Produto Número de Categoria Inválido (Número Máximo Categoria)', async () => {

        let categoria06 = Categoria.criar({ nome: 'capas'});
        let categoria07 = Categoria.criar({ nome: 'capas'});
        let categoria08 = Categoria.criar({ nome: 'capas'});
        let categoria09 = Categoria.criar({ nome: 'capas'});
                
        //Dado (Given)
        //Nome menor que 3 categorias
        const categoriaProdutoInvalido: CriarProdutoProps = {
            nome: 'camas',
            descricao: 'Lençol de Forro Duplo',
            valor: 2,
            categorias: [ categoria06, categoria07, categoria08, categoria09 ]
        };

        //Quando (When) e Então (Then)
        expect(() => Produto.criar(categoriaProdutoInvalido))
            .toThrowError(ProdutoNumeroMaximoCategoriaInvalido);
    });


});