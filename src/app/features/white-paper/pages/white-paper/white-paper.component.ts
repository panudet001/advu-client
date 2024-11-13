import { CommonModule, isPlatformBrowser } from "@angular/common";
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  Renderer2,
  ViewChild,
} from "@angular/core";

import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";

@Component({
  selector: "app-white-paper",
  standalone: true,
  imports: [CommonModule, LocalizeRouterPipe],
  templateUrl: "./white-paper.component.html",
  styleUrl: "./white-paper.component.scss",
})
export class WhitePaperComponent implements AfterViewInit {
  @ViewChild("sectionRight", { static: false }) sectionRight!: ElementRef;

  menuItems = [
    { title: "Abstract", id: "abstract", subItems: [] },
    { title: "Introduction", id: "introduction", subItems: [] },
    { title: "The Operation of ADAVU", id: "operation", subItems: [] },
    { title: "Safety and Openness", id: "safety", subItems: [] },
    {
      title: "Increasing Capital and Liquidity",
      id: "increasing",
      subItems: [],
    },
    {
      title: "Liquidity and the Secondary Market",
      id: "liquidity",
      subItems: [],
    },
    { title: "Adherence to Regulations", id: "adherence", subItems: [] },
    {
      title: "Customer Service and Administration",
      id: "customer",
      subItems: [],
    },
    { title: "Upcoming Events", id: "upcoming", subItems: [] },
    { title: "In summary", id: "summary", subItems: [] },
    {
      title: "ADAVU Technical Specifications",
      id: "technical",
      subItems: [
        "Reasons",
        "Smart Contract Functionality",
        "Functionalities",
        "Security Measures",
      ],
    },
  ];

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const firstMenuItem = document.querySelector(".menu-item");
      if (firstMenuItem) {
        this.moveScrollCircleToElement(firstMenuItem as HTMLElement);
        this.renderer.addClass(firstMenuItem, "active");
      }
    }
  }

  moveScrollCircle(event: MouseEvent, id: string) {
    if (isPlatformBrowser(this.platformId)) {
      const target = event.target as HTMLElement;
      this.moveScrollCircleToElement(target);

      const menuItems = document.querySelectorAll(".menu-item");
      menuItems.forEach(item => {
        this.renderer.removeClass(item, "active");
      });
      this.scrollToElement(id);
      this.renderer.addClass(target, "active");
    }
  }

  moveScrollCircleToElement(element: HTMLElement) {
    if (isPlatformBrowser(this.platformId)) {
      const scrollCircle = document.getElementById("scrollCircle");
      if (scrollCircle && scrollCircle.parentElement) {
        const itemRect = element.getBoundingClientRect();
        const containerRect =
          scrollCircle.parentElement.getBoundingClientRect();
        const topPosition = itemRect.top - containerRect.top;
        this.renderer.setStyle(scrollCircle, "top", `${topPosition}px`);
      }
    }
  }

  scrollToElement(elementId: string): void {
    if (isPlatformBrowser(this.platformId)) {
      const element = document.getElementById(elementId);
      if (element) {
        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - 100,
          behavior: "smooth",
        });
      }
    }
  }
}
