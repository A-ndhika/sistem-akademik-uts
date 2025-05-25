import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MahasiswaModule } from './mahasiswa/mahasiswa.module';
import { MataKuliahModule } from './mata-kuliah/mata-kuliah.module';

@Module({
  imports: [MahasiswaModule, MataKuliahModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
