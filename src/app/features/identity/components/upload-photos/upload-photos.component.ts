import { NgClass, NgIf, NgOptimizedImage } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";

import { ConfirmImgComponent } from "@features/identity/components/confirm-img-model/confirm-img.component";
import { FileVerificationComponent } from "@features/identity/components/file/file.component";
import { IdentityEnums } from "@features/identity/identity.enums";

export interface FileIdInterface {
  fileFront: File;
  fileBack: File;
  fileTake: File;
}

enum UploadFileEnums {
  example,
  upload,
}

@Component({
  selector: "app-upload-photos",
  templateUrl: "./upload-photos.component.html",
  styleUrls: ["./upload-photos.component.scss"],
  standalone: true,
  imports: [
    ConfirmImgComponent,
    FileVerificationComponent,
    NgClass,
    NgIf,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
})
export class UploadPhotoComponent implements OnChanges {
  @Output() clickSubmit = new EventEmitter<FileIdInterface>();
  @Output() backStep = new EventEmitter();
  @Input() formDataIdentity!: FormGroup;
  @Input() isLoading!: boolean;
  isInvalidForm = true;
  uploadStep: UploadFileEnums = UploadFileEnums.example;
  file!: FileIdInterface;
  fileForm!: FormGroup;
  protected readonly UploadFileEnums = UploadFileEnums;

  constructor(private _formBuilder: FormBuilder) {
    this.initialForm();

    if (!this.fileForm.invalid) this.isInvalidForm = false;

    this.fileForm.valueChanges.subscribe(() => {
      this.isInvalidForm = !(
        !this.fileForm?.get("fileFront")?.invalid &&
        !this.fileForm?.get("fileBack")?.invalid &&
        !this.fileForm?.get("fileTake")?.invalid &&
        !this.fileForm.invalid
      );
    });
  }

  ngOnChanges(): void {
    this.isInvalidForm = this.isLoading;
  }

  initialForm(): void {
    this.fileForm = this._formBuilder.group({
      fileFront: [null, [Validators.required]],
      fileBack: [null, [Validators.required]],
      fileTake: [null, [Validators.required]],
    });
  }

  fileFront(fileForm: File | null): void {
    this.fileForm?.get("fileFront")?.setValue(fileForm);
  }

  fileBack(fileForm: File | null): void {
    this.fileForm?.get("fileBack")?.setValue(fileForm);
  }

  fileTakeFace(fileForm: File | null): void {
    this.fileForm?.get("fileTake")?.setValue(fileForm);
  }

  stepBack(): void {
    this.backStep.emit(IdentityEnums.personalInformation);
  }

  moveStepUpload() {
    this.uploadStep = UploadFileEnums.upload;
  }

  moveStepExample() {
    this.uploadStep = UploadFileEnums.example;
  }

  handleSubmit(): void {
    const data = {
      fileFront: this.fileForm.get("fileFront")?.value,
      fileBack: this.fileForm.get("fileBack")?.value,
      fileTake: this.fileForm.get("fileTake")?.value,
    } as FileIdInterface;
    this.clickSubmit.emit(data);
    this.isInvalidForm = this.isLoading;
  }
}
