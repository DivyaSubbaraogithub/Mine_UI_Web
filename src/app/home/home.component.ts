import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
declare var $: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class MainContentComponent {
  @ViewChild('registerCompanyModal') registerCompanyModal: any;
  userForm: FormGroup;
  selectedItem: any;
  isUpdate: boolean = true;
  listData: any[];

  displayedColumns: string[] = ['position', 'name', 'email', 'company', 'actions'];


  constructor(private fb: FormBuilder, private sharedService: SharedService) {
    this.listData = [];
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      company: ['', Validators.required]
    });
    this.listData = [
      { position: 1, name: 'Divya', email: 'divyas@gmail.com', company: 'Google' },
      { position: 2, name: 'Divi', email: 'divi@gmail.com', company: 'Gmail' },
      { position: 2, name: 'Divyasubbarao', email: 'divyasubbarao@gmail.com', company: 'Youtube' }

    ];
  }
  ngOnInit(): void {
    this.sharedService.registerEvent$.subscribe(() => {
      this.onRegister();
    });
  }

  public addItem(): void {
    if (this.userForm.valid) {
      const newItem = this.userForm.value;
      newItem.position = this.listData.length + 1;
      this.userForm.reset();
      this.listData = [...this.listData, newItem];
    }
    else {
      console.log('Form is not valid');
    }
  }
  editItem(element: any): void {
    this.isUpdate = false;
    this.selectedItem = element;
    this.userForm.patchValue({
      name: element.name,
      email: element.email,
      company: element.company
    });
  }

  updateItem(): void {
    if (this.userForm.valid && this.selectedItem) {
      const updatedItem = this.userForm.value;
      console.log('updatedItem' + updatedItem.name);
      const index = this.listData.findIndex(item => item === this.selectedItem);
      if (index !== -1) {
        const updatedList = [...this.listData];
        updatedList[index] = updatedItem;
        this.listData = updatedList;
        this.userForm.reset();
        this.selectedItem = null;
      }
    } else {
      console.log('Form is not valid or selectedItem is not set');
    }
    this.isUpdate = false;
  }
  reset(): void {
    this.userForm.reset();
  }
  onRegister() {
    this.userForm.reset();
    this.isUpdate = true;

  }
  public deleteItem(item: any): void {
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      this.listData = this.listData.filter(i => i !== item);
    }
  }

}
