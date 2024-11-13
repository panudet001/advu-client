import { Pipe, PipeTransform } from "@angular/core";

import { TranslateService } from "@ngx-translate/core";
import moment from "moment";

@Pipe({
  name: "dateTimeFormat",
  standalone: true,
})
export class DateTimeFormatPipe implements PipeTransform {
  activeLang!: string;

  constructor(public _translocoService: TranslateService) {
    this.activeLang = _translocoService.currentLang;
  }

  transform(value: Date): string {
    if (this.activeLang == "th") {
      return this.dateToShortThaiDateText(value);
    }
    return moment(value).format("DD MMM YYYY HH:mm");
  }

  dateToShortThaiDateText(dateText: Date): string {
    const months = [
      "ม.ค.",
      "ก.พ.",
      "มี.ค.",
      "เม.ย.",
      "พ.ค.",
      "มิ.ย.",
      "ก.ค.",
      "ส.ค.",
      "ก.ย.",
      "ต.ค.",
      "พ.ย.",
      "ธ.ค.",
    ];
    const date = new Date(dateText);
    const month = months[date.getMonth()];
    const year = (date.getFullYear() + 543).toString();
    return (
      date.getDate() +
      " " +
      month +
      " " +
      year +
      " " +
      moment(dateText).format("HH:mm")
    );
  }
}
