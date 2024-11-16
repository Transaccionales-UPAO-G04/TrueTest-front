import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importar Router

interface Question {
  id: number;
  text: string;
  area: string;
}

interface Answer {
  idPregunta: number;
  puntuacion: number;
}

interface ResultArea {
  icon: string;
  carrera: string;
  color: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class TestComponent implements OnInit {
  currentStep = 0;
  answers: Answer[] = [];
  result: any = null;
  
  questions: Question[] = [
    {
      id: 1,
      text: "¿Qué tanto disfrutas resolviendo problemas matemáticos?",
      area: "Ciencias"
    },
    {
      id: 2,
      text: "¿Te interesa analizar el comportamiento humano?",
      area: "Humanidades"
    },
    {
      id: 3,
      text: "¿Disfrutas creando o apreciando obras de arte?",
      area: "Artes"
    },
    {
      id: 4,
      text: "¿Te atrae la idea de dirigir un negocio?",
      area: "Negocios"
    }
  ];

  areas: { [key: string]: ResultArea } = {
    "Ciencias": { icon: 'calculator', carrera: "Ingeniería", color: "bg-blue-500" },
    "Humanidades": { icon: 'book', carrera: "Psicología", color: "bg-green-500" },
    "Artes": { icon: 'brush', carrera: "Diseño Gráfico", color: "bg-purple-500" },
    "Negocios": { icon: 'building', carrera: "Administración", color: "bg-yellow-500" },
    "Medicina": { icon: 'stethoscope', carrera: "Medicina", color: "bg-red-500" } // Agregar Medicina
  };

  descriptions = [
    'Totalmente en desacuerdo',
    'En desacuerdo',
    'Neutral',
    'De acuerdo',
    'Totalmente de acuerdo'
  ];

  constructor(private router: Router) { } // Inyectar Router en el constructor

  ngOnInit(): void { }

  handleAnswer(puntuacion: number): void {
    const newAnswer = {
      idPregunta: this.questions[this.currentStep].id,
      puntuacion
    };
    
    this.answers.push(newAnswer);
    
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
    } else {
      this.calculateResult();
    }
  }

  calculateResult(): void {
    // Simulación de resultado - aquí conectarías con tu backend
    const areaKeys = Object.keys(this.areas);
    const randomArea = areaKeys[Math.floor(Math.random() * areaKeys.length)];
    this.result = this.areas[randomArea];
  }

  resetTest(): void {
    this.currentStep = 0;
    this.answers = [];
    this.result = null;
  }

  getProgress(): number {
    return (this.currentStep / this.questions.length) * 100;
  }

  goToMentors(): void {
    // Aquí puedes redirigir a la página de mentores
    this.router.navigate(['/mentores']);
  }
}