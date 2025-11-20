// src/models/Aplicacao.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Usuario } from "./Usuario.js";
import { Investimento } from "./Investimento.js";

@Entity("aplicacoes")
export class Aplicacao {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Usuario, { eager: true })
  usuario!: Usuario;

  @ManyToOne(() => Investimento, { eager: false })
  investimento!: Investimento;

  @Column({ type: "decimal", precision: 12, scale: 2 })
  valor!: number;

  @CreateDateColumn()
  dataCriacao!: Date;
}
