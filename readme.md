<h1>Ngx-Multi-Select-Dropdown</h1><br />
Are you struggling to find proper multiselect dropdown with checkbox and search Functionality added? If yes, This package is for you.

<h1>Installing</h1> <br/>
install package through npm i ngx-multi-select-dropdown

<h1>How to use</h1><br/> 

import it to your module-<br/>
import { NgXMultiSelectDropdownModule } from "ngx-multi-select-dropdown";<br/>

@NgModule({<br/>
imports: [NgXMultiSelectDropdownModule}<br/>
})<br/>

In component you want to use <br/>
ts-<br/>
options = [<br/>
    {
        id: 1,
        name: "Option1",
        displayName: 'Option 1

    },
    {
        id: 2,
        name: "Option2",
        displayName: "Option 2"
    }
]<br/>

selectedItems = [
    {
        id: 1,
        name: "Option1",
        displayName: "Option 1"
    }
]<br/>



html-<br/>
    <multi-select-dropdown 
        [options]="options" 
        [selectedItems]="selectedItems" 
        [displayName]="'displayName'"
        (onSelect)="select()"
        (onUnselect)="unSelect()">
    </multi-select-dropdown><br/>

    
   <h1> Attributes-</h1> <br/>

    options - List of options (Object or simple string)
    selectedItems - Selected Items(In case of multi select)
    selectedItem -  Keeps Selected Item when Single Selection
    enableSearch - Enable or Disable search(By default true);
    singleSelection - Enable Single Selection(By default false);
    displayName - Name of the attribute to which is keeping the value to show in List(User friendly)(By default 'name')
    type - Type of items("Object" or "Simple") <br/>

    If you have any suggestion or issues, you are very welcome to post it [here](https://github.com/RichaKashyap/ngx-multi-select-dropdown/issues)

    
