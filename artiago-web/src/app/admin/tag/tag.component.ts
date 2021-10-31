import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  constructor(private apiService: ApiService, public dialogService: DialogService) { }

  tags: any[] = [];
  totalCount: number = 0;
  isDialogOpen=false;
  isTableLoading=false;
  categories: any[] = []
  tagModel: {id?: number; name: string; description: string; category_id: number | null} = {
    id: undefined,
    name: '',
    description: '',
    category_id: null,
  }

  ngOnInit(): void {
    this.isTableLoading = true;
    this.apiService.get('category').then((res: any[])=> {
      this.categories = res.length > 0 ? res[0] : [];
      this.isTableLoading = false;
    });
    this.getTags();
  }

  async getTags() {
    this.isTableLoading = true;
    let data = await this.apiService.get('tag');
    this.isTableLoading = false;
    this.tags = data.length > 0 ? data[0]: [];
    this.totalCount = data.length > 1 ? data[1]: 0;
  }

  isFormValid() {
    if(this.tagModel.name.trim() && this.tagModel.description && this.tagModel.description.trim() && this.tagModel.category_id ) {
      return true;
    }
    return false;
  }
  
  async addTagModal(id?: number) {
    this.tagModel = {
      id: undefined,
      name: '',
      description: '',
      category_id: null,
    }
    if(id) {
      this.tagModel = await this.apiService.get(`tag/${id}`);
    }
    this.isDialogOpen = true;
  }

  async SaveTag() {
    this.tagModel.name = this.tagModel.name.trim();
    this.tagModel.description = this.tagModel.description.trim();
    this.isTableLoading = true;
    await this.apiService.post('tag', this.tagModel);
    this.getTags();
    this.isDialogOpen = false;
  }
}
