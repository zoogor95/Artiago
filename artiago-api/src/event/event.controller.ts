
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Event } from './event.entity';
import { EventService } from './event.service';
import { EventDto } from './createEventDto';

@Controller('events')
export class EventController {
    
    constructor(private service: EventService) { }

    @Get(':id')
    async get(@Param() params) {
        return await this.service.getEvent(params.id);
    }

    @Get()
    async getAll() {
        try {

            return await this.service.getEvents();
        }catch(ex){
            console.log('error: ', ex)
        }
    }

    @Post()
    async create(@Body() event: Event) {
        
        console.log('111111111111111111111111111111')
        if(event.id) {
            return await this.service.updateEvent(event);
        }
        return await this.service.createEvent(event);
    }

    @Delete(':id')
    async deleteEvent(@Param() params) {
        return this.service.deleteEvent(params.id);
    }
    
}
