import { NgClass, NgIf, NgStyle } from "@angular/common";
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { RouterLink } from "@angular/router";

import { ConfirmImgComponent } from "@features/identity/components/confirm-img-model/confirm-img.component";

import { ToastrService } from "ngx-toastr";

const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/jpg"];

@Component({
  selector: "app-file-verification",
  templateUrl: "./file.component.html",
  styleUrls: ["./file.component.scss"],
  standalone: true,
  imports: [NgClass, NgIf, NgStyle, ReactiveFormsModule, RouterLink],
})
export class FileVerificationComponent {
  @ViewChild("fileInput", { static: false }) fileInput!: ElementRef;
  allowedFileTypes = ALLOWED_FILE_TYPES;
  isUploading = false;
  fileUrl!: string | null;
  uploadFile!: File | null;
  @Input() title = "";
  @Output() handleFile = new EventEmitter<File | null>();

  constructor(
    private _toastrService: ToastrService,
    private _matDialog: MatDialog
  ) {}

  handleChange(event: Event) {
    this.isUploading = false;
    const element = event.currentTarget as HTMLInputElement;
    const file = element!.files![0] as File;

    if (this.allowedFileTypes.indexOf(file?.type) === -1) {
      this.handleRemovesFile();
      return;
    }
    if (file.size > 2000000) {
      this._toastrService.warning("Size must not exceed 2 MB.");
    } else {
      this.fileUrl = URL.createObjectURL(file);
      this.uploadFile = file;
      this.handleFile.emit(this.uploadFile);
      this.openPreviewImage();
    }
  }

  openPreviewImage(): void {
    const dialogRef = this._matDialog.open(ConfirmImgComponent);
    dialogRef.componentInstance.imgPath = this.fileUrl;
    dialogRef.componentInstance.title = this.title;
    dialogRef.componentInstance.isContinue.subscribe((value: boolean) => {
      if (!value) {
        this.uploadFile = null;
        this.fileUrl = null;
        this.handleFile.emit(this.uploadFile);
        dialogRef.close();
      } else {
        dialogRef.close();
      }
    });
  }

  handleRemovesFile() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.value = null;
    }

    this.uploadFile = null;
    this.fileUrl = null;
    this.handleFile.emit(this.uploadFile);
  }

  formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dec = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dec)) + " " + sizes[i];
  }
}
