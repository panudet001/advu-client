import { NgForOf } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

import { Crypto } from "@shared/services/crypto/crypto.types";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-search-transaction",
  templateUrl: "./search-transaction.component.html",
  styleUrls: ["./search-transaction.component.scss"],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    NgForOf,
    ReactiveFormsModule,
    TranslateModule,
  ],
})
export class SearchTransactionComponent {
  @Input() transactionForm!: FormGroup;
  @Input() allStatus!: string[];
  @Input() assets!: Crypto[];
  @Input() type!: string;

  @Output() emitFilterChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  onFilterChange() {
    this.emitFilterChange.emit();
  }
}
