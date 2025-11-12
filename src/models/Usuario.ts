import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import * as bcrypt from "bcryptjs";

export type UserRole = "admin" | "tomador" | "investidor";

@Entity("usuarios")
export class Usuario {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  nome!: string;

  @Column("varchar",{ unique: true })
  email!: string;

  @Column("varchar", { unique: true })
  matricula!: string;

  @Column("varchar", {nullable: true})
  contaBancaria?: string | null;

  @Column("varchar", {nullable: true})
  agenciaBancaria?: string | null;

  @Column("varchar")
  senha!: string;

  @Column({ type: "enum", enum: ["admin", "tomador", "investidor"] })
  role!: UserRole;

  @Column({ type: "decimal", default: 0 })
  saldo!: number;

  // Hook do TypeORM para criptografar a senha
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    // Evita re-hash se a senha já estiver criptografada
    if (this.senha && !this.senha.startsWith("$2")) {
      const salt = await bcrypt.genSalt(10);
      this.senha = await bcrypt.hash(this.senha, salt);
    }
  }

  async compararSenha(senhaDigitada: string): Promise<boolean> {
    return bcrypt.compare(senhaDigitada, this.senha);
  }
}
