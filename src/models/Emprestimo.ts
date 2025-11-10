import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Usuario } from "./Usuario.js";
import { Pagamento } from "./Pagamento.js";

export type EmprestimoStatus = "em andamento" | "finalizado" | "cancelado";

@Entity("emprestimos")
export class Emprestimo {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  // Um empréstimo pertence a um tomador (usuário)
  @ManyToOne(() => Usuario, { eager: true, nullable: false })
  idTomador!: Usuario;

  // Um empréstimo pode ter vários pagamentos
  @OneToMany(() => Pagamento, (pagamento) => pagamento.emprestimo, {
    cascade: true, // opcional: salva pagamentos junto
  })
  pagamentos!: Pagamento[];

  @Column({
    type: "enum",
    enum: ["em andamento", "finalizado", "cancelado"],
    default: "em andamento",
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

  @Column({ type: "timestamp", nullable: true })
  dataFim?: Date;
}