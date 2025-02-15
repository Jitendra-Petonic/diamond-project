import { Component, ViewChild } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { Dropdown, DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import { ChartModule } from 'primeng/chart';
import { CalendarModule } from 'primeng/calendar';
import { CustomModalComponent } from '../../modals/custom-modal/custom-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../../modals/confirmation-modal/confirmation-modal.component';
import { DialogModule } from 'primeng/dialog';
// import { MessageService } from 'primeng/api';
// import { ProfileServiceService } from '../../services/profile-service.service';
import { MatIconModule } from '@angular/material/icon';
// import ConfirmationModalComponent
import { DynamicDialogModule } from 'primeng/dynamicdialog';
// import { ReviewChangesComponent } from '../review-changes/review-changes.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ReviewChangesComponent } from '../review-changes/review-changes.component';
import { FilterTablePipe } from '../../shared/filter-table.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Table, TableModule } from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}


@Component({
  selector: 'app-revised-price',
  templateUrl: './revised-price.component.html',
  styleUrl: './revised-price.component.scss'
})
export class RevisedPriceComponent {
  anyChecked = false;
  displayDateModal: any = false;
  @ViewChild('dt1') dt1!: Table;
  searchValue: any = ''
  showTable: any = false;
  countries: any[] | undefined;
  selectedCountry: any;
  showEditTable: any = false
  selectedCity: any;
  data: any;
  options: any;
  data2: any;
  options2: any;
  date1: any;
  date2: Date | undefined;
  showParams: any = false;
  selectedOption: any = 'All';
  selectedCountries: any = []
  checkboxItems = [
    { id: 'marketVolatility', label: 'Market Votality', checked: false, inputValue: 'high', percentage: 0 },
    { id: 'supplyChainDynamics', label: 'Supply Chain Dynamics', checked: false, inputValue: 'moderate', percentage: 0 },
    { id: 'operationalCosts', label: 'Operational Costs', checked: false, inputValue: 'low', percentage: 0 },
    { id: 'contingencyReserves', label: 'Contingency Reserves', checked: false, inputValue: 'fix', percentage: 0 },
    { id: 'regulatoryTaxChanges', label: 'Regulatory and Tax Changes', checked: false, inputValue: '456', percentage: 0 },
    { id: 'inventoryHoldingCosts', label: 'Inventory Holding Costs', checked: false, inputValue: '20', percentage: 0 }
  ];
  isConfirmDisabled = true;
  first: number = 0;
  rows: number = 10;
  pagedData: any[] = [];
  allData = [
    { id: 'D001', category: 'necklace', desc: 'Round cut, 1 carat, excellent clarity', value1: 24, value2: 'G', clarity: 'VS1', quality: 'Excellent', price1: '5000', price2: '5500' },
    { id: 'D002', category: 'necklace', desc: 'Square cut, 1 carat, excellent clarity', value1: 16, value2: 'G', clarity: 'VS2', quality: 'Brilliant', price1: '4000', price2: '4500' },
    { id: 'D003', category: 'necklace', desc: 'Round cut, 1 carat, excellent clarity', value1: 5, value2: 'G', clarity: 'VS3', quality: 'Great', price1: '6000', price2: '8500' },
    { id: 'D004', category: 'necklace', desc: 'Heart cut, 1 carat, excellent clarity', value1: 3, value2: 'G', clarity: 'VS4', quality: 'Perfect', price1: '4000', price2: '8500' },
    { id: 'D005', category: 'necklace', desc: 'Round cut, 1 carat, excellent clarity', value1: 24, value2: 'G', clarity: 'VS1', quality: 'Excellent', price1: '5000', price2: '5500' },
    { id: 'D006', category: 'necklace', desc: 'Square cut, 1 carat, excellent clarity', value1: 16, value2: 'G', clarity: 'VS2', quality: 'Brilliant', price1: '4000', price2: '4500' },
    { id: 'D007', category: 'necklace', desc: 'Round cut, 1 carat, excellent clarity', value1: 5, value2: 'G', clarity: 'VS3', quality: 'Great', price1: '6000', price2: '8500' },
    { id: 'D008', category: 'necklace', desc: 'Heart cut, 1 carat, excellent clarity', value1: 3, value2: 'G', clarity: 'VS4', quality: 'Perfect', price1: '4000', price2: '8500' }
  ];

  isPriceChanged: boolean = false;
  savedDate: boolean = false;
  productIds: string[] = [];
  descriptions: string[] = [];
  carats: number[] = [];
  colors: string[] = [];
  clarities: string[] = [];
  cuts: string[] = [];

  selectedProductId: any;
  selectedDescription: any;
  selectedCarat: any;
  selectedColor: any;
  selectedClarity: any;
  selectedCut: any;

  showProductIdDropdown = false;
  showDescriptionDropdown = false;
  showCaratDropdown = false;
  showColorDropdown = false;
  showClarityDropdown = false;
  showCutDropdown = false;
  minDate: any;

  constructor(private dialog: MatDialog,) {
    this.updatePageData();
  }



  ngOnInit() {
    this.minDate = new Date();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.countries = [
      { name: 'option 1', code: 'AU' },
      { name: 'option 2', code: 'BR' },
      { name: 'option 3', code: 'CN' },
      { name: 'option 4', code: 'EG' },
    ];

    // this.formGroup = new FormGroup({
    //   city: new FormControl<string | null>(null)
    // });

    this.allData = this.allData.map(item => ({
      ...item,  // Copy all existing properties
      originalPrice1: item.price1,  // Add originalPrice1
      originalPrice2: item.price2   // Add originalPrice2
    }));

    this.pagedData = this.pagedData.map(item => ({
      ...item,  // Copy all existing properties
      originalPrice1: item.price1,  // Add originalPrice1
      originalPrice2: item.price2   // Add originalPrice2
    }));

    console.log(this.allData);
    this.populateData()
  }

  openModal(){
    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '35vw',
      data: {
        head: 'Changes Saved',
        message: 'The changes have been saved successfully.',
        buttonTextNo: 'Close',
      },
    });
    this.showTable = false;
    this.showParams = false;
  }

  checkIfAnyChecked() {
    this.anyChecked = this.checkboxItems.some(item => item.checked);
    this.isConfirmDisabled = !this.checkboxItems.every(item =>
      !item.checked || (Number(item.percentage) > 0 && Number(item.percentage) <= 100)
    );
  }

  onCategoryChange(){
    this.showParams = false;
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePageData();
  }

  updatePageData() {
    this.pagedData = this.allData.slice(this.first, this.first + this.rows);
  }

  openReviewModal(){
    console.log('this.this.pagedData', this.pagedData)
    const filteredData = this.pagedData.filter(item => item.originalPrice2 !== item.price2);
    const dialogRef = this.dialog.open(ReviewChangesComponent, {
      width: '80vw',
      // minHeight: '70vh',
      data: {
        head: '',
        message: '',
        buttonTextNo: 'Close',
        filteredData: filteredData
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result)
      // If the user clicked "Yes" in the modal
      if (result === true) {

        this.displayDateModal = true;


      } else {
      }
    });
  }

  saveChanges(){
    this.showEditTable = false;
    this.showTable = false;
    this.showParams = false;
    this.showEditTable = false;
    this.isPriceChanged = false;
    this.selectedCountry = '';
    this.selectedCountries = [];
    this.selectedOption = 'All'
    this.savedDate = this.isPriceChanged
    this.checkboxItems = [
      { id: 'marketVolatility', label: 'Market Votality', checked: false, inputValue: 'high', percentage: 0 },
      { id: 'supplyChainDynamics', label: 'Supply Chain Dynamics', checked: false, inputValue: 'moderate', percentage: 0 },
      { id: 'operationalCosts', label: 'Operational Costs', checked: false, inputValue: 'low', percentage: 0 },
      { id: 'contingencyReserves', label: 'Contingency Reserves', checked: false, inputValue: 'fix', percentage: 0 },
      { id: 'regulatoryTaxChanges', label: 'Regulatory and Tax Changes', checked: false, inputValue: '456', percentage: 0 },
      { id: 'inventoryHoldingCosts', label: 'Inventory Holding Costs', checked: false, inputValue: '20', percentage: 0 }
    ];
    const formattedDate = new Date(this.date1).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '40vw',
      data: {
        head: 'Changes Saved',
        message: `The changes have been saved successfully. Revised price will be effective from ${formattedDate}.`,
        buttonTextNo: 'Close',
      },
    });
  }

  onPriceChange(item: any) {
    this.isPriceChanged = item.price1 !== item.originalPrice1 || item.price2 !== item.originalPrice2;
    this.savedDate = false
  }

  onNotSavingChanges(){
    this.showEditTable = false;
    this.pagedData = this.pagedData.map((item: any) => ({
      ...item,  // Copy all existing properties
      price1: item.originalPrice1,  // Add originalPrice1
      price2: item.originalPrice2   // Add originalPrice2
    }));
    console.log('allData', this.pagedData)
    this.isPriceChanged = false
    this.savedDate = false;
  }

  populateData(){
    this.allData.forEach((item: any) => {
      if (!this.productIds.includes(item.id)) {
        this.productIds.push(item.id);
      }

      if (!this.descriptions.includes(item.desc)) {
        this.descriptions.push(item.desc);
      }

      if (!this.carats.includes(item.value1)) {
        this.carats.push(item.value1);
      }

      if (!this.colors.includes(item.value2)) {
        this.colors.push(item.value2);
      }

      if (!this.clarities.includes(item.clarity)) {
        this.clarities.push(item.clarity);
      }

      if (!this.cuts.includes(item.quality)) {
        this.cuts.push(item.quality);
      }
    });
  }

  openConfirmationModal() {
    // Check for validation
    let isValid = true;
    for (const item of this.checkboxItems) {
        if (item.checked && (item.percentage === 0 || !item.percentage)) {
            isValid = false;
            break; // No need to check further if one invalid is found
        }
    }

    if (!isValid) {
      const dialogRef = this.dialog.open(CustomModalComponent, {
        width: '35vw',
        data: {
            head: '',
            message: 'Please ensure all checked items have a valid percentage value.',
            buttonTextNo: 'Close',
            // buttonTextYes: 'Yes',
        },
    });
        // alert('Please ensure all checked items have a valid percentage value.');
        return; // Prevent opening the modal
    }

    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
        width: '35vw',
        data: {
            head: 'Confirmation',
            message: 'Are you sure you want to proceed?',
            buttonTextNo: 'No',
            buttonTextYes: 'Yes',
        },
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log('result', result);
        // If the user clicked "Yes" in the modal
        if (result === true) {
            this.showTable = true;
        }
    });
}


clearFilters() {
  this.selectedProductId = null;
  this.selectedDescription = null;
  this.selectedCarat = null;
  this.selectedColor = null;
  this.selectedClarity = null;
  this.selectedCut = null;
}

applyFilter(event: any, field: string) {
  // Implement your filter logic here
}

clear(table: Table) {
  table.clear();
  this.searchValue = ''
}

// filter(event: any) {
//   const filteredValue = event.value || [];
//   this.dt1.filter(filteredValue, 'fieldName', 'in');
// }

// filter(event: { value: any }) {
//   const selectedValues = event.value;
//   // Handle the filtering logic here

validatePercentage(event: any, item: any) {
  // Remove non-numeric characters including 'e' and any special symbols
  let value = event.target.value.replace(/[^\d]/g, '');

  // Convert to a number for comparison
  value = Number(value);

  // Ensure value is within range
  if (value > 100) {
    value = 100;
  } else if (value < 0) {
    value = 0;
  }

  // Update the value in the input and the ngModel-bound item
  event.target.value = value;
  item.percentage = value;

  // Run the check function
  this.checkIfAnyChecked();
}


onCloseDateModal(){
this.displayDateModal = false;
}

OnSaveDateModal(){
  this.displayDateModal = false;
  this.showTable = true;
  this.saveChanges();
  this.savedDate = true;
  console.log('date1', this.date1)
}

  onSelectionChange(event: string): void {
    // Whenever the radio selection changes, set isSomethingTrue to false
    this.showParams = false;
  }
}
