import {
  Component,
  NgModule,
  Output,
  Input,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ItemClickEvent } from 'devextreme/ui/tree_view';
import {
  DxTreeViewModule,
  DxTreeViewComponent,
} from 'devextreme-angular/ui/tree-view';
import {
  navigationLearner,
  navigationAdmin,
  navigationInstructor,
  navigationNonUser,
} from '../../../app-navigation';

import * as events from 'devextreme/events';
import { StoreService } from '../../services/store.service';
import { UserStore } from '../../services/user/user-store.service';

@Component({
  selector: 'app-side-navigation-menu',
  templateUrl: './side-navigation-menu.component.html',
  styleUrls: ['./side-navigation-menu.component.scss'],
})
export class SideNavigationMenuComponent
  implements AfterViewInit, OnDestroy, OnInit
{
  @ViewChild(DxTreeViewComponent, { static: true })
  menu!: DxTreeViewComponent;

  @Output()
  selectedItemChanged = new EventEmitter<ItemClickEvent>();

  @Output()
  openMenu = new EventEmitter<any>();
  isLoggedIn: boolean = false;
  constructor(
    private elementRef: ElementRef,
    private store: StoreService,
    private userStore: UserStore
  ) {}

  onItemClick(event: ItemClickEvent) {
    this.selectedItemChanged.emit(event);
  }

  private _selectedItem!: string;
  @Input()
  set selectedItem(value: string) {
    this._selectedItem = value;
    if (!this.menu.instance) {
      return;
    }

    this.menu.instance.selectItem(value);
  }

  private _items!: Record<string, unknown>[];
  items: Array<any>;

  renderItemMenu() {
    this.store.$currentRoleName.subscribe((data: string) => {
      switch (data) {
        case 'Learner':
          this._items = navigationLearner.map((item) => {
            if (item.path && !/^\//.test(item.path)) {
              item.path = `/${item.path}`;
            }
            return { ...item, expanded: !this._compactMode };
          });
          break;
        case 'Instructor':
          this._items = navigationInstructor.map((item) => {
            if (item.path && !/^\//.test(item.path)) {
              item.path = `/${item.path}`;
            }
            return { ...item, expanded: !this._compactMode };
          });
          break;
        case 'Admin':
          this._items = navigationAdmin.map((item) => {
            if (item.path && !/^\//.test(item.path)) {
              item.path = `/${item.path}`;
            }
            return { ...item, expanded: !this._compactMode };
          });
          break;
        default:
          this._items = navigationNonUser.map((item) => {
            if (item.path && !/^\//.test(item.path)) {
              item.path = `/${item.path}`;
            }
            return { ...item, expanded: !this._compactMode };
          });
          break;
      }
    });
    this.items = this._items;
  }

  userRoleListener() {
    this.store.$currentRoleName.subscribe((data: string) => {
      if (!this.menu.instance) {
        return;
      }
      switch (data) {
        case 'Learner':
          this.menu.instance.option(
            'items',
            navigationLearner.map((item) => {
              if (item.path && !/^\//.test(item.path)) {
                item.path = `/${item.path}`;
              }
              return { ...item, expanded: !this._compactMode };
            })
          );
          break;
        case 'Admin':
          this.menu.instance.option(
            'items',
            navigationAdmin.map((item) => {
              if (item.path && !/^\//.test(item.path)) {
                item.path = `/${item.path}`;
              }
              return { ...item, expanded: !this._compactMode };
            })
          );
          break;
        case 'Instructor':
          this.menu.instance.option(
            'items',
            navigationInstructor.map((item) => {
              if (item.path && !/^\//.test(item.path)) {
                item.path = `/${item.path}`;
              }
              return { ...item, expanded: !this._compactMode };
            })
          );
          break;
        default:
          this.menu.instance.option(
            'items',
            navigationNonUser.map((item) => {
              if (item.path && !/^\//.test(item.path)) {
                item.path = `/${item.path}`;
              }
              return { ...item, expanded: !this._compactMode };
            })
          );
          break;
      }
    });
  }

  private _compactMode = false;
  @Input()
  get compactMode() {
    return this._compactMode;
  }
  set compactMode(val) {
    this._compactMode = val;

    if (!this.menu.instance) {
      return;
    }

    if (val) {
      this.menu.instance.collapseAll();
    } else {
      this.menu.instance.expandItem(this._selectedItem);
    }
  }

  ngOnInit(): void {
    this.userStore.$isLoggedIn.subscribe((data: boolean) => {
      this.isLoggedIn = data;
    });
    this.userRoleListener();
    this.renderItemMenu();
  }

  ngAfterViewInit() {
    events.on(this.elementRef.nativeElement, 'dxclick', (e: Event) => {
      this.openMenu.next(e);
    });
  }

  ngOnDestroy() {
    events.off(this.elementRef.nativeElement, 'dxclick');
  }
}

@NgModule({
  imports: [DxTreeViewModule],
  declarations: [SideNavigationMenuComponent],
  exports: [SideNavigationMenuComponent],
})
export class SideNavigationMenuModule {}
