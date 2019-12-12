import { Cliente } from "./cliente.model";

export class Endereco {
	constructor(
		public id: string,
		public logradouro: string,
		public numero: string,
		public bairro: string,
		public complemento: string,
		public cidade: string,
		public uf: string,
		public cep: string,
		public cliente: Cliente
	) {

	}
}