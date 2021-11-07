import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions, Repository } from 'typeorm';
import { Video } from './video.entity';
import { VideoDto } from './createVideoDto';
var fs = require('fs');
@Injectable()
export class VideoService {

    constructor(@InjectRepository(Video) private videoRepository: Repository<Video>) { }

    async getVideos(): Promise<any[]> {
        return await this.videoRepository.findAndCount();
    }

    async getVideo(_id: number): Promise<Video> {
        return await this.videoRepository.findOne({
            select: [
                "name",
                "description",
                "videoLink",
                "thumbnail",
            ],
            where: [{ "id": _id }]
        });
    }

    async updateVideo(video: Video) {
        let where: FindConditions<Video> = { id: video.id }
        delete video.id;
        return await this.videoRepository.update(where, video);
    }

    async deleteVideo(video: number) {
        return await this.videoRepository.softDelete(video);
    }

    async createVideo(video: Video) {
        let image = video.thumbnail;
        video.thumbnail = ''
        let createdVideo = await this.videoRepository.insert(video);
        let videoId = createdVideo.identifiers.length> 0 ? createdVideo.identifiers[0].id: 0;
        if(videoId && image.includes('base64')) {
            let ext = 'png';
            let buff = Buffer.from(image.split(',')[1], 'base64');
            if(image.includes('data:image/png')) {
                ext = 'png';
            } else if(image.includes('data:image/jpg') || image.includes('data:image/jpeg')) {
                ext = 'jpg';
            }
            let imageName = `${Date.now()}.${ext}`;
            fs.writeFileSync('public/'+imageName, buff);
            
            
            let where: FindConditions<Video> = { id: videoId }
            return await this.videoRepository.update(where, {thumbnail: imageName });
        }

    }

}

