import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "splitText", standalone: true })
export class SplitTextPipe implements PipeTransform {
  transform(value: string, total?: number): string | number {
    if (total) {
      const lastValue = value.length - total;
      return (
        value.substring(0, total) +
        "..." +
        value.substring(lastValue, value.length)
      );
    }
    return (
      value.substring(0, 8) +
      "..." +
      value.substring(value.length - 8, value.length)
    );
  }
}
