import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  OnChanges,
} from '@angular/core';
import { DxScrollViewComponent } from 'devextreme-angular';
import { Post } from 'src/app/shared/models/post';

@Component({
  selector: 'app-post-detail',
  templateUrl: 'post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild(DxScrollViewComponent, { static: false })
  dxScrollView: DxScrollViewComponent;

  @Input() post: Post;
  @Input() isVisible: boolean;
  @Input() closeDetailPopup: () => void;
  valueType: string = 'string';
  postData: Post;

  constructor() {}

  ngOnChanges(): void {
    this.postData = null;
    setTimeout(() => {
      this.postData = this.post;
    }, 200);
  }

  ngOnInit() {}

  ngOnDestroy() {}
}
