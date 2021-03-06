import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

import { DialogService } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {

  constructor(private apiService: ApiService, public dialogService: DialogService) { }

  events: any[] = [];
  totalCount: number = 0;
  isDialogOpen=false;
  isTableLoading=false;
  categories: any[] = []
  eventModel: {id?: number; name: string; description: string; additionalInformation: string; bannerImage: string} = {
    id: undefined,
    name: '',
    description: '',
    bannerImage: '',
    additionalInformation: '',
  }

  ngOnInit(): void {
    this.isTableLoading = true;
    this.apiService.get('category').then((res: any[])=> {
      this.categories = res.length > 0 ? res[0] : [];
      this.isTableLoading = false;
    });
    this.getEvents();
  }

  async getEvents() {
    this.isTableLoading = true;
    let data = await this.apiService.get('events');
    this.isTableLoading = false;
    this.events = data.length > 0 ? data[0]: [];
    this.totalCount = data.length > 1 ? data[1]: 0;
  }

  isFormValid() {
    if(this.eventModel.name.trim()  && this.eventModel.description.trim() ) {
      return true;
    }
    return false;
  }
  
  async addEventModal(id?: number) {
    this.eventModel = {
      id: undefined,
      name: '',
      description: '',
      additionalInformation: '',
      bannerImage: '',
    }
    if(id) {
      this.eventModel = await this.apiService.get(`events/${id}`);
    }
    this.isDialogOpen = true;
  }
  images: any[] = [];
  @ViewChild('fileUploader') fileUploader!: FileUpload;
  async SaveEvent() {
    this.eventModel.name = this.eventModel.name.trim();
    this.eventModel.description = this.eventModel.description.trim();
    let base64 = await this.toBase64(this.fileUploader.files[0]);
    base64 ? this.eventModel.bannerImage = base64 as string: false;
    this.isTableLoading = true;
    await this.apiService.post('events', this.eventModel);
    this.getEvents();
    this.isDialogOpen = false;
  }

  toBase64 = (file: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  
  getImage(imageName: string) {
    return `${environment.images}${imageName}`;
  }
}
