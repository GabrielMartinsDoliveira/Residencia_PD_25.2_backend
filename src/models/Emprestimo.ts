import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
} from "typeorm";
import { Usuario } from "./Usuario.js";
import { Pagamento } from "./Pagamento.js";

export type EmprestimoStatus =
  | "em analise"
  | "aprovado"
  | "negado"
  | "quitado"
  | "cancelado";

@Entity("emprestimos")
export class Emprestimo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @OneToOne(() => Usuario, { eager: true, nullable: false })
  @JoinColumn({ name: "tomadorId" }) // Coluna no banco será "tomadorId"
  tomador!: Usuario;

  @OneToMany(() => Pagamento, (pagamento) => pagamento.emprestimo, {
    cascade: true, // opcional: salva pagamentos junto
  })
  pagamentos!: Pagamento[];

  @Column({
    type: "enum",
    enum: ["em analise", "aprovado", "negado", "quitado", "cancelado"],
    default: "em analise",
  })
  status!: EmprestimoStatus;

  @Column({ type: "int" })
  prazo!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  montante!: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  juros!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  saldoDevedor!: number;

  @CreateDateColumn()
  dataInicio!: Date;

  @Column({ type: "timestamp" })
  dataFim!: Date;

  @Column({ type: "int" })
  codigoTransacao!:number
}
