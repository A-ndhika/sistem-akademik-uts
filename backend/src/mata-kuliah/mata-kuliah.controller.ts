import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { MataKuliahService } from './mata-kuliah.service';
import { CreateMataKuliahDto } from './dto/create-mata-kuliah.dto';
import { UpdateMataKuliahDto } from './dto/update-mata-kuliah.dto';

@Controller('mata-kuliah')
export class MataKuliahController {
  constructor(private readonly service: MataKuliahService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':kode')
  findOne(@Param('kode') kode: string) {
    const mk = this.service.findOne(kode);
    if (!mk) {
      throw new NotFoundException(`Mata kuliah dengan kode ${kode} tidak ditemukan`);
    }
    return mk;
  }

  @Post()
  create(@Body() dto: CreateMataKuliahDto) {
    try {
      return this.service.create(dto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put(':kode')
  update(@Param('kode') kode: string, @Body() dto: UpdateMataKuliahDto) {
    const updated = this.service.update(kode, dto);
    if (!updated) {
      throw new NotFoundException(`Mata kuliah dengan kode ${kode} tidak ditemukan`);
    }
    return updated;
  }

  @Delete(':kode')
  remove(@Param('kode') kode: string) {
    const deleted = this.service.remove(kode);
    if (!deleted) {
      throw new NotFoundException(`Mata kuliah dengan kode ${kode} tidak ditemukan`);
    }
    return deleted;
  }
}
