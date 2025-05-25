import { PartialType } from '@nestjs/mapped-types';
import { CreateMataKuliahDto } from './create-mata-kuliah.dto';

export class UpdateMataKuliahDto extends PartialType(CreateMataKuliahDto) {}
