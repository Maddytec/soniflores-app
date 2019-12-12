import { Endereco } from "./endereco.model";

export class Cliente {
	constructor(
		public id: string,
		public nome: string,
		public foneMovel: string,
		public foneFixo: string,
		public email: string,
		public documentoReceitaFederal,
		public tipo: TipoPessoa,
		public enderecos: Array<Endereco>
	) {

	}
}