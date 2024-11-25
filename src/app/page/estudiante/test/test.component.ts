import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

interface Question {
  id: number;
  text: string;
  area: string;
  image?: string;
  description?: string;
}

interface Answer {
  idPregunta: number;
  puntuacion: number;
  area: string;
}

interface ResultArea {
  icon: string;
  carrera: string;
  color: string;
  description: string;
  materias: string[];
  perfilProfesional: string;
}

interface AreaScore {
  area: string;
  value: number;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  standalone: true,
  imports: [CommonModule],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0%)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class TestComponent implements OnInit {
  currentStep = 0;
  answers: Answer[] = [];
  result: any = null;
  showIntro = true;
  itemsPerPage = 5;
  currentPage = 1;
  timeSpent = 0;
  timer: any;
  totalPages: number = 1;
  
  readonly Math = Math; // Para usar Math en el template
  
  questions: Question[] = [
    {
      id: 1,
      text: "¿Te sientes cómodo/a analizando datos y resolviendo problemas matemáticos complejos?",
      area: "Ciencias",
      image: "assets/images/math.jpg",
      description: "Esta pregunta evalúa tu afinidad con el pensamiento lógico-matemático"
    },
    {
      id: 2,
      text: "¿Te interesa estudiar el comportamiento humano y ayudar a otros con sus problemas emocionales?",
      area: "Humanidades",
      image: "assets/images/psychology.jpg",
      description: "Evalúa tu empatía y vocación de servicio"
    },
    {
      id: 3,
      text: "¿Te gusta trabajar con tecnología y dispositivos electrónicos?",
      area: "Tecnología",
      image: "assets/images/technology.jpg",
      description: "Evalúa tu interés en la tecnología y la electrónica"
    },
    {
      id: 4,
      text: "¿Te interesa la historia y la cultura de diferentes civilizaciones?",
      area: "Humanidades",
      image: "assets/images/history.jpg",
      description: "Evalúa tu interés en la historia y la cultura"
    },
    {
      id: 5,
      text: "¿Te sientes cómodo/a trabajando en equipo y liderando proyectos?",
      area: "Administración",
      image: "assets/images/teamwork.jpg",
      description: "Evalúa tu habilidad para trabajar en equipo y liderar"
    },
    {
      id: 6,
      text: "¿Te interesa la biología y el estudio de los seres vivos?",
      area: "Ciencias",
      image: "assets/images/biology.jpg",
      description: "Evalúa tu interés en la biología y la vida"
    },
    {
      id: 7,
      text: "¿Te gusta diseñar y crear objetos o espacios?",
      area: "Arte",
      image: "assets/images/design.jpg",
      description: "Evalúa tu habilidad creativa y de diseño"
    },
    {
      id: 8,
      text: "¿Te interesa la economía y los negocios?",
      area: "Administración",
      image: "assets/images/economy.jpg",
      description: "Evalúa tu interés en la economía y los negocios"
    },
    {
      id: 9,
      text: "¿Te gusta escribir y expresarte a través de la literatura?",
      area: "Humanidades",
      image: "assets/images/literature.jpg",
      description: "Evalúa tu habilidad para escribir y expresarte"
    },
    {
      id: 10,
      text: "¿Te interesa la programación y el desarrollo de software?",
      area: "Tecnología",
      image: "assets/images/programming.jpg",
      description: "Evalúa tu interés en la programación y el desarrollo de software"
    },
    {
      id: 11,
      text: "¿Te gusta la física y el estudio de las leyes de la naturaleza?",
      area: "Ciencias",
      image: "assets/images/physics.jpg",
      description: "Evalúa tu interés en la física y las leyes de la naturaleza"
    },
    {
      id: 12,
      text: "¿Te interesa la música y la creación de obras musicales?",
      area: "Arte",
      image: "assets/images/music.jpg",
      description: "Evalúa tu interés en la música y la creación musical"
    },
    {
      id: 13,
      text: "¿Te gusta la química y el estudio de las sustancias y reacciones?",
      area: "Ciencias",
      image: "assets/images/chemistry.jpg",
      description: "Evalúa tu interés en la química y las sustancias"
    },
    {
      id: 14,
      text: "¿Te interesa la política y la gestión pública?",
      area: "Administración",
      image: "assets/images/politics.jpg",
      description: "Evalúa tu interés en la política y la gestión pública"
    },
    {
      id: 15,
      text: "¿Te gusta la fotografía y la captura de imágenes?",
      area: "Arte",
      image: "assets/images/photography.jpg",
      description: "Evalúa tu interés en la fotografía y la captura de imágenes"
    },
    {
      id: 16,
      text: "¿Te interesa la psicología y el estudio del comportamiento humano?",
      area: "Humanidades",
      image: "assets/images/psychology.jpg",
      description: "Evalúa tu interés en la psicología y el comportamiento humano"
    },
    {
      id: 17,
      text: "¿Te gusta la ingeniería y la resolución de problemas técnicos?",
      area: "Tecnología",
      image: "assets/images/engineering.jpg",
      description: "Evalúa tu interés en la ingeniería y la resolución de problemas técnicos"
    },
    {
      id: 18,
      text: "¿Te interesa la medicina y el cuidado de la salud?",
      area: "Ciencias",
      image: "assets/images/medicine.jpg",
      description: "Evalúa tu interés en la medicina y el cuidado de la salud"
    },
    {
      id: 19,
      text: "¿Te gusta la arquitectura y el diseño de espacios?",
      area: "Arte",
      image: "assets/images/architecture.jpg",
      description: "Evalúa tu interés en la arquitectura y el diseño de espacios"
    },
    {
      id: 20,
      text: "¿Te interesa la educación y la enseñanza?",
      area: "Humanidades",
      image: "assets/images/education.jpg",
      description: "Evalúa tu interés en la educación y la enseñanza"
    }
  ];

  areas: { [key: string]: ResultArea } = {
    "Ciencias": {
      icon: 'calculator',
      carrera: "Ingeniería",
      color: "bg-blue-500",
      description: "Las carreras de ciencias requieren pensamiento analítico y resolución de problemas.",
      materias: ["Matemáticas", "Física", "Química", "Programación"],
      perfilProfesional: "Profesionales analíticos con fuerte base en ciencias exactas"
    },
    "Humanidades": {
      icon: 'book',
      carrera: "Psicología",
      color: "bg-green-500",
      description: "Las carreras de humanidades se centran en el estudio del comportamiento y la sociedad.",
      materias: ["Psicología Social", "Neurociencia", "Estadística", "Terapia"],
      perfilProfesional: "Profesionales enfocados en el desarrollo humano y social"
    },
    "Tecnología": {
      icon: 'laptop',
      carrera: "Informática",
      color: "bg-purple-500",
      description: "Las carreras de tecnología se centran en el desarrollo y la innovación tecnológica.",
      materias: ["Programación", "Redes", "Base de Datos", "Inteligencia Artificial"],
      perfilProfesional: "Profesionales innovadores y con habilidades técnicas avanzadas"
    },
    "Administración": {
      icon: 'briefcase',
      carrera: "Administración de Empresas",
      color: "bg-yellow-500",
      description: "Las carreras de administración se centran en la gestión y el liderazgo empresarial.",
      materias: ["Economía", "Marketing", "Finanzas", "Gestión de Proyectos"],
      perfilProfesional: "Profesionales con habilidades de liderazgo y gestión empresarial"
    },
    "Arte": {
      icon: 'paint-brush',
      carrera: "Diseño Gráfico",
      color: "bg-red-500",
      description: "Las carreras de arte se centran en la creatividad y la expresión artística.",
      materias: ["Diseño", "Fotografía", "Arte Digital", "Historia del Arte"],
      perfilProfesional: "Profesionales creativos y con habilidades artísticas"
    }
  };

  descriptions = [
    'Totalmente en desacuerdo',
    'En desacuerdo',
    'Neutral',
    'De acuerdo',
    'Totalmente de acuerdo'
  ];

  areaScores: AreaScore[] = [];

  constructor(private router: Router) {
    this.totalPages = Math.ceil(this.questions.length / this.itemsPerPage);
  }

  ngOnInit(): void {
    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  getAnswerPuntuacion(step: number): number | undefined {
    const answer = this.answers.find(a => a.idPregunta === this.questions[step].id);
    return answer?.puntuacion;
  }

  startTimer(): void {
    this.timer = setInterval(() => {
      this.timeSpent++;
    }, 1000);
  }

  stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  startTest(): void {
    this.showIntro = false;
  }

  handleAnswer(puntuacion: number): void {
    const currentQuestion = this.questions[this.currentStep];
    const newAnswer = {
      idPregunta: currentQuestion.id,
      puntuacion,
      area: currentQuestion.area
    };
    
    const existingAnswerIndex = this.answers.findIndex(a => a.idPregunta === currentQuestion.id);
    if (existingAnswerIndex !== -1) {
      this.answers[existingAnswerIndex] = newAnswer;
    } else {
      this.answers.push(newAnswer);
    }
    
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
      this.updatePage();
    } else {
      this.stopTimer();
      this.calculateResult();
    }
  }

  updatePage(): void {
    this.currentPage = Math.floor(this.currentStep / this.itemsPerPage) + 1;
  }

  calculateResult(): void {
    const areaScores: { [key: string]: number } = {};
    
    this.answers.forEach(answer => {
      if (!areaScores[answer.area]) {
        areaScores[answer.area] = 0;
      }
      areaScores[answer.area] += answer.puntuacion;
    });

    // Normalizar puntuaciones y crear array para la vista
    this.areaScores = Object.entries(areaScores).map(([area, score]) => {
      const questionCount = this.questions.filter(q => q.area === area).length;
      return {
        area,
        value: (score / (questionCount * 5)) * 100
      };
    });

    // Encontrar el área con mayor puntaje
    const topArea = this.areaScores.reduce((a, b) => 
      b.value > a.value ? b : a
    ).area;

    this.result = {
      ...this.areas[topArea],
      scores: this.areaScores,
      timeSpent: this.timeSpent
    };

    // Guardar resultados en localStorage
    localStorage.setItem('testResult', JSON.stringify(this.result));
  }

  getPaginatedQuestions(): Question[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.questions.slice(start, end);
  }

  getPageNumbers(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.currentStep = (page - 1) * this.itemsPerPage;
    }
  }

  resetTest(): void {
    this.currentStep = 0;
    this.currentPage = 1;
    this.answers = [];
    this.result = null;
    this.timeSpent = 0;
    this.startTimer();
  }

  getProgress(): number {
    return (this.currentStep / this.questions.length) * 100;
  }

  goToMentors(): void {
    this.router.navigate(['/mentores']);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  nextQuestion(): void {
    if (this.getAnswerPuntuacion(this.currentStep) !== undefined) {
      this.currentStep++;
      this.updatePage();
    } else {
      alert("Por favor, responde la pregunta antes de continuar.");
    }
  }

  previousQuestion(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.updatePage();
    }
  }

  selectedFeedback(): void {
    // Aquí podrías agregar una animación o un cambio de color temporal
  }
}