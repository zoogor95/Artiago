import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/shared/services/api.service'
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private apiService: ApiService, public dialogService: DialogService) { }
  category: any[] = [];
  totalCount: number = 0;
  isDialogOpen=false;
  isTableLoading=false;
  categories: any[] = [];
   categoryModel: {id?: number; name: string;} = {
    id: undefined,
    name: '',
    }

    isFormValid() {
    if(this.categoryModel.name.trim() && this.categoryModel.id ) {
      return true;
    }
    return false;
  }

  async getTags() {
    this.isTableLoading = false;
    let data = await this.apiService.get('category');
    this.isTableLoading = false;
    this.category = data.length > 0 ? data[0]: [];
    this.totalCount = data.length > 1 ? data[1]: 0;
  }

  
  async addcategoryModal(id?: number) {
    this.categoryModel = {
      id: undefined,
      name: '',
    
    }
    if(id){
      this.categoryModel = await this.apiService.get(`category/${id}`);
    }
    this.isDialogOpen = true;
  }

   async SaveTag() {
    this.categoryModel.name = this.categoryModel.name.trim();
    this.isTableLoading = true;
    await this.apiService.post('category', this.categoryModel);
    this.getTags();
    this.isDialogOpen = false;
  }

  ngOnInit(): void {
    this.isTableLoading = true;
    this.getTags();
  }

}
