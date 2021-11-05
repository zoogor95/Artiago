import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { Event } from './event.entity';
import { EventDto } from './createEventDto';
var fs = require('fs');
@Injectable()
export class EventService {

    constructor(@InjectRepository(Event) private eventRepository: Repository<Event>) { }

    async getEvents(): Promise<any[]> {
        return await this.eventRepository.findAndCount();
    }

    async getEvent(_id: number): Promise<Event> {
        return await this.eventRepository.findOne({
            select: [
                "name",
                "description",
                "additionalInformation",
                "bannerImage",
            ],
            where: [{ "id": _id }]
        });
    }

    async updateEvent(event: Event) {
        let where: FindConditions<Event> = { id: event.id }
        delete event.id;
        return await this.eventRepository.update(where, event);
    }

    async deleteEvent(event: number) {
        return await this.eventRepository.softDelete(event);
    }

    async createEvent(event: Event) {
        let image = event.bannerImage;
        event.bannerImage = ''
        let createdEvent = await this.eventRepository.insert(event);
        let eventId = createdEvent.identifiers.length> 0 ? createdEvent.identifiers[0].id: 0;
        if(eventId && image.includes('base64')) {
            let ext = 'png';
            let buff = Buffer.from(image.split(',')[1], 'base64');
            if(image.includes('data:image/png')) {
                ext = 'png';
            } else if(image.includes('data:image/jpg') || image.includes('data:image/jpeg')) {
                ext = 'jpg';
            }
            let imageName = `${Date.now()}.${ext}`;
            fs.writeFileSync('public/'+imageName, buff);
            
            
            let where: FindConditions<Event> = { id: eventId }
            return await this.eventRepository.update(where, {bannerImage: imageName });
        }

    }

}

