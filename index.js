var order = [];

function addToOrder(button) {
  // Get the description and price elements for this cake
  var content = button.closest('.content');
  var description = content.querySelector('.description').innerText;
  var price = parseFloat(content.querySelector('.price1').innerText.replace('$', ''));

  // Check if the cake with the same description has already been added
  var existingItem = order.find(function(item) {
    return item.description === description;
  });

  if (existingItem) {
    // If the cake already exists, increase the quantity by 1
    existingItem.quantity++;
    existingItem.totalPrice += price;
    updateOrderList();
  } else {
    // If the cake doesn't exist, add a new item to the order array
    order.push({
      description: description,
      price: price,
      quantity: 1,
      totalPrice: price
    });

    var orderList = document.getElementById('order-list');
    var emptyCart = orderList.querySelector('.empty-cart');
    if (emptyCart) {
      emptyCart.style.display = 'none';
    }

    var newOrderItem = document.createElement('div');
    newOrderItem.dataset.description = description;
    newOrderItem.dataset.totalPrice = price;
    newOrderItem.innerText = description + ' - $' + price.toFixed(2);
    orderList.appendChild(newOrderItem);

    updateOrderList();
  }

  var messageBox = document.getElementById("message-box");
  var existingOrderItem = order.find(function(item) {
    return item.description === description && item.quantity > 1;
  });
  if (existingOrderItem) {
    messageBox.innerHTML = description + " (" + existingOrderItem.quantity + "x)"+ " has been added to your cart! Please scroll to the \"Order\" section to see your orders.";
  } else {
    messageBox.innerHTML = description + " has been added to your cart! Please scroll to the \"Order\" section to see your orders.";
  }
  messageBox.style.display = "block";

  setTimeout(hideMessage, 4000);
}

function updateOrderList() {
  var orderList = document.getElementById('order-list');
  orderList.innerHTML = '';

  order.forEach(function(item) {
    var newOrderItem = document.createElement('div');
    newOrderItem.dataset.description = item.description;
    newOrderItem.dataset.totalPrice = item.totalPrice;
    if (item.quantity > 1) {
      newOrderItem.innerText = item.description + ' (x' + item.quantity + ') - $' + item.totalPrice.toFixed(2);
    } else {
      newOrderItem.innerText = item.description + ' - $' + item.totalPrice.toFixed(2);
    }
    orderList.appendChild(newOrderItem);
  });

  var totalPrice = document.getElementById('total-price');
  var newTotal = order.reduce(function(total, item) {
    return total + item.totalPrice;
  }, 0);
  totalPrice.innerText = 'Total price: $' + newTotal.toFixed(2);

}



function hideMessage() {
  var messageBox = document.getElementById("message-box");
  messageBox.innerHTML = "";
  messageBox.style.display = "none";
}
