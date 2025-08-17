export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    description: string;
    photo_url: string; // Am adăugat această linie
    price: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Appointment {
  id: number;
  appointment_date: string;
  appointment_time: string;
  doctor: Doctor;
  user: User;
}

export interface MedicalRecord {
  id: number;
  type: 'Analize' | 'Rețetă' | 'Trimitere';
  issued_date: string;
  doctor: Doctor;
}

export interface Doctor {
    id: number;
    name: string;
    specialty: string;
    description: string;
    photo_url: string; 
    price: number;
}