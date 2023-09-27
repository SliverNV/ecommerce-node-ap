import { Categoria } from '@modules/catalogo/domain/categoria/categoria.entity';
import { CategoriaPrismaRepository } from '@modules/catalogo/infra/database/categoria.prisma.repository';
import { PrismaClient } from '@prisma/client';
import { DomainException } from '@shared/domain/domain.exception';

const prisma = new PrismaClient({
    log: ['query', 'info'],
    errorFormat: 'pretty'
});

async function main() {
   
    prisma.$connect().then(
        async () => {
            console.log('Postgres Conectado');
        }
    );

    const categoriaRepo = new CategoriaPrismaRepository(prisma);

    //const categoriaRecuperada = await categoriaRepo.recuperarPorUuid("c2666bdb-c055-40bb-951b-32f899f41e30");

    //console.log(categoriaRecuperada);

    //const categoria: Categoria = Categoria.criar({
    //    nome:'Banho'
    //})    

    //const categoriaInserida = await categoriaRepo.inserir(categoria);

    //console.log(categoriaInserida);

    //const categorias = await categoriaRepo.recuperarTodos();

    //console.log(categorias);

    //const categoria = Categoria.recuperar({
    //    id: "c2666bdb-c055-40bb-951b-32f899f41e30",
    //    nome: "Mesa"
    //})    

    //const categoriaAtualizada = await categoriaRepo.atualizar(categoria.id,categoria);

    //console.log(categoriaAtualizada)

    const categoriaDeletada = await categoriaRepo.deletar("c544a6d0-3595-4e88-b181-e56c3c86a7f9");
    console.log(categoriaDeletada)

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (error) => {
       if (error instanceof DomainException) {
           console.log('Execeção de Dóminio');
           console.log(error.message);
       }
       else {
           console.log('Outras Exceções');
           console.log(error.message);
       }
       await prisma.$disconnect()
       process.exit(1)
   })