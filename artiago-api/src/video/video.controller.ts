
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Video } from './video.entity';
import { VideoService } from './video.service';
import { VideoDto } from './createVideoDto';

@Controller('videos')
export class VideoController {
    
    constructor(private service: VideoService) { }

    @Get(':id')
    async get(@Param() params) {
        return await this.service.getVideo(params.id);
    }

    @Get()
    async getAll() {
        try {

            return await this.service.getVideos();
        }catch(ex){
            console.log('error: ', ex)
        }
    }

    @Post()
    async create(@Body() video: Video) {
        
        console.log('111111111111111111111111111111')
        if(video.id) {
            return await this.service.updateVideo(video);
        }
        return await this.service.createVideo(video);
    }

    @Delete(':id')
    async deleteVideo(@Param() params) {
        return this.service.deleteVideo(params.id);
    }
    
}
