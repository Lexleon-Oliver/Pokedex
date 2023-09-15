export class Pokemon{
  id!: number;
  nome!: string;
  tipo!: string;
  tipos!: string[];
  imagem!: string;

  constructor(id: number, nome: string, tipo:string, tipos: string[], imagem: string) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.tipos = tipos;
    this.imagem = imagem;
  }
}

