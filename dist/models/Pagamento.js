var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, } from "typeorm";
import { Emprestimo } from "./Emprestimo.js";
let Pagamento = class Pagamento {
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Pagamento.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Emprestimo, (emprestimo) => emprestimo.pagamentos, {
        eager: false, // evita carregar todos os empréstimos automaticamente
        onDelete: "CASCADE", // se o empréstimo for apagado, apaga pagamentos
    }),
    JoinColumn({ name: "idEmprestimo" }),
    __metadata("design:type", Emprestimo)
], Pagamento.prototype, "emprestimo", void 0);
__decorate([
    Column({
        type: "enum",
        enum: ["em aberto", "em atraso", "pago"],
        default: "em aberto",
    }),
    __metadata("design:type", String)
], Pagamento.prototype, "status", void 0);
__decorate([
    Column({
        type: "enum",
        enum: ["pix", "boleto"],
    }),
    __metadata("design:type", String)
], Pagamento.prototype, "metodo", void 0);
__decorate([
    Column("decimal", { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Pagamento.prototype, "valor", void 0);
__decorate([
    Column("decimal", { precision: 10, scale: 2, nullable: true }),
    __metadata("design:type", Number)
], Pagamento.prototype, "multa", void 0);
__decorate([
    Column({ type: "timestamp" }),
    __metadata("design:type", Date)
], Pagamento.prototype, "dataPagamento", void 0);
__decorate([
    Column({ type: "timestamp" }),
    __metadata("design:type", Date)
], Pagamento.prototype, "dataVencimento", void 0);
Pagamento = __decorate([
    Entity("pagamentos")
], Pagamento);
export { Pagamento };
