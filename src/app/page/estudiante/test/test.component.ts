import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from './../../services/test.service';
import { PruebaVocacionalDTO, PreguntaDTO, RespuestaDTO } from '../../../shared/models/test.model';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class TestComponent implements OnInit {
  currentStep = 0;
  answers: RespuestaDTO[] = [];
  result: PruebaVocacionalDTO | null = null;
  questions: PreguntaDTO[] = [];
  loading = false;
  error = '';

  constructor(private testService: TestService) { }

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  cargarPreguntas(): void {
    this.loading = true;
    this.error = '';
    
    this.testService.obtenerPreguntas().subscribe({
      next: (preguntas) => {
        this.questions = preguntas;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar preguntas:', error);
        this.error = 'Error al cargar las preguntas';
        this.loading = false;
      }
    });
  }

  handleAnswer(puntuacion: number): void {
    if (this.questions.length === 0) return;

    const newAnswer: RespuestaDTO = {
      idPregunta: this.questions[this.currentStep].id,
      puntuacion
    };
    
    this.answers.push(newAnswer);
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
    } else {
      this.calcularResultado();
    }
  }

  calcularResultado(): void {
    this.loading = true;
    
    this.testService.calcularResultado(this.answers).subscribe({
      next: (resultado) => {
        this.result = resultado;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al calcular resultado:', error);
        this.error = 'Error al calcular el resultado';
        this.loading = false;
      }
    });
  }

  resetTest(): void {
    this.currentStep = 0;
    this.answers = [];
    this.result = null;
    this.cargarPreguntas();
  }

  getProgress(): number {
    return this.questions.length ? (this.currentStep / this.questions.length) * 100 : 0;
  }
}
