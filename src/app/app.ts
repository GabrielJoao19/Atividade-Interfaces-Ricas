import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

export interface Aluno {
  id: number;
  nome: string;
  materiasCursadas: number;
  ativo: boolean;
}

@Component({
  selector: 'app-root',
  imports: [ButtonModule, InputTextModule, FormsModule, TableModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  alunos = signal<Aluno[]>([
    { id: 1, nome: 'Aluno 1', materiasCursadas: 4, ativo: true },
    { id: 2, nome: 'Aluno 2', materiasCursadas: 5, ativo: false },
    { id: 3, nome: 'Aluno 3', materiasCursadas: 6, ativo: true }
  ]);

  novo_aluno = '';
  novo_materiasCursadas: number = 0;
  novo_ativo: boolean = false;

  aluno_selecionado: Aluno | null = null;

  adicionar_aluno() {
    if (this.novo_aluno.trim()) {
      if (this.aluno_selecionado) {
        // Modo de Edição
        this.alunos.update(lista_atual =>
          lista_atual.map(a =>
            a.id === this.aluno_selecionado!.id
              ? {
                ...a,
                nome: this.novo_aluno,
                materiasCursadas: Number(this.novo_materiasCursadas),
                ativo: Boolean(this.novo_ativo)
              }
              : a
          )
        );
        this.aluno_selecionado = null;
      } else {
        // Modo de Criação
        const aluno: Aluno = {
          id: Date.now(),
          nome: this.novo_aluno,
          materiasCursadas: Number(this.novo_materiasCursadas),
          ativo: Boolean(this.novo_ativo)
        };
        this.alunos.update(lista_atual => [...lista_atual, aluno]);
      }

      this.novo_aluno = '';
      this.novo_materiasCursadas = 0;
      this.novo_ativo = false;
    }
  }

  remover_aluno(id: number) {
    this.alunos.update(lista_atual => lista_atual.filter(aluno => aluno.id !== id));
  }

  editar_aluno(aluno: Aluno) {
    this.novo_aluno = aluno.nome;
    this.novo_materiasCursadas = aluno.materiasCursadas;
    this.novo_ativo = aluno.ativo;
    this.aluno_selecionado = aluno;
  }
}