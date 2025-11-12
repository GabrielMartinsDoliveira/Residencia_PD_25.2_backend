import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Usuario } from "./Usuario.js";

export type InvestimentoStatus = "em andamento" | "finalizado" | "cancelado";

@Entity("investimentos")
export class Investimento {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Usuario, { eager: true })
  idAdministrador!: Usuario["id"];

  @Column({
    type: "enum",
    enum: ["em andamento", "finalizado", "cancelado"],
    default: "em andamento",
  })
  status!: InvestimentoStatus;

  @Column({ type: "int" })
  prazo!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  valor!: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  juros!: number;

  @CreateDateColumn()
  dataInicio!: Date;

  @Column({ type: "timestamp"})
  dataFim!: Date;
}