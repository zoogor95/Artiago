import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

import { DialogService } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-session-video',
  templateUrl: './session-video.component.html',
  styleUrls: ['./session-video.component.css']
})
export class SessionVideoComponent implements OnInit {

  constructor(private apiService: ApiService, public dialogService: DialogService) { }

  videos: any[] = [];
  totalCount: number = 0;
  isDialogOpen=false;
  isTableLoading=false;
  categories: any[] = []
  videoModel: {id?: number; name: string; description: string; videoLink: string; thumbnail: string} = {
    id: undefined,
    name: '',
    description: '',
    thumbnail: '',
    videoLink: '',
  }

  ngOnInit(): void {
    this.isTableLoading = true;
    this.apiService.get('category').then((res: any[])=> {
      this.categories = res.length > 0 ? res[0] : [];
      this.isTableLoading = false;
    });
    this.getVideos();
  }

  async getVideos() {
    this.isTableLoading = true;
    let data = await this.apiService.get('videos');
    this.isTableLoading = false;
    this.videos = data.length > 0 ? data[0]: [];
    this.totalCount = data.length > 1 ? data[1]: 0;
  }

  isFormValid() {
    if(this.videoModel.name.trim()  && this.videoModel.description.trim() ) {
      return true;
    }
    return false;
  }
  
  async addVideoModal(id?: number) {
    this.videoModel = {
      id: undefined,
      name: '',
      description: '',
      videoLink: '',
      thumbnail: '',
    }
    if(id) {
      this.videoModel = await this.apiService.get(`videos/${id}`);
    }
    this.isDialogOpen = true;
  }
  images: any[] = [];
  @ViewChild('fileUploader') fileUploader!: FileUpload;
  async SaveVideo() {
    this.videoModel.name = this.videoModel.name.trim();
    this.videoModel.description = this.videoModel.description.trim();
    //let base64 = await this.toBase64(this.fileUploader.files[0]);
    //base64 ? this.videoModel.thumbnail = base64 as string: false;
    this.isDialogOpen = false;
    this.isTableLoading = true;
    await this.apiService.post('videos', this.videoModel);
    this.getVideos();
  }

  // toBase64 = (file: Blob) => new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => resolve(reader.result);
  //   reader.onerror = error => reject(error);
  // });
  
  getImage(imageName: string) {
    return `${environment.images}${imageName}`;
  }

}
