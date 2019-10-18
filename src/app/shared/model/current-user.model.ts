import { User } from "./user.model";
import { Grupo } from "./grupo.model";

export class CurrentUser {
    public senha: string;
    public email: string;
    public grupos: Array<Grupo>;
}