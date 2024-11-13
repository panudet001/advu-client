import { Component, EventEmitter, Inject, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogModule } from "@angular/material/dialog";

import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-modal-confirm",
  templateUrl: "./modal-confirm.component.html",
  styleUrls: ["./modal-confirm.component.scss"],
  standalone: true,
  imports: [MatDialogModule, ReactiveFormsModule, TranslateModule],
})
export class ModalConfirmComponent implements OnInit {
  @Output() submitClicked = new EventEmitter<boolean>();
  @Output() closeClicked = new EventEmitter<boolean>();
  cancelForm!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      investmentId: string;
    }
  ) {}

  ngOnInit() {
    this.cancelForm = this._formBuilder.group({
      checkbox: [false],
    });
  }

  get checkbox() {
    return this.cancelForm?.get("checkbox");
  }

  submit() {
    this.submitClicked.emit(true);
  }

  close() {
    this.closeClicked.emit(true);
  }
}
