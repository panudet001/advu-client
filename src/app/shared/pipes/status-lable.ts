export function statusName(status: string) {
  if (status == "Pending") {
    return (
      '<label class="badge rounded-pill color-dark-yellow  bg-bright-yellow" >' +
      "Pending" +
      "</label>"
    );
  }
  if (status == "Success") {
    return (
      '<label class="badge rounded-pill color-fresh-green  bg-bright-fresh-green">' +
      "Success" +
      "</label>"
    );
  }
  if (status == "Cancel") {
    return (
      '<label class="badge rounded-pill color-dark-red bg-bright-red">' +
      "Cancel" +
      "</label>"
    );
  }

  return (
    '<label class="badge rounded-pill color-dark-blue  bg-bright-blue">' +
    "Refund" +
    "</label>"
  );
}

export function statusOrderName(status: string) {
  if (status == "Live") {
    return (
      '<label class="badge rounded-pill color-dark-yellow  bg-bright-yellow" >' +
      "Live" +
      "</label>"
    );
  }
  if (status == "Success") {
    return (
      '<label class="badge rounded-pill color-fresh-green  bg-bright-fresh-green">' +
      "Success" +
      "</label>"
    );
  }
  if (status == "Cancel") {
    return (
      '<label class="badge rounded-pill color-dark-red bg-bright-red">' +
      "Cancel" +
      "</label>"
    );
  }

  return (
    '<label class="badge rounded-pill color-dark-blue  bg-bright-blue">' +
    "-" +
    "</label>"
  );
}
