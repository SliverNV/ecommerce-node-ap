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

    ////////////////////////////////
    //Recuperar Categoria por UUID//
    ////////////////////////////////

    //const categoriaRecuperada: Categoria | null = await categoriaRepo.recuperarPorUuid("f226854a-ede6-4784-adf6-cbb289991a12");

    //console.log(categoriaRecuperada);


    //////////////////////////////
    //Recuperar Todas Categorias//
    //////////////////////////////

    //const todasCategorias: Array<Categoria> = await categoriaRepo.recuperarTodos();

    //console.log(todasCategorias);


    /////////////////////////////////
    //Verificar se Existe Categoria//
    /////////////////////////////////

    //const existeCategoria: boolean = await categoriaRepo.existe("f226854a-ede6-4784-adf6-cbb289991a12");

    //console.log(existeCategoria);


    /////////////////////
    //Inserir Categoria//
    /////////////////////

    //const categoria: Categoria = Categoria.criar({
    //   nome:'Sala e Quarto'
    //});

    //const categoriaInserida = await categoriaRepo.inserir(categoria);

    //console.log(categoriaInserida);


    ///////////////////////
    //Atualizar Categoria//
    ///////////////////////

    //const categoria = Categoria.recuperar({
    //   id: "f226854a-ede6-4784-adf6-cbb289991a12",
    //   nome: "Banho"
    //});

    //const atualizouCategoria: boolean = await categoriaRepo.atualizar(categoria.id,categoria);

    //console.log(atualizouCategoria)


    /////////////////////
    //Deletar Categoria//
    /////////////////////
    
    //const categoriaDeletada: boolean = await categoriaRepo.deletar("323eff3a-25d0-4a93-a011-6c258d10f2c3");
    
    //console.log(categoriaDeletada);


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