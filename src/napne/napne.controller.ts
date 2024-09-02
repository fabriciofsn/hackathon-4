import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NapneService } from './napne.service';
import { CreateNapneDto } from './dto/create-napne.dto';
import { UpdateNapneDto } from './dto/update-napne.dto';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/decorator/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('napne')
@UseGuards(RolesGuard)
export class NapneController {
  constructor(private readonly napneService: NapneService) {}

  @Post()
  @Roles(Role.Napne)
  create(@Body() createNapneDto: CreateNapneDto) {
    return this.napneService.create(createNapneDto);
  }

  @Get()
  @Roles(Role.Napne)
  findAll() {
    return this.napneService.findAll();
  }

  @Get(':id')
  @Roles(Role.Napne)
  findOne(@Param('id') id: string) {
    return this.napneService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.Napne)
  update(@Param('id') id: string, @Body() updateNapneDto: UpdateNapneDto) {
    return this.napneService.update(+id, updateNapneDto);
  }

  @Delete(':id')
  @Roles(Role.Napne)
  remove(@Param('id') id: string) {
    return this.napneService.remove(+id);
  }
}
