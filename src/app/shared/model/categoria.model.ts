export class Categoria {
    constructor(
        public id: string,
        public descricao: string,
        public categoriaPai: Categoria
    ) {

    }
}