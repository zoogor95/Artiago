
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventDto } from './createEventDto';

@Controller('event')
export class EventController {
    
    constructor(private service: EventService) { }

    @Get(':id')
    get(@Param() params) {
        return this.service.getEvent(params.id);
    }

    @Get()
    getAll() {
        return this.service.getEvents();
    }

    @Post()
    create(@Body() event: EventDto) {
        return this.service.createEvent(event);
    }

    @Put()
    update(@Body() event: Event) {
        return this.service.updateEvent(event);
    }

    @Delete(':id')
    deleteEvent(@Param() params) {
        return this.service.deleteEvent(params.id);
    }
}
