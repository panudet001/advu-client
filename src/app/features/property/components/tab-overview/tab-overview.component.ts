import { NgForOf, NgIf, NgOptimizedImage } from "@angular/common";
import { Component, Input, OnChanges } from "@angular/core";
import { GoogleMap, MapMarker } from "@angular/google-maps";
import { MatIcon } from "@angular/material/icon";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

import { Investment } from "@shared/services/investment-v2/investment.types";

import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { LocalizeRouterPipe } from "@gilsdav/ngx-translate-router";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-tab-overview",
  templateUrl: "./tab-overview.component.html",
  styleUrls: ["./tab-overview.component.scss"],
  standalone: true,
  imports: [
    CKEditorModule,
    GoogleMap,
    LocalizeRouterPipe,
    MapMarker,
    MatIcon,
    NgForOf,
    NgIf,
    NgOptimizedImage,
    TranslateModule,
  ],
})
export class TabOverviewComponent implements OnChanges {
  @Input() investment!: Investment;

  googleMap!: GoogleMap;
  zoom = 17;
  center!: google.maps.LatLngLiteral;
  mapUrl!: SafeResourceUrl;
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markerPositions: google.maps.LatLngLiteral[] = [];
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDefaultUI: true,
    fullscreenControl: true,
    disableDoubleClickZoom: true,
  };

  constructor(public _sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    this.mapUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
      this.investment.address
    );

    this.center = {
      lat: this.investment.latitude,
      lng: this.investment.longitude,
    };

    this.markerPositions.push(this.center);
    if (this.googleMap) {
      this.googleMap.googleMap?.setCenter(this.center);
    }
  }
}
