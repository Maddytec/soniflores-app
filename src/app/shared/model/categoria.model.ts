export class Categoria {
    constructor(
        public id: string,
        public descricao: string,
        public categoriaPai: {
            id: string,
            descricao: string
        }
    ){

    }
}