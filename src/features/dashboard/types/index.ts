export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  avatar_url: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Appointment {
  id: number;
  appointment_date: string;
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
  avatar_url: string;
}