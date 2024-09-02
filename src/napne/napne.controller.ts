import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NapneService } from './napne.service';
import { CreateNapneDto } from './dto/create-napne.dto';
import { UpdateNapneDto } from './dto/update-napne.dto';

@Controller('napne')
export class NapneController {
  constructor(private readonly napneService: NapneService) {}

  @Post()
  create(@Body() createNapneDto: CreateNapneDto) {
    return this.napneService.create(createNapneDto);
  }

  @Get()
  findAll() {
    return this.napneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.napneService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNapneDto: UpdateNapneDto) {
    return this.napneService.update(+id, updateNapneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.napneService.remove(+id);
  }
}
