export type RootStackParamList = {
  Camera: undefined;
  Result: { image: string };
  Registration: { plateNumber: string };
};

export interface VehicleData {
  plateNumber: string;
  ownerName: string;
  phoneNumber: string;
  validityStart: string;
  validityEnd: string;
}