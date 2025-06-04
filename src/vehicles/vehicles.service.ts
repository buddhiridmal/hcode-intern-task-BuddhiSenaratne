import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleQueryDto } from './dto/vehicle-query.dto';

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
  async findAll(query: VehicleQueryDto): Promise<Vehicle[]> {
    const take = Number(query.limit) || 10;
    const skip = Number(query.offset) || 0;
    const order = query.order || 'ASC';

    const where: Record<string, any> = {};
    if (query.car_make) where['car_make'] = query.car_make;
    if (query.car_model) where['car_model'] = query.car_model;

    return this.vehicleRepo.find({
      where,
      take,
      skip,
      order: { manufactured_date: order },
    });
  }
}
