import axios from 'axios';

const API_URL = "https://hospital-food-management-system-g5ch.onrender.com" ;

export const getPatients = async () => {
  const response = await axios.get(`${API_URL}/patients`);
  return response.data;
};

export const getPatientById = async (id: string) => {
  const response = await axios.get(`${API_URL}/patients/${id}`);
  return response.data;
};

export const createPatient = async (patient: any) => {
  const response = await axios.post(`${API_URL}/patients`, patient);
  return response.data;
};

export const deletePatient = async (id: string) => {
  const response = await axios.delete(`${API_URL}/patients/${id}`);
  return response.data;
};
