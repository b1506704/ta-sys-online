import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../../models/cart';
import { StateService } from '../state.service';
import { StoreService } from '../store.service';
import { CartHttpService } from './cart-http.service';
import { confirm } from 'devextreme/ui/dialog';
import { Course } from '../../models/course';

interface CartState {
  cartList: Array<Cart>;
  exportData: Array<Cart>;
  selectedCart: Object;
  cartInstance: Cart;
  totalPages: number;
  currentPage: number;
  totalItems: number;
  responseMsg: string;
}
const initialState: CartState = {
  cartList: [],
  selectedCart: {},
  cartInstance: undefined,
  exportData: [],
  totalPages: 0,
  currentPage: 0,
  totalItems: 0,
  responseMsg: '',
};
@Injectable({
  providedIn: 'root',
})
export class CartStore extends StateService<CartState> {
  constructor(
    private cartService: CartHttpService,
    private store: StoreService
  ) {
    super(initialState);
  }

  setIsLoading(_isLoading: boolean) {
    this.store.setIsLoading(_isLoading);
  }

  $cartInstance: Observable<Cart> = this.select((state) => state.cartInstance);

  addToCart(course: Course, userId: string) {
    this.confirmDialog('').then((confirm: boolean) => {
      if (confirm) {
        this.setIsLoading(true);
        this.cartService.addToCart(course, userId).subscribe({
          next: (data: any) => {
            this.setState({ responseMsg: data });
            console.log(data);
            this.setIsLoading(false);
            this.store.showNotif(data.responseMessage, 'custom');
          },
          error: (data: any) => {
            this.setIsLoading(false);
            this.store.showNotif(data.error.responseMessage, 'error');
            console.log(data);
          },
        });
      }
    });
  }

  removeFromCart(course: Course, userId: string) {
    this.setIsLoading(true);
    return this.cartService.removeFromCart(course, userId).toPromise();
  }

  removeAllFromCart(userId: string) {
    this.setIsLoading(true);
    return this.cartService.removeAllFromCart(userId).toPromise();
  }

  confirmDialog(msg: string) {
    if (msg != '') {
      return confirm(`<b>${msg}</b>`, 'Confirm changes');
    }
    return confirm(`<b>Are you sure?</b>`, 'Confirm changes');
  }

  getCart(id: string) {
    this.setIsLoading(true);
    return this.cartService
      .getCart(id)
      .toPromise()
      .then((data: any) => {
        this.setState({ cartInstance: data });
        console.log(data);
        this.setIsLoading(false);
      });
  }
}
