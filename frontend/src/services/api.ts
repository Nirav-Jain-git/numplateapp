import axios from 'axios';
import { VehicleData } from '../types/navigation';

const API_URL = 'http://localhost:3000';

export const api = {
  async detectPlate(imageBase64: string): Promise<string> {
    const response = await axios.post(`${API_URL}/detect`, { image: imageBase64 });
    return response.data.plateNumber;
  },

  async checkPlate(plateNumber: string): Promise<{ exists: boolean; data?: VehicleData }> {
    const response = await axios.get(`${API_URL}/check/${plateNumber}`);
    return response.data;
  },

  async registerVehicle(data: VehicleData): Promise<void> {
    await axios.post(`${API_URL}/register`, data);
  }
};