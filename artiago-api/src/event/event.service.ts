import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { EventDto } from './createEventDto';

@Injectable()
export class EventService {

    constructor(@InjectRepository(Event) private eventRepository: Repository<Event>) { }

    async getEvents(): Promise<Event[]> {
        return await this.eventRepository.find();
    }

    async getEvent(_id: number): Promise<Event> {
        return await this.eventRepository.findOne({
            select: [
                "name",
                "description",
                "additionalInformation",
                "eventBanner",
            ],
            where: [{ "id": _id }]
        });
    }

    async updateEvent(event: Event) {
        this.eventRepository.save(event)
    }

    async deleteEvent(event: Event) {
        this.eventRepository.softDelete(event);
    }

    async createEvent(event: EventDto) {
        this.eventRepository.create(event);
    }
}

