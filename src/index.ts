import { Categoria } from "@modules/catalogo/domain/categoria/categoria.entity";
import { PrismaClient } from "@prisma/client";
import { DomainException } from "@shared/domain/domain.exception";

const prisma = new PrismaClient();

async function main() {

    ///////////////////
    //Criar Categoria//
    ///////////////////

    // let categoria: Categoria;
    // categoria = Categoria.criar({nome:'mesa'});

    // ////////////////////////////////
    // //Persistir Categoria no Banco//
    // ////////////////////////////////

    // await prisma.categoria.create({
    //     data: {
    //         id: categoria.id,
    //         nome: categoria.nome
    //     }
    // });

    ////////////////////////////////
    //Atualizar Categoria no Banco//
    ////////////////////////////////

    const categoriaRecuperada = await prisma.categoria.update({
        where: {id: "c544a6d0-3595-4e88-b181-e56c3c86a7f9" },
        data: {nome: "banho" },
    })


    /////////////////////
    //Listar Categorias//
    /////////////////////

    const ListaCategorias = await prisma.categoria.findMany();
    console.log(ListaCategorias);
    
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
        if (error instanceof DomainException) {
            console.log('Exceção de Dóminio');
            console.log(error.message);
        }
        else {
            console.log('Outras Exceções');
            console.log(error.message);
        }
        await prisma.$disconnect()
        process.exit(1)
    })