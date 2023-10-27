import { PrismaClient } from "@prisma/client";
import { DeepMockProxy, mockDeep, mockReset } from "vitest-mock-extended";
import { ProdutoPrismaRepository } from "./produto.prisma.repository";
import { afterEach, beforeAll, expect, test, vi, describe } from "vitest";
import { faker } from "@faker-js/faker";
import { Produto } from "@modules/catalogo/domain/produto/produto.entity";
import { ProdutoMap } from "../mappers/produto.map";
import { StatusProduto } from "@modules/catalogo/domain/produto/produto.types";
import { produtoIncludeCategoriaPrisma } from "@shared/infra/database/prisma.types";

const prismaMock: DeepMockProxy<PrismaClient> = mockDeep<PrismaClient>();
let produtoRepositorio: ProdutoPrismaRepository;
let UUIDValido: string;

describe('Repositório Prisma: Produto', () => {

    beforeAll(async () => {

        produtoRepositorio = new ProdutoPrismaRepository(prismaMock);
        UUIDValido = faker.string.uuid(); // Retorna um UUID v4
        
    });

    afterEach(() => {
        vi.restoreAllMocks();
        mockReset(prismaMock);
    });

    describe('Recuperar Produto por ID', () => {

        test('Deve Recuperar Um Produto por UUID', async () => {

            const ProdutoPrisma = {
                id: UUIDValido,
                nome: 'nomeProduto',
                descricao: 'descricao teste',
                valor: 0,
                dataCriacao: faker.date.anytime(),
                dataAtualizacao: faker.date.anytime(),
                dataExclusao: faker.date.anytime(),
                status: StatusProduto.ATIVO,
                categorias: [
                  {
                    produtoId: '1aa1b385-6d70-486e-830b-4accef6dd144',
                    categoriaId: '2bfddfb4-6545-4b4b-95f0-daffed38cfe5',
                    dataCriacao: faker.date.anytime(),
                    dataAtualizacao: faker.date.anytime(),
                    categoria: {
                        id: '2bfddfb4-6545-4b4b-95f0-daffed38cfe5',
                        nome: 'Cozinha',
                        dataCriacao: faker.date.anytime(),
                        dataAtualizacao: faker.date.anytime()
                    }
                  },
                  {
                    produtoId: '1aa1b385-6d70-486e-830b-4accef6dd144',
                    categoriaId: '0629ee7a-5063-4565-bc97-363248fac22d',
                    dataCriacao: faker.date.anytime(),
                    dataAtualizacao: faker.date.anytime(),
                    categoria: {
                        id: '0629ee7a-5063-4565-bc97-363248fac22d',
                        nome: 'nomeCategoria',
                        dataCriacao: faker.date.anytime(),
                        dataAtualizacao: faker.date.anytime(),
                    }
                  }
                ]
              };

            prismaMock.produto.findUnique.mockResolvedValue(ProdutoPrisma);

            const produto: Produto = ProdutoMap.fromPrismaModelToDomain(ProdutoPrisma);

            const produtoRecuperado = await produtoRepositorio.recuperarPorUuid(produto.id);

            expect(produtoRecuperado).toEqual(produto);
            expect(prismaMock.produto.findUnique).toHaveBeenCalledTimes(1);
            expect(prismaMock.produto.findUnique).toBeCalledWith({
                where: {
                    id: produto.id,
                },
                include: produtoIncludeCategoriaPrisma
            });    
            }); 

        });

    });