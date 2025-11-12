var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, } from "typeorm";
import { Usuario } from "./Usuario.js";
let Investimento = class Investimento {
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Investimento.prototype, "id", void 0);
__decorate([
    ManyToOne(() => Usuario, { eager: true }),
    __metadata("design:type", Object)
], Investimento.prototype, "idAdministrador", void 0);
__decorate([
    Column({
        type: "enum",
        enum: ["em andamento", "finalizado", "cancelado"],
        default: "em andamento",
    }),
    __metadata("design:type", String)
], Investimento.prototype, "status", void 0);
__decorate([
    Column({ type: "int" }),
    __metadata("design:type", Number)
], Investimento.prototype, "prazo", void 0);
__decorate([
    Column({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Investimento.prototype, "valor", void 0);
__decorate([
    Column({ type: "decimal", precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Investimento.prototype, "juros", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Investimento.prototype, "dataInicio", void 0);
__decorate([
    Column({ type: "timestamp" }),
    __metadata("design:type", Date)
], Investimento.prototype, "dataFim", void 0);
Investimento = __decorate([
    Entity("investimentos")
], Investimento);
export { Investimento };
