import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [DialogService]
})
export class UserComponent implements OnInit {

  constructor(private apiService: ApiService, public dialogService: DialogService) { }

  users: any[] = [];
  totalCount: number = 0;
  isDialogOpen=false;
  selectedType = null;
  isTableLoading=false;
  types: any[] = [{label: 'SuperAdmin', value: 1}, {label: 'Admin', value: 2}]
  async ngOnInit(): Promise<void> {
    this.getUsers();
  }

  @ViewChild('userDialog') userDialog!: ElementRef;
  async addUserModal(id?: number) {
    if(id) {
      this.userModel = await this.apiService.get(`user/${id}`);
    }
    this.isDialogOpen = true;
  }

  userModel: {id?: number; username: string; password?: string; type: number | null} = {
    id: undefined,
    username: '',
    password: '',
    type: null,
  }

  isFormValid() {
    if(this.userModel.username.trim() && (this.userModel.id || (this.userModel.password as string).trim()) && this.userModel.type ) {
      return true;
    }
    return false;
  }

  async SaveUser() {
    this.userModel.username = this.userModel.username.trim();
    this.userModel.password = this.userModel.id ? undefined : (this.userModel.password as string).trim();
    this.isTableLoading = true;
    await this.apiService.post('user', this.userModel);
    this.getUsers();
    this.isDialogOpen = false;
  }

  async getUsers() {
    this.isTableLoading = true;
    let data = await this.apiService.get('user');
    this.isTableLoading = false;
    this.users = data.length > 0 ? data[0]: [];
    this.totalCount = data.length > 1 ? data[1]: 0;
  }
}
