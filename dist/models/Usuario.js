var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, } from "typeorm";
import * as bcrypt from "bcryptjs";
let Usuario = class Usuario {
    // Hook do TypeORM para criptografar a senha
    async hashPassword() {
        // Evita re-hash se a senha já estiver criptografada
        if (this.senha && !this.senha.startsWith("$2")) {
            const salt = await bcrypt.genSalt(10);
            this.senha = await bcrypt.hash(this.senha, salt);
        }
    }
    async compararSenha(senhaDigitada) {
        return bcrypt.compare(senhaDigitada, this.senha);
    }
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Usuario.prototype, "id", void 0);
__decorate([
    Column("varchar"),
    __metadata("design:type", String)
], Usuario.prototype, "nome", void 0);
__decorate([
    Column("varchar", { unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    Column("varchar", { unique: true }),
    __metadata("design:type", String)
], Usuario.prototype, "matricula", void 0);
__decorate([
    Column("varchar", { nullable: true }),
    __metadata("design:type", Object)
], Usuario.prototype, "contaBancaria", void 0);
__decorate([
    Column("varchar", { nullable: true }),
    __metadata("design:type", Object)
], Usuario.prototype, "agenciaBancaria", void 0);
__decorate([
    Column("varchar"),
    __metadata("design:type", String)
], Usuario.prototype, "senha", void 0);
__decorate([
    Column({ type: "enum", enum: ["admin", "tomador", "investidor"] }),
    __metadata("design:type", String)
], Usuario.prototype, "role", void 0);
__decorate([
    Column({ type: "decimal", default: 0 }),
    __metadata("design:type", Number)
], Usuario.prototype, "saldo", void 0);
__decorate([
    BeforeInsert(),
    BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Usuario.prototype, "hashPassword", null);
Usuario = __decorate([
    Entity("usuarios")
], Usuario);
export { Usuario };
