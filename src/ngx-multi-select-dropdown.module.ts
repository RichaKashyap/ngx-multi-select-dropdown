import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';  
import { FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

import { NgXMultiSelectDropdown } from "./ngx-multi-select-dropdown";

import { NgXClickOutsideModule } from "ngx-click-outside";

@NgModule({
    imports: [CommonModule, FormsModule, NgXClickOutsideModule],
    declarations: [NgXMultiSelectDropdown],
    exports: [NgXMultiSelectDropdown]
})

export class NgXMultiSelectDropdownModule {}