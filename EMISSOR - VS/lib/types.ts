export type Status = "ATIVO" | "INATIVO" | "PENDENTE" | "BLOQUEADO" | "CANCELADO"

export interface Emissor {
  id: string
  nome: string
  cnpj: string
  status: Status
  programas: number
  criadoEm: string
}

export interface Programa {
  id: string
  nome: string
  emissor: string
  tipo: "ALIMENTACAO" | "REFEICAO" | "MOBILIDADE" | "SAUDE" | "MULTIBENEFICIO"
  status: Status
  beneficiarios: number
  criadoEm: string
}

export interface Beneficiario {
  id: string
  nome: string
  cpf: string
  programa: string
  status: Status
  saldo: number
  criadoEm: string
}

export interface Comercio {
  id: string
  razaoSocial: string
  cnpj: string
  mcc: string
  cidade: string
  uf: string
  status: Status
  criadoEm: string
}

export interface Cartao {
  id: string
  numeroMascarado: string
  beneficiario: string
  programa: string
  status: Status
  validade: string
  criadoEm: string
}

export interface Credenciamento {
  id: string
  comercio: string
  cnpj: string
  adquirente: string
  status: Status
  criadoEm: string
}

export interface Transacao {
  id: string
  cartao: string
  comercio: string
  valor: number
  tipo: "COMPRA" | "ESTORNO" | "AJUSTE"
  status: "APROVADA" | "NEGADA" | "PENDENTE"
  data: string
}

export interface Recarga {
  id: string
  beneficiario: string
  programa: string
  valor: number
  status: "PROCESSADA" | "PENDENTE" | "FALHA"
  data: string
}

export interface Saque {
  id: string
  comercio: string
  cnpj: string
  valor: number
  status: "LIQUIDADO" | "PENDENTE" | "REJEITADO"
  data: string
}
