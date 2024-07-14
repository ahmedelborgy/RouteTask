import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import Chart from 'chart.js/auto';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})




export class TableComponent implements OnInit {
  customers: any[] = [];
  transactions: any[] = [];
  filteredCustomers: any[] = [];
  filterName: string = '';
  filterAmount: number | null = null;
  nameChart:string='';
  boolChart=true;
  count=0;
  chart: any = null;
  length=20;
  pageSize=5;
  pageIndex=0;
  pageNumber=1;
  pageSizeOptions=[5,10,20,50,80,100];
  pageEvent:PageEvent|any;
  amounts:any[]=[];
  dates:any[]=[];
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    
    this.getAllCustomers2();
    this.getCharts(this.amounts, this.dates);


  }










// =====
getAllCustomers2(): void {
  let params={
    pageSize:this.pageSize,
    pageNumber:this.pageNumber,
  }
  console.log(this.pageNumber )
console.log(params.pageNumber);



  this.dataService.getAllData(this.pageIndex + 1, this.pageSize).subscribe({
    next: res => {
      console.log(res);
      this.customers = res.customers.slice(0,this.pageSize);
      this.transactions = res.transactions;

      this.filteredCustomers = this.customers; // Initialize filteredCustomers with all customers initially
   console.log(this.customers);
   
    },
    error: err => {
      console.log(err);
    }
  });
}












// =====
/*
  getAllCustomers(): void {
    let params={
      pageSize:this.pageSize,
      pageNumber:this.pageNumber,
    }
    console.log(this.pageNumber )
console.log(params.pageNumber);



    this.dataService.getAllCustomers(this.pageIndex + 1, this.pageSize).subscribe({
      next: res => {
        this.customers = res;
        this.filteredCustomers = this.customers; // Initialize filteredCustomers with all customers initially
     console.log(this.customers);
     
      },
      error: err => {
        console.log(err);
      }
    });
  }
*/

/*
  getAllTransactions(): void {
    this.dataService.getAllTransactions().subscribe({
      next: res => {
        this.transactions = res;
        
      },
      error: err => {
        console.log(err);
      }
    });
  }

    */

  getFilteredCustomerTransactions(customerId: number): any[] {
    

    let transactions = this.transactions.filter(transaction => transaction.customer_id == customerId);
    if (this.filterAmount !== null) {
      transactions = transactions.filter(transaction => transaction.amount === this.filterAmount);
    }
    
    
    return transactions;
  }


  
  
  applyFilters(): void {
    this.filteredCustomers = this.customers.filter(customer =>
      customer.name.toLowerCase().includes(this.filterName.toLowerCase()) &&
      (this.filterAmount === null || this.getFilteredCustomerTransactions(customer.id).length > 0)
    );
  }
 
  displayChats(transactions: any[],name:string): void {
    console.log(name);
    // this.count++;
    // this.boolChart=true;
    this.nameChart=name;
    this.amounts = transactions.map(transaction => transaction.amount);
    this.dates = transactions.map(transaction => transaction.date);
    this.getCharts(this.amounts, this.dates);
  }

  getCharts(amounts: any[], dates: any[]): void {
    console.log(amounts)
    console.log(dates)

    this.count++;

    if (this.chart) {
      this.chart.destroy(); // Destroy the existing chart instance
    }
    this.chart = new Chart('canvas', {
      
      // type: 'bar',
      // type: 'bar ',
      type: 'doughnut',
      data: {
        labels: dates,
        datasets: [{
          label: 'Transaction Amount',
          data: amounts,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }















handlePageEvent(e: PageEvent): void {
  this.pageIndex = e.pageIndex;
  this.pageSize = e.pageSize;
  // this.getAllCustomers();
  this.getAllCustomers2();
}
}





