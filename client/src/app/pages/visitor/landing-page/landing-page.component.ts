import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Router } from '@angular/router';
import { DxGalleryComponent } from 'devextreme-angular';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  // @ViewChild('intro', { static: true }) intro: ElementRef<HTMLDivElement>;
  // @ViewChild('title', { static: true }) title: ElementRef<HTMLDivElement>;
  // @ViewChild('subtitle', { static: true }) subtitle: ElementRef<HTMLDivElement>;
  @ViewChild('feature1', { static: true }) feature1: ElementRef<HTMLDivElement>;
  // @ViewChild('feature2', { static: true }) feature2: ElementRef<HTMLDivElement>;
  // @ViewChild('organization1', { static: true })
  // organization1: ElementRef<HTMLDivElement>;
  @ViewChild('organization2', { static: true })
  organization2: ElementRef<HTMLDivElement>;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}
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

  onSelectionChanged(e: any) {
    this.currentItem = e.addedItems[0];
  }

  navigateInside() {
    this.router.navigate([this.currentItem.link]);
  }

  initTimeline() {
    return gsap
      .timeline({
        scrollTrigger: {
          trigger: '.title',
          start: 'top 50%',
          end: 'bottom top',
          toggleActions: 'restart none none reset',
        },
      })
      .from('.title', {
        yPercent: -100,
        stagger: 0.05,
        duration: 0.5,
        ease: 'back',
      })
      .from('.title', { opacity: 0, stagger: 0.05, duration: 0.2 }, 0)
      .from(
        '.subtitle',
        { opacity: 0, stagger: 0.05, duration: 0.5, delay: 0.5 },
        0
      )
      .from('.subtitle', {
        yPercent: -50,
        stagger: 0.05,
        duration: 0.5,
        ease: 'back',
      });
  }

  initFeatureTimeline() {
    return gsap
      .timeline({
        scrollTrigger: {
          trigger: this.feature1.nativeElement,
          start: 'top 50%',
          end: 'bottom top',
          toggleActions: 'restart none none reset',
        },
      })
      .from(this.feature1.nativeElement, {
        yPercent: -100,
        stagger: 0.05,
        duration: 2.5,
        ease: 'back',
      })
      .from(
        this.feature1.nativeElement,
        { opacity: 0, stagger: 0.05, duration: 0.2 },
        0
      );
  }

  ngOnInit() {
    this.initTimeline().then(() => {
      this.initFeatureTimeline();
    });
  }
}
