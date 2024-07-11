import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 

  // private customers = [
  //   { id: 1, name: 'Ahmed Ali' },
  //   { id: 2, name: 'Aya Elsayed' },
  //   { id: 3, name: 'Mina Adel' },
  //   { id: 4, name: 'Sarah Reda' },
  //   { id: 5, name: 'Mohamed Sayed' }
  // ];
  // private transactions = [
  //   { id: 1, customer_id: 1, date: '2022-01-01', amount: 1000 },
  //   { id: 2, customer_id: 1, date: '2022-01-02', amount: 2000 },
  //   { id: 3, customer_id: 2, date: '2022-01-01', amount: 550 },
  //   { id: 4, customer_id: 3, date: '2022-01-01', amount: 500 },
  //   { id: 5, customer_id: 2, date: '2022-01-02', amount: 1300 },
  //   { id: 6, customer_id: 4, date: '2022-01-01', amount: 750 },
  //   { id: 7, customer_id: 3, date: '2022-01-02', amount: 1250 },
  //   { id: 8, customer_id: 5, date: '2022-01-01', amount: 2500 },
  //   { id: 9, customer_id: 5, date: '2022-01-02', amount: 875 }
  // ];
 
  // getCustomers() {
  //   return this.customers;
  // }
  // getTransactions() {
  //   return this.transactions;
  // }

  // private apiUrl = 'http://localhost:5000/transangctions';

  constructor(private http: HttpClient) { }

  getAllCustomers(p :any,l:any): Observable<any> {
    // return this.http.get(`http://localhost:5000/customers`);
    // http://localhost:5000/customers?_page=2&_limit=2

    return this.http.get(`http://localhost:5000/customers?_page=${p}&_limit=${l}`);


  }
  
  getAllTransactions(): Observable<any> {
    return this.http.get(`http://localhost:5000/transactions`);

  }
 
}



