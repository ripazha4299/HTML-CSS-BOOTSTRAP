var items = [];

var counter = 1;

//formname = orderForm


function setWarning(text) {

    var alertWarningHTML = ''
    alertWarningHTML += '<div class="alert alert-dismissible alert-danger">'
    alertWarningHTML += '<button type="button" class="close" data-dismiss="alert">&times;</button>'
    alertWarningHTML += '<h4 class="alert-heading">Warning!</h4>'
    alertWarningHTML += '<p class="mb-0">' + text + '</p>'
    alertWarningHTML += '</div>'

    document.getElementById('message').style.display = 'block'
    document.getElementById('message').innerHTML = alertWarningHTML;


}

function validate() {
    if (isNaN(document.orderForm.itemQty.value) || document.orderForm.itemQty.value == '') {
        setWarning('Quantity has to be a positive number and cannot be empty either.');
        return true;
    } else if (parseInt(document.orderForm.itemQty.value) < 0) {
        setWarning('Quantity has to be a positive number.');
        return true;

    } else if (isNaN(document.orderForm.itemPrice.value) || document.orderForm.itemPrice.value == '') {
        setWarning('Price has to be a positive number and cannot be empty either.');
        return true;

    } else if (parseInt(document.orderForm.itemPrice.value) < 0) {
        setWarning('Price has to be a positive number.');
        return true;
    }
    return false;
}

function addItem() {
    var item = {};
    if (validate()) {
        return;
    }
    item.id = counter;
    item.itemName = document.orderForm.itemName.value
    item.itemCode = document.orderForm.itemCode.value
    item.itemQty = document.orderForm.itemQty.value
    item.itemUnitPrice = document.orderForm.itemPrice.value
    item.itemNetPrice = parseInt(item.itemUnitPrice) * parseInt(item.itemQty)

    ++counter

    console.log('Item')
    console.log(item)

    var table = document.getElementById("ordersTable").getElementsByTagName('tbody')[0];
    var row = table.insertRow(table.rows.length);

    var idCell = row.insertCell(0);
    var itemNameCell = row.insertCell(1);
    var itemCodeCell = row.insertCell(2);
    var itemQtyCell = row.insertCell(3);
    var itemUnitPriceCell = row.insertCell(4);
    var itemNetPriceCell = row.insertCell(5);

    idCell.innerText = item.id;
    itemNameCell.innerText = item.itemName;
    itemCodeCell.innerText = item.itemCode;
    itemQtyCell.innerText = item.itemQty;
    itemUnitPriceCell.innerText = item.itemUnitPrice
    itemNetPriceCell.innerText = item.itemNetPrice

    items.push(item)

    totalBill()
}

function totalBill() {
    var itemCount = items.length;
    var itemAmount = 0;
    var nettotal=0;
    var i;
    
    //items.forEach(i => {
        for (i = 0; i < items.length; i++) {
  
          
    itemAmount += parseInt(items[i].itemNetPrice)
        }//});
    document.getElementById('count').innerText = ''
    document.getElementById('cost').innerText = ''
    nettotal= parseInt(itemAmount)+parseInt(itemAmount)*18/100;
    document.getElementById('count').innerText = itemCount
    document.getElementById('cost').innerText = itemAmount
    document.getElementById('cost1').innerText = nettotal
}
