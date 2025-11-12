var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, OneToMany, CreateDateColumn, BeforeInsert, BeforeUpdate, OneToOne, } from "typeorm";
import { Usuario } from "./Usuario.js";
import { Pagamento } from "./Pagamento.js";
let Emprestimo = class Emprestimo {
    constructor() {
        // Campos auxiliares para detectar mudanças (opcional)
        this.montanteChanged = false;
        this.jurosChanged = false;
    }
    setDefaultSaldoDevedorOnInsert() {
        this.calcularSaldoDevedor();
    }
    setDefaultSaldoDevedorOnUpdate() {
        // Só recalcula se o empréstimo está sendo criado ou se montante/juros foram modificados
        if (!this.id || this.montanteChanged || this.jurosChanged) {
            this.calcularSaldoDevedor();
        }
    }
    calcularSaldoDevedor() {
        // Se saldoDevedor não foi definido ou é zero, calcula com base no montante e juros
        if (this.montante &&
            this.juros !== undefined &&
            this.juros !== null &&
            (!this.saldoDevedor || this.saldoDevedor === 0)) {
            const jurosDecimal = Number(this.juros) / 100; // Converte porcentagem para decimal
            const valorComJuros = Number(this.montante) * (1 + jurosDecimal);
            this.saldoDevedor = Number(valorComJuros.toFixed(2));
        }
    }
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Emprestimo.prototype, "id", void 0);
__decorate([
    OneToOne(() => Usuario, { eager: true, nullable: false }),
    JoinColumn({ name: "tomadorId" }) // Coluna no banco será "tomadorId"
    ,
    __metadata("design:type", Usuario)
], Emprestimo.prototype, "tomador", void 0);
__decorate([
    OneToMany(() => Pagamento, (pagamento) => pagamento.emprestimo, {
        cascade: true, // opcional: salva pagamentos junto
    }),
    __metadata("design:type", Array)
], Emprestimo.prototype, "pagamentos", void 0);
__decorate([
    Column({
        type: "enum",
        enum: ["em analise", "aprovado", "negado", "quitado", "cancelado"],
        default: "em analise",
    }),
    __metadata("design:type", String)
], Emprestimo.prototype, "status", void 0);
__decorate([
    Column({ type: "int" }),
    __metadata("design:type", Number)
], Emprestimo.prototype, "prazo", void 0);
__decorate([
    Column({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Emprestimo.prototype, "montante", void 0);
__decorate([
    Column({ type: "decimal", precision: 5, scale: 2 }),
    __metadata("design:type", Number)
], Emprestimo.prototype, "juros", void 0);
__decorate([
    Column({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Emprestimo.prototype, "saldoDevedor", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Emprestimo.prototype, "dataInicio", void 0);
__decorate([
    Column({ type: "timestamp" }),
    __metadata("design:type", Date)
], Emprestimo.prototype, "dataFim", void 0);
__decorate([
    BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Emprestimo.prototype, "setDefaultSaldoDevedorOnInsert", null);
__decorate([
    BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Emprestimo.prototype, "setDefaultSaldoDevedorOnUpdate", null);
Emprestimo = __decorate([
    Entity("emprestimos")
], Emprestimo);
export { Emprestimo };
