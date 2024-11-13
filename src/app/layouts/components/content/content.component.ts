import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: "app-content",
  standalone: true,
  templateUrl: "./content.component.html",
  imports: [RouterOutlet],
})
export class ContentComponent {}
