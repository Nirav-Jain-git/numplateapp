const vehicles = new Map();

module.exports = {
  async checkVehicle(plateNumber) {
    return vehicles.get(plateNumber);
  },
  
  async registerVehicle(data) {
    vehicles.set(data.plateNumber, data);
    return true;
  }
};