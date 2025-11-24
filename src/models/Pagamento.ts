import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Emprestimo } from "./Emprestimo.js";

export type StatusPagamento = "em aberto" | "em atraso" | "pago";

@Entity("pagamentos")
export class Pagamento {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Emprestimo, (emprestimo) => emprestimo.pagamentos, {
    eager: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "idEmprestimo" })
  emprestimo!: Emprestimo;

  @Column({
    type: "enum",
    enum: ["em aberto", "em atraso", "pago"],
    default: "em aberto",
  })
  status!: StatusPagamento;

  @Column({
    type: "enum",
    enum: ["pix", "boleto"],
  })
  metodo!: string;

  @Column("decimal", { precision: 10, scale: 2 })
  valor!: number;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  multa?: number;

  @Column({ type: "timestamp", nullable: true })
  dataPagamento!: Date | null;

  @Column({ type: "timestamp" })
  dataVencimento!: Date;
}
