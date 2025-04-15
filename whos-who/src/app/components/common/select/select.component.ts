import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select',
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent implements OnInit {
  @Input() options: any = [];
  isDropdownOpen: boolean = false;

  constructor() {}

  ngOnInit() {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
}
