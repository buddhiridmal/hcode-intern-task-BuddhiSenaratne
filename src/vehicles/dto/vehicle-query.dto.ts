export class VehicleQueryDto {
  limit?: number;
  offset?: number;
  car_make?: string;
  car_model?: string;
  order?: 'ASC' | 'DESC';
}
