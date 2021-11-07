import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';

import { DialogService } from 'primeng/dynamicdialog';
import { FileUpload } from 'primeng/fileupload';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private apiService: ApiService, public dialogService: DialogService) { }

  items: any[] = [];
  totalCount: number = 0;
  isDialogOpen=false;
  isTableLoading=false;
  categories: any[] = []
  itemModel: {id?: number; name: string; description: string; companyName: string} = {
    id: undefined,
    name: '',
    description: '',
    companyName: '',
  }

  ngOnInit(): void {
    this.isTableLoading = true;
    this.apiService.get('category').then((res: any[])=> {
      this.categories = res.length > 0 ? res[0] : [];
      this.isTableLoading = false;
    });
    this.getItems();
  }

  async getItems() {
    this.isTableLoading = true;
    let data = await this.apiService.get('items');
    this.isTableLoading = false;
    this.items = data.length > 0 ? data[0]: [];
    this.totalCount = data.length > 1 ? data[1]: 0;
  }

  isFormValid() {
    if(this.itemModel.name.trim()  && this.itemModel.description.trim() ) {
      return true;
    }
    return false;
  }
  
  async addItemModal(id?: number) {
    this.itemModel = {
      id: undefined,
      name: '',
      description: '',
      companyName: '',
   }
    if(id) {
      this.itemModel = await this.apiService.get(`items/${id}`);
    }
    this.isDialogOpen = true;
  }
  images: any[] = [];
  @ViewChild('fileUploader') fileUploader!: FileUpload;
  async SaveItem() {
    this.itemModel.name = this.itemModel.name.trim();
    this.itemModel.description = this.itemModel.description.trim();
    this.itemModel.companyName = this.itemModel.companyName.trim();
    this.isDialogOpen = false;
    this.isTableLoading = true;
    await this.apiService.post('items', this.itemModel);
    this.getItems();
  }
  
}
