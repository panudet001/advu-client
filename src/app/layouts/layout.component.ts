import { Component } from "@angular/core";

import { ContentComponent } from "@layouts/components/content/content.component";
import { FooterComponent } from "@layouts/components/footer/footer.component";
import { HeaderComponent } from "@layouts/components/header/header.component";

@Component({
  selector: "app-layout",
  standalone: true,
  templateUrl: "./layout.component.html",
  imports: [ContentComponent, FooterComponent, HeaderComponent],
})
export class LayoutComponent {}
