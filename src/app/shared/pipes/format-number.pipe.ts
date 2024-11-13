/* eslint-disable  @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "formatNumber", standalone: true })
export class FormatNumberPipe implements PipeTransform {
  transform(input: any, decision = 0, defaultText = "0") {
    if (input || input === 0) {
      let parts = input.toString().replace(/[^-0-9.]+/g, "");
      parts = parts.split(".");
      const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "G" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" },
      ];

      const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      const item = lookup
        .slice()
        .reverse()
        .find(function (item) {
          return parts[0] >= item.value;
        });

      parts[0] = parts[0]
        ? (parts[0] / item!.value).toFixed(3).replace(rx, "$1")
        : "0";

      if (item!.symbol.length === 0) {
        if (parts.length >= 2) {
          if (parts[1].length >= decision) {
            parts[1] = parts[1].substring(0, decision);
          } else {
            parts[1] = parts[1].padEnd(decision, "0");
          }
        } else if (decision) {
          parts.push("0");
          parts[1] = parts[1].padEnd(decision, "0");
        }

        parts = parts.slice(0, 2);
        return parts.join(".");
      } else {
        return parts[0] + item?.symbol;
      }
    }
    return defaultText;
  }
}
