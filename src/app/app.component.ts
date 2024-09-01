import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common'; 

interface Nota {
  asignatura: string;
  calificacion: number;
}

interface Estudiante {
  nombre: string;
  matricula: string;
  curso: string;
  notas: Nota[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  estudiante = {
    nombre: '',
    matricula: '',
    curso: '',
    notas: [] as Nota[]
  };

  estudiantes = [
    { 
      nombre: 'Carlos Mendoza', 
      matricula: 'A001', 
      curso: 'Informatica', 
      notas: [{ asignatura: 'Álgebra', calificacion: 9 }]
    },
    { 
      nombre: 'Ana Pérez', 
      matricula: 'A002', 
      curso: 'Contabilidad', 
      notas: [{ asignatura: 'Física', calificacion: 10 }]
    }
  ];

  nota: Nota = {
    asignatura: '',
    calificacion: 0  
  };

  hayEstudiantes() {
    return this.estudiantes.length > 0;
  }

  borrar(matricula: string) {
    this.estudiantes = this.estudiantes.filter(est => est.matricula !== matricula);
  }

  agregar() {
    if (!this.estudiante.nombre || !this.estudiante.matricula || !this.estudiante.curso) {
      alert('Todos los campos del estudiante son obligatorios');
      return;
    }

    if (this.estudiantes.find(est => est.matricula === this.estudiante.matricula)) {
      alert('Ya existe un estudiante con esa matrícula');
      return;
    }

    this.estudiantes.push({ ...this.estudiante, notas: [...this.estudiante.notas] });
    this.limpiarFormulario();
  }

  seleccionar(estudiante: Estudiante) {
    this.estudiante = { ...estudiante, notas: [...estudiante.notas] };
  }

  modificar() {
    const index = this.estudiantes.findIndex(est => est.matricula === this.estudiante.matricula);
    if (index !== -1) {
      this.estudiantes[index] = { ...this.estudiante };
    } else {
      alert('No existe un estudiante con esa matrícula');
    }
    this.limpiarFormulario();
  }

  agregarNota() {
    if (!this.nota.asignatura || this.nota.calificacion === 0) {
      alert('Debe ingresar una asignatura y una calificación válidas');
      return;
    }

    this.estudiante.notas.push({ ...this.nota });
    this.limpiarNota();
  }

  limpiarFormulario() {
    this.estudiante = { nombre: '', matricula: '', curso: '', notas: [] };
  }

  limpiarNota() {
    this.nota = { asignatura: '', calificacion: 0 };  
  }
}
