import { Categoria } from '@modules/catalogo/domain/categoria/categoria.entity';
import { Produto } from '@modules/catalogo/domain/produto/produto.entity';
import { CategoriaPrismaRepository } from '@modules/catalogo/infra/database/categoria.prisma.repository';
import { ProdutoPrismaRepository } from '@modules/catalogo/infra/database/produto.prisma.repository';
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
    const produtoRepo = new ProdutoPrismaRepository(prisma);

    ////////////////////////////////
    //Recuperar Categoria por UUID//
    ////////////////////////////////

    // const categoriaRecuperada: Categoria | null = await categoriaRepo.recuperarPorUuid("13bfd8ff-8452-4984-9570-02c900a1a34f");

    // console.log(categoriaRecuperada);


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

    // const categoria: Categoria = Categoria.criar({
    //    nome:'Cozinha'
    // });

    // const categoriaInserida = await categoriaRepo.inserir(categoria);

    // console.log(categoriaInserida);


    ///////////////////////
    //Atualizar Categoria//
    ///////////////////////

    // const categoria = Categoria.recuperar({
    //   id: "13bfd8ff-8452-4984-9570-02c900a1a34f",
    //   nome: "Cozinha Americana"
    // });

    // const atualizouCategoria: boolean = await categoriaRepo.atualizar(categoria.id,categoria);

    // console.log(atualizouCategoria)


    /////////////////////
    //Deletar Categoria//
    /////////////////////

    // const categoriaDeletada: boolean = await categoriaRepo.deletar("13bfd8ff-8452-4984-9570-02c900a1a34f");

    // console.log(categoriaDeletada);


    //////////////////////////////
    //Recuperar Produto por UUID//
    //////////////////////////////

    // const produtoRecuperado: Produto | null = await produtoRepo.recuperarPorUuid("1aa1b385-6d70-486e-830b-4accef6dd144");

    // console.log(produtoRecuperado);

    // console.log(produtoRecuperado?.estaDeletado());

    ///////////////////
    //Inserir Produto//
    ///////////////////

    // const categoria01: Categoria = Categoria.recuperar({
    //    id: "d3059bb1-767c-4f2a-8f9a-acd4b22c1d65",
    //    nome: "Sala"
    // });

    // const categoria02: Categoria = Categoria.recuperar({
    //    id: "0c47e94d-2932-4b1e-a9cf-fa5d6f424a4e",
    //    nome: "Banho"
    // });

    // const produto: Produto = Produto.criar({
    //    nome: 'Toalha de Mesa',
    //    descricao: 'Toalha de Algodão',
    //    valor: 40,
    //    categorias: [categoria01, categoria02]
    // });

    // const produtoInserido = await produtoRepo.inserir(produto);

    // console.log(produtoInserido);


    /////////////////////////////////////////////////
	//Recuperar Todos os Produtos e Suas Categorias//
	/////////////////////////////////////////////////
		
	// const todosProdutos: Array<Produto> = await produtoRepo.recuperarTodos();

	// console.log(todosProdutos);


    ///////////////////////////////////////////////
	//Atualizar Produto - Sem Atulizar Categorias//
	///////////////////////////////////////////////

    // const produto = {
    //    id: "1aa1b385-6d70-486e-830b-4accef6dd144",
    //    nome: "Toalha de Cama",
    //    descricao: "Toalha de Algodão",
    //    valor: 85
    // }; 

    // const atualizouProduto: boolean = await produtoRepo.atualizar(produto.id,produto);


    ///////////////////
	//Deletar Produto//
	///////////////////
		
	// const produtoDeletado: boolean = await produtoRepo.deletar("0bd8dd01-47aa-47b7-a098-a774f3946b29");

	// console.log(produtoDeletado);


    /////////////////////
    //Atualizar Produto//
    /////////////////////

    //const categoria01: Categoria = Categoria.recuperar({
    //    id: '7061d559-ab25-4182-98ce-170afdf2acd2',
    //    nome: 'mesa'
    //});

    //const categoria02: Categoria = Categoria.recuperar({
    //    id: '96a7f212-e01d-4de7-8abc-70cabbc898fd',
    //    nome: 'banho'
    //})

    //const produto: Produto = Produto.recuperar({
    //    id: "c3d7d942-e368-4e9c-85e5-5bb898d776fc",
    //    nome: "Toalha de Mesa Grande",
    //    descricao: "Toalha de Algodão",
    //    valor: 100,
    //    categorias: [categoria01, categoria02]
    //});

    //const atualizouProduto: boolean = await produtoRepo.atualizar(produto.id, produto);

    //console.log(atualizouProduto)

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