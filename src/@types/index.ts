export type Passageiro = {
    nome: string;
}
export type Assento = {
    nro: number;
    reservado: boolean;
    passageiro?: Passageiro;    
}