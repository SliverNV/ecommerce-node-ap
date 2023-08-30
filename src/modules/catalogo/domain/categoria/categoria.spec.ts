<<<<<<< HEAD
import { describe, expect, test } from 'vitest';
import { CriarCategoriaProps, RecuperarCategoriaProps } from './categoria.types';
import { Categoria } from './categoria.entity';
import { NomeCategoriaTamanhoMaximoInvalido, NomeCategoriaTamanhoMinimoInvalido } from './categoria.exception';
import { IDEntityUUIDInvalid } from '../../../../shared/domain/domain.exception';
=======
import { faker } from '@faker-js/faker';
import { IDEntityUUIDInvalid } from '@shared/domain/domain.exception';
import { beforeAll, describe, expect, test } from 'vitest';
import { Categoria } from './categoria.entity';
import {
    NomeCategoriaTamanhoMaximoInvalido,
    NomeCategoriaTamanhoMinimoInvalido
} from './categoria.exception';
import { CriarCategoriaProps, RecuperarCategoriaProps } from './categoria.types';


let nomeCategoriaValido: string;
let nomeCategoriaTamanhoMinInvalido: string;
let nomeCategoriaTamanhoMaxInvalido: string;
let UUIDValido: string;
let UUIDInvalido: string;

//Chamado uma vez antes de iniciar a execução de todos os testes no contexto atual.
beforeAll(async () => {

    //Preenchendo as variáveis com dados em conformidade com as restrições da regra de negócio
    nomeCategoriaValido = faker.string.alpha({length:{min:3,max:50}});
    nomeCategoriaTamanhoMinInvalido = faker.string.alpha({length:{min:0,max:2}});
    nomeCategoriaTamanhoMaxInvalido = faker.string.alpha({length:{min:51,max:200}});
    UUIDValido = faker.string.uuid(); // Retorna um UUID v4
    UUIDInvalido = faker.string.alpha({length:{min:1,max:20}});

});
>>>>>>> 29ac4bd (Commit refatorando e configurando)

//Suite de Testes de Unidade - Entidade de Domínio
//Usando a descrição, você pode definir como um conjunto de testes ou benchmarks relacionados
describe('Entidade de Domínio: Criar Categoria', () => {

    //Teste define um conjunto de expectativas relacionadas. 
    test('Deve Criar Uma Categoria Válida', async () => {

        //Dado (Given)
        const categoriaValida: CriarCategoriaProps = {
<<<<<<< HEAD
            nome: 'cama'
        };

=======
            nome: nomeCategoriaValido
        };
       
>>>>>>> 29ac4bd (Commit refatorando e configurando)
        //Quando (When) e Então (Then)
        expect(Categoria.criar(categoriaValida))
            .to.be.instanceof(Categoria);

    });

    test('Não Deve Criar Categoria Com Nome Inválido (Tamanho Mínimo)', async () => {

        //Dado (Given)
        //Nome menor que três caracteres
        const categoriaNomeInvalido: CriarCategoriaProps = {
<<<<<<< HEAD
            nome: 'ca'
=======
            nome: nomeCategoriaTamanhoMinInvalido
>>>>>>> 29ac4bd (Commit refatorando e configurando)
        };

        //Quando (When) e Então (Then)
        expect(() => Categoria.criar(categoriaNomeInvalido))
            .toThrowError(NomeCategoriaTamanhoMinimoInvalido);

    });

    test('Não Deve Criar Categoria Com Nome Inválido (Tamanho Máximo)', async () => {

        //Dado (Given)
        //Nome maior que 50 caracteres
        const categoriaNomeInvalido: CriarCategoriaProps = {
<<<<<<< HEAD
            nome: '123456789123456789123456789123456789123456789123456'
=======
            nome: nomeCategoriaTamanhoMaxInvalido
>>>>>>> 29ac4bd (Commit refatorando e configurando)
        };

        //Quando (When) e Então (Then)
        expect(() => Categoria.criar(categoriaNomeInvalido))
            .toThrowError(NomeCategoriaTamanhoMaximoInvalido);

    });

});

describe('Entidade de Domínio: Recupear Categoria', () => {

    test('Deve Recuperar Uma Categoria Válida', async () => {

        //Dado (Given)
        const categoriaValida: RecuperarCategoriaProps = {
<<<<<<< HEAD
            id: '5edbc79d-b724-4a39-a29b-0bfb2386920a',
            nome: 'cama'
=======
            id: UUIDValido,
            nome: nomeCategoriaValido
>>>>>>> 29ac4bd (Commit refatorando e configurando)
        };

        //Quando (When) e Então (Then)
        expect(Categoria.recuperar(categoriaValida))
            .to.be.instanceof(Categoria);

    });

    test('Não Deve Recuperar Categoria Com ID Inválido (UUID Inválido)', async () => {

        //Dado (Given)
        //Nome menor que três caracteres
        const categoriaIdInvalido: RecuperarCategoriaProps = {
<<<<<<< HEAD
            id: '1234',
            nome: 'cama'
=======
            id: UUIDInvalido,
            nome: nomeCategoriaValido
>>>>>>> 29ac4bd (Commit refatorando e configurando)
        };

        //Quando (When) e Então (Then)
        expect(() => Categoria.recuperar(categoriaIdInvalido))
            .toThrowError(IDEntityUUIDInvalid);

    });

    test('Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Mínimo)', async () => {

        //Dado (Given)
        //Nome menor que três caracteres
        const categoriaNomeInvalido: RecuperarCategoriaProps = {
<<<<<<< HEAD
            id: '5edbc79d-b724-4a39-a29b-0bfb2386920a',
            nome: 'ma'
=======
            id: UUIDValido,
            nome: nomeCategoriaTamanhoMinInvalido
>>>>>>> 29ac4bd (Commit refatorando e configurando)
        };

        //Quando (When) e Então (Then)
        expect(() => Categoria.recuperar(categoriaNomeInvalido))
            .toThrowError(NomeCategoriaTamanhoMinimoInvalido);

    });

    test('Não Deve Recuperar Categoria Com Nome Inválido (Tamanho Máximo)', async () => {

        //Dado (Given)
        //Nome maior que 50 caracteres
        const categoriaNomeInvalido: RecuperarCategoriaProps = {
<<<<<<< HEAD
            id: '5edbc79d-b724-4a39-a29b-0bfb2386920a',
            nome: '123456789123456789123456789123456789123456789123456'
=======
            id: UUIDValido,
            nome: nomeCategoriaTamanhoMaxInvalido
>>>>>>> 29ac4bd (Commit refatorando e configurando)
        };

        //Quando (When) e Então (Then)
        expect(() => Categoria.recuperar(categoriaNomeInvalido))
            .toThrowError(NomeCategoriaTamanhoMaximoInvalido);

    });

});