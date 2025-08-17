import axios from 'axios';
import { Appointment, Doctor, MedicalRecord } from '../types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

export const getAppointmentsAPI = async (): Promise<Appointment[]> => {
  const response = await apiClient.get('/api/appointments');
  return response.data.data;
};

export const getMedicalRecordsAPI = async (): Promise<MedicalRecord[]> => {
  const response = await apiClient.get('/api/medical-records');
  return response.data.data;
};

export const getDoctorsAPI = async (): Promise<Doctor[]> => {
  const response = await apiClient.get('/api/doctors');
  return response.data.data;
};

export const createAppointmentAPI = async (data: { doctor_id: number; appointment_date: string }): Promise<Appointment> => {
  const response = await apiClient.post('/api/appointments', data);
  return response.data.data;
};

export const getDoctorAppointmentsAPI = async (): Promise<Appointment[]> => {
  const response = await apiClient.get('/api/doctor/appointments');
  return response.data.data;
};

export const getRecentMedicalRecordsAPI = async (): Promise<MedicalRecord[]> => {
  const response = await apiClient.get('/api/medical-records/recent');
  return response.data.data;
};