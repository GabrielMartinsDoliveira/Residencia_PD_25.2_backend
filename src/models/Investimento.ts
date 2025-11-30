import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinColumn,
  JoinTable,
  CreateDateColumn,
} from "typeorm";
import { Usuario } from "./Usuario.js";

export type InvestimentoStatus = "em andamento" | "finalizado" | "cancelado";

@Entity("investimentos")
export class Investimento {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: "administradorId" })
  administrador!: Usuario;

  @ManyToMany(() => Usuario)
  @JoinTable({
    name: "investimento_investidores",
    joinColumn: { name: "investimentoId" },
    inverseJoinColumn: { name: "usuarioId" },
  })
  investidores!: Usuario[];

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

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  totalInvestido!: number;

  @Column({ type: "decimal", precision: 5, scale: 2 })
  juros!: number;

  @CreateDateColumn()
  dataInicio!: Date;

  @Column({ type: "timestamp" })
  dataFim!: Date;
}
