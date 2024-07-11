import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import Chart from 'chart.js/auto';
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
  chart: any = null;
page:number=2;
limit:number=2;
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getAllCustomers();
    this.getAllTransactions();
    this.getCharts([], []);

  }

  getAllCustomers(): void {
    this.dataService.getAllCustomers(1,3).subscribe({
      next: res => {
        this.customers = res;
        this.filteredCustomers = this.customers; // Initialize filteredCustomers with all customers initially
      },
      error: err => {
        console.log(err);
      }
    });
  }

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

  getFilteredCustomerTransactions(customerId: number): any[] {
    

    let transactions = this.transactions.filter(transaction => transaction.customer_id == customerId);
    if (this.filterAmount !== null) {
      transactions = transactions.filter(transaction => transaction.amount === this.filterAmount);
    }
    
    
    return transactions;
  }


  // getFilteredCustomerTransactions(customerId: number): any[] {
  //   if (!this.transactions || this.transactions.length === 0) {
  //     // console.log('No transactions loaded.');
  //     return [];
  //   }
  
  //   let transactions = this.transactions.filter(transaction => transaction.customer_id == customerId);
  //   // console.log(`Transactions for customer ${customerId}:`, transactions); // Debug log
  
  //   if (this.filterAmount !== null) {
  //     transactions = transactions.filter(transaction => transaction.amount === this.filterAmount);
  //     // console.log(`Filtered transactions by amount ${this.filterAmount}:`, transactions); // Debug log
  //   }
  
  //   return transactions;
  // }
  
  applyFilters(): void {
    this.filteredCustomers = this.customers.filter(customer =>
      customer.name.toLowerCase().includes(this.filterName.toLowerCase()) &&
      (this.filterAmount === null || this.getFilteredCustomerTransactions(customer.id).length > 0)
    );
  }

  displayChats(transactions: any[]): void {
    let amounts = transactions.map(transaction => transaction.amount);
    let dates = transactions.map(transaction => transaction.date);
    this.getCharts(amounts, dates);
  }

  getCharts(amounts: any[], dates: any[]): void {
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
}