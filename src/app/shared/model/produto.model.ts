import { Categoria } from "./categoria.model";

export class Produto {
    constructor(
        public id: string,
        public nome: string,
        public sku: string,
        public valorUnitario: number,
        public quantidadeEstoque: number,
        public categoria: Categoria
    ){

    }
}