import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DxGalleryComponent } from 'devextreme-angular';

@Component({
  templateUrl: 'learner-home.component.html',
  styleUrls: ['./learner-home.component.scss'],
})
export class LearnerHomeComponent implements OnInit {
  @ViewChild(DxGalleryComponent, { static: false })
  dxGallery: DxGalleryComponent;
  baseImgUrl: string = '../../../../assets/imgs/';
  currentItem: any;
  date: Number = new Date().getFullYear();
  dataSource: Array<Object> = [
    {
      title: '',
      subTitle: '',
      imgUrl: this.baseImgUrl + 'landing_page_1.jpg',
      link: '',
    },
  ];
  slideshowDelay: number = 2500;
  featureList: Array<any>;
  constructor(private router: Router) {}

  onSelectionChanged(e: any) {
    this.currentItem = e.addedItems[0];
  }

  navigateInside() {
    this.router.navigate([this.currentItem.link]);
  }

  ngOnInit(): void {}
}
