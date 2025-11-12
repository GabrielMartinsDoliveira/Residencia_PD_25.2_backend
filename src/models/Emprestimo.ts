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

  @BeforeInsert()
  setDefaultSaldoDevedorOnInsert() {
    this.calcularSaldoDevedor();
  }

  @BeforeUpdate()
  setDefaultSaldoDevedorOnUpdate() {
    // Só recalcula se o empréstimo está sendo criado ou se montante/juros foram modificados
    if (!this.id || this.montanteChanged || this.jurosChanged) {
      this.calcularSaldoDevedor();
    }
  }

  private calcularSaldoDevedor() {
    // Se saldoDevedor não foi definido ou é zero, calcula com base no montante e juros
    if (
      this.montante &&
      this.juros !== undefined &&
      this.juros !== null &&
      (!this.saldoDevedor || this.saldoDevedor === 0)
    ) {
      const jurosDecimal = Number(this.juros) / 100; // Converte porcentagem para decimal
      const valorComJuros = Number(this.montante) * (1 + jurosDecimal);
      this.saldoDevedor = Number(valorComJuros.toFixed(2));
    }
  }

  // Campos auxiliares para detectar mudanças (opcional)
  private montanteChanged: boolean = false;
  private jurosChanged: boolean = false;
}
