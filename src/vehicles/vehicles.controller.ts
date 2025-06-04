import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './vehicle.entity';
import { VehicleQueryDto } from './dto/vehicle-query.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Post()
  create(@Body() vehicle: Partial<Vehicle>): Promise<Vehicle> {
    return this.vehiclesService.create(vehicle);
  }
  @Get()
  findAll(@Query() query: VehicleQueryDto) {
    return this.vehiclesService.findAll(query);
  }
}
