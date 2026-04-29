import { Component, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-root',
  imports: [ButtonModule, InputTextModule, FormsModule, TableModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  alunos = signal([
    { id: 1, nome: 'Aluno 1' },
    { id: 2, nome: 'Aluno 2' },
    { id: 3, nome: 'Aluno 3' }
  ])

  novo_aluno = '';
  aluno_selecionado: any = null;

  adicionar_aluno() {
    if (this.novo_aluno.trim()) {
      const aluno = { id: Date.now(), nome: this.novo_aluno };
      this.alunos.update(lista_atual => [...lista_atual, aluno]);
      this.novo_aluno = '';
    }
  }

  remover_aluno(id: number) {
    this.alunos.update(lista_atual => lista_atual.filter(aluno => aluno.id !== id));
  }


  editar_aluno(aluno: any) {
    this.novo_aluno = aluno.nome;
    this.aluno_selecionado = aluno;
  }


}
