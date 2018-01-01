import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import './ngx-multi-select-dropdown.css';

@Component({
    selector: 'multi-select-dropdown',
    // templateUrl: './ngx-multi-select-dropdown.html'
    template: `<div clickOutside (clickOutside)="close()" class="multi-select-dropdown">
    <div class="dropdown-toggle-section" (click)="toggle()">
        <div class="dropdown-toggle-section-content">
            <div *ngIf="singleSelection && selectedItem">
                <div *ngIf="type == 'Object'">
                    {{selectedItem[displayName]}}
                </div>
                <div [hidden]="type == 'Object'">
                    <label>{{selectedItem}}</label>
                </div>
            </div>
            <div *ngIf="!singleSelection && selectedItems && selectedItems.length > 0">
                <div class="selected-items-count">{{selectedItems.length}} &nbsp;Selected</div>
            </div>
            <div *ngIf="!isSelectedItemNotEmpty()">Select</div>
        </div>
        <div class="dropdown-toggle-section-icon">
            <icon class="dropdown-arrow" [symbol]="'chevron-down'" [circleBorder]="false" [size]="'lg'"></icon>
        </div>
    </div>
    <div *ngIf="isOpen" class="dropdown-menu-section">
        <div *ngIf="enableSearch" class="dropdown-menu-search-section">
            <input class="option-search-bar" 
                   type="text" 
                   [(ngModel)]="searchText" 
                   placeholder="Search..." 
                   (change)="search()"/>
            <div class="clear-search-btn" 
                 (click)="clearSearch()">
                <i class="fa fa-close"></i>
            </div>
        </div>
        <div class="dropdown-menu-list-section">
            <div *ngIf="filteredOptions && filteredOptions.length > 0">
                <div *ngFor="let option of filteredOptions">
                    <div class="dropdown-menu-item" (click)="singleSelection? selectAndToggleDropdown(option): undefined">
                        <input *ngIf="!singleSelection" 
                               type="checkbox" 
                               [checked]="isSelected(option)" 
                               (change)="toggleSelection($event, option)" />
                        <div class="dropdown-menu-item-name" *ngIf="type == 'Object'" >
                            <label>{{option[displayName]}}</label>
                        </div>
                        <div class="dropdown-menu-item-name" [hidden]="type == 'Object'">
                            <label>{{option}}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div *ngIf="filteredOptions.length == 0">
                No Result found
            </div>
        </div>
    </div>
</div>`,
styles: [`.dropdown-toggle-section {
    border: 1px solid rgb(199, 199, 199);
    cursor: pointer;
    min-height: 25px;
    padding: 3px;
    padding-left: 5px;
}

.dropdown-menu-section {
    border: 1px solid rgb(199, 199, 199);
    margin-top: 2px;
    cursor: pointer;
    -webkit-background-clip: padding-box;
    background-clip: padding-box;
    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
    box-shadow: 0 6px 12px rgba(0, 0, 0, .175);
}

.dropdown-toggle-section-content {
    display: inline-block;
    font-weight: bold;
}

.dropdown-toggle-section-icon {
    display: inline-block;
    float: right;
}

.dropdown-menu-item {
    margin-bottom: 5px;
}

.dropdown-menu-search-section {
    padding: 10px;
    border-bottom: 1px solid rgb(199, 199, 199);
}
.dropdown-menu-item input {
    display: inline-block;
    float: left;
}
.dropdown-menu-item-name {
    display: inline-block;
    margin-left: 6px;
    margin-top: 7px;
}
.option-search-bar {
    width: 98%;
    padding: 2px;
}

.dropdown-menu-list-section {
    padding: 10px;
}

.clear-search-btn {
    border: 1px solid rgb(199, 199, 199);
    background: rgb(199, 199, 199);
    display: inline-block;
    width: 22px;
    height: 23px;
    text-align: center;
    padding-top: 2px;
    float: right;
}`]
})

export class NgXMultiSelectDropdown implements OnInit {
    @Input() options: any[];
    @Input() selectedItems: any[]; // Keeps Selected Items when SingleSelection is false
    @Input() selectedItem: any // Keeps Selected Item when SingleSelection is true
    @Input() enableSearch: boolean;
    @Input() singleSelection: boolean;
    @Input() type: string; // type of the item.. can be Simple or Object
    @Input() displayName: any;

    @Output() onSelect = new EventEmitter<any>();
    @Output() onUnselect = new EventEmitter<any>();


    isOpen: boolean; // Is dropdown open
    searchText: string; // Text entered by user while searching
    filteredOptions: any[]; // Filtered Option list to display to user

    constructor() {

    }

    ngOnInit() {
        this.setDisplayName();
        this.type = 'Object';
        this.filteredOptions = this.options;
    }

    open() {
        this.isOpen = true;
    }

    close() {
        this.isOpen = false;
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    // Sets displayName = name if no displayName passed
    setDisplayName() {
        if (!this.displayName) {
            this.displayName = 'name';
        }
    }

    isSelectedItemNotEmpty() {
        return ((this.selectedItems && this.selectedItems.length) || (this.selectedItem && this.selectedItem.trim() !== ''));
    }

    isSelected(option:any) {
        if (this.selectedItems && this.selectedItems.length > 0) {
            return this.selectedItems.indexOf(option) > -1;
        } 
        return false;

    }

    select(option: any) {
        if (!this.selectedItems) {
            this.selectedItems = [];
        }
        this.selectedItems.push(option);
        console.log('selectedItems', this.selectedItems);
        this.onSelect.emit();
    }

    unSelect(option: any) {
        this.selectedItems.splice(this.selectedItems.indexOf(option), 1);
        this.onUnselect.emit();
    }

    toggleSelection($event:any, option:any) {
        if ($event.target.checked) {
            this.select(option);
        } else {
            this.unSelect(option);
        }
    }

    search() {
        this.filteredOptions = [];
        this.filteredOptions = this.filterItemList(this.searchText, this.options);
    }

    filterItemList(query: any, list: any[]): any[] {
        let filtered: any[] = [];
        if (list) {
            for (let i = 0; i < list.length; i++) {
                let item = list[i];
                if (this.type = 'Object') {
                    if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                        filtered.push(item);
                    }
                } else {
                    if (item.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                        filtered.push(item);
                    }
                }
            }
        }
        return filtered;
    }

    clearSearch() {
        this.searchText = '';
        this.filteredOptions = this.options;
    }

    // For Single Selection 
    selectAndToggleDropdown(option: any) {
        this.toggle();
        this.selectedItem = option;
        
    }


}