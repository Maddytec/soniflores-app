import { ResponseApi } from "./response-api";
import { Grupo } from "./grupo.model";

export class User {

    constructor(
        public id: string,
        public nome: string,
        public email: string,
        public senha: string,
        public grupos: Array<Grupo>
    ) {
    }
}