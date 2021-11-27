import { Injectable } from '@angular/core';
import { Bill } from '../../models/bill';
import { StateService } from '../state.service';
import { BillHttpService } from './bill-http.service';

interface BillState {
  billList: Array<Bill>;
  exportData: Array<Bill>;
  selectedBill: Object;
  billInstance: Bill;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  responseMsg: string;
}
const initialState: BillState = {
  billList: [],
  selectedBill: {},
  billInstance: undefined,
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
};
@Injectable({
  providedIn: 'root',
})
export class BillStore extends StateService<BillState> {
  constructor(private billService: BillHttpService) {
    super(initialState);
  }
  uploadBill(bill: Bill) {
    return this.billService.uploadBill(bill).toPromise();
  }
}
