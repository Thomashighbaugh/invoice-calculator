var $ = function (id) {
  return document.getElementById(id);
};
//Creates Discount that is applied to the subtotal
var calculateDiscountPercent = function (customerType, invoiceSubtotal) {
  var discountPercent;
  switch (customerType) {
    case "r":
      //conditions to determine the amount of the discount
      if (invoiceSubtotal < 100) {
        discountPercent = 0.1;
      } else if (invoiceSubtotal >= 100 && invoiceSubtotal < 250) {
        discountPercent = 0.2;
      } else if (invoiceSubtotal >= 250 && invoiceSubtotal < 500) {
        discountPercent = 0.25;
      } else if (invoiceSubtotal >= 500 && invoiceSubtotal < 1000) {
        discountPercent = 0.3;
      } else {
        discountPercent = 0.4;
      }
      break;
    case "l":
      discountPercent = 0.25;
      break;
    case "h":
      if (invoiceSubtotal < 500) {
        discountPercent = 0.4;
      } else if (invoiceSubtotal >= 500) {
        discountPercent = 0.5;
      }
      break;
    case "e":
      discountPercent = 0.5;
      break;
    default:
      discountPercent = 0;
  }
  // applies separate rates for various classes of customer

  if (customerType === "r") {
    if (invoiceSubtotal < 100) {
      discountPercent = 0.1;
    } else if (invoiceSubtotal >= 100 && invoiceSubtotal < 250) {
      discountPercent = 0.2;
    } else if (invoiceSubtotal >= 250 && invoiceSubtotal < 500) {
      discountPercent = 0.25;
    } else if (invoiceSubtotal >= 500 && invoiceSubtotal < 1000) {
      discountPercent = 0.3;
    } else {
      discountPercent = 0.4;
    }
  } else if (customerType === "l") {
    discountPercent = 0.3;
  } else if (customerType === "h") {
    if (invoiceSubtotal < 500) {
      discountPercent = 0.4;
    } else if (invoiceSubtotal >= 500) {
      discountPercent = 0.5;
    }
  } else if (customerType === "e") {
    discountPercent = 0.5;
  } else {
    discountPercent = 0;
  }
  return discountPercent;
};

//processes the total invoice cost as determined by input
var processEntries = function () {
  var discountAmount;
  var invoiceTotal;
  var discountPercent;

  //get values from page, reset subtotal to 2 decimals
  var customerType = $("type").value;
  var invoiceSubtotal = parseFloat($("subtotal").value);
  $("subtotal").value = invoiceSubtotal.toFixed(2);

  //call function to get discount percent
  discountPercent = calculateDiscountPercent(customerType, invoiceSubtotal);

  //calculate and display discount percent, amount, and new total
  discountAmount = invoiceSubtotal * discountPercent;
  invoiceTotal = invoiceSubtotal - discountAmount;

  $("percent").value = (discountPercent * 100).toFixed(2);
  $("discount").value = discountAmount.toFixed(2);
  $("total").value = invoiceTotal.toFixed(2);

  $("type").focus;
};

window.onload = function () {
  $("calculate").onclick = processEntries;
  $("type").focus();
};
