import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, Query } from '@nestjs/common';
import { RoomTypesService } from './room-types.service';
import { CreateRoomTypeDto, QueryRoomTypesDto, UpdateRoomTypeDto } from './dto/room-type.dto';
import { ZodValidationPipe } from 'nestjs-zod';
import { Public } from '../auth/decorators/public.decorator';

@Controller('room-types')
export class RoomTypesController {
    constructor(private readonly roomTypesService: RoomTypesService) { }

    @Post()
    @UsePipes(ZodValidationPipe)
    create(@Body() createRoomTypeDto: CreateRoomTypeDto) {

        return this.roomTypesService.create(createRoomTypeDto);
    }

    @Public()
    @Get()
    @UsePipes(ZodValidationPipe)
    findAll(@Query() query: QueryRoomTypesDto) {
        return this.roomTypesService.findAll(query);
    }

    @Public()
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.roomTypesService.findOne(id);
    }

    @Patch(':id')
    @UsePipes(ZodValidationPipe)
    update(@Param('id') id: string, @Body() updateRoomTypeDto: UpdateRoomTypeDto) {
        return this.roomTypesService.update(id, updateRoomTypeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roomTypesService.remove(id);
    }
}
