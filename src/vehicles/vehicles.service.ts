import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepo: Repository<Vehicle>,
  ) {}

  create(data: Partial<Vehicle>): Promise<Vehicle> {
    if (!data.manufactured_date) {
      throw new Error('manufactured_date is required');
    }

    const manufacturedYear = new Date(data.manufactured_date).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - manufacturedYear;

    const vehicle = this.vehicleRepo.create({
      ...data,
      age_of_vehicle: age,
    });

    return this.vehicleRepo.save(vehicle);
  }
}
