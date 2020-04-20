function Student(id, firstName, lastName, email) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
}

Student.prototype.name = function(){
    return this.firstName + ' ' + this.lastName
}

var students = []
var counter = 0;

function setWarning(text) {

    var alertWarningHTML = ''
    alertWarningHTML += '<div class="alert alert-dismissible alert-danger">'
    alertWarningHTML += '<button type="button" class="close" data-dismiss="alert">&times;</button>'
    alertWarningHTML += '<h4 class="alert-heading">Warning!</h4>'
    alertWarningHTML += '<p class="mb-0">' + text + '</p>'
    alertWarningHTML += '</div>'

    document.getElementById('message').style.display = 'block';
    document.getElementById('message').innerHTML = alertWarningHTML;

}

function namev(val)
{
    var x = val;
    var letters = /^[A-Za-z]+$/;
    if(!(x.match(letters)))
    {
        return false;
    }
    return true;
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

function ValidateID(value)
{
    var x = counter;
    var table = document.getElementById('ordersTable');
    for (var r = 0, n = table.rows.length; r < n; r++)
    {
        if(table.rows[r].cells[0].innerText==value)
        {
            return false;
        }
    }
    return true;
}

function validate() {
    if (isNaN(document.orderForm.id.value) || document.orderForm.id.value == '') {
        setWarning('ID has to be a positive number and cannot be empty either.');
        return true;

    } else if (!ValidateID(document.orderForm.id.value)) {
        setWarning('ID details already exist');
        return true;

    } else if (!namev(document.orderForm.firstName.value)) {
        setWarning('First Name format incorrect.');
        return true;

    } else if (!namev(document.orderForm.lastName.value)) {
        setWarning('Last Name format incorrect.');
        return true;

    } else if (!ValidateEmail(document.orderForm.email.value)) {
        setWarning('Email format incorrect.');
        return true;
    } 
    return false;
}


function addStudent() {

    if(validate()){
        return;
    }
    document.getElementById('table').style.visibility = 'visible';
    document.getElementById('message').style.display = 'none';
    ++counter

    let student = new Student(
        document.getElementById('id').value,
        document.getElementById('firstName').value,
        document.getElementById('lastName').value,
        document.getElementById('email').value
    )
    students.push(student)
    console.log(student)
    
    var table = document.getElementById("ordersTable").getElementsByTagName('tbody')[0];
    var row = table.insertRow(table.rows.length);

    var idCell = row.insertCell(0);
    var fnameCell = row.insertCell(1);
    var lnameCell = row.insertCell(2);
    var emailCell = row.insertCell(3);
    var editCell = row.insertCell(4);
    var saveCell = row.insertCell(5);
    var delCell = row.insertCell(6);
    
    var button1 = document.createElement('input');
    button1.setAttribute('type', 'button');
    button1.setAttribute('value', 'Edit');
    button1.setAttribute('onclick','editRow(this)');
    editCell.appendChild(button1);

    var button2 = document.createElement('input');
    button2.setAttribute('type', 'button');
    button2.setAttribute('value', 'Delete');
    button2.setAttribute('onclick', 'removeRow(this)');
    delCell.appendChild(button2);

    var button3 = document.createElement('input');
    button3.setAttribute('type', 'button');
    button3.setAttribute('value', 'Save');
    //button3.style.display='none';
    button3.setAttribute('onclick','saveRow(this)');
    saveCell.appendChild(button3);

    idCell.innerText = student.id;
    idCell.style.color = "#42f551";
    fnameCell.innerText = student.firstName;
    lnameCell.innerText = student.lastName;
    emailCell.innerText = student.email;   
}

function removeRow(oButton) {
    var r = confirm("Confirm deletion of the row?");
    if (r == false) {
        return;
    } 
    else 
    {
        var empTab = document.getElementById('ordersTable');
        empTab.deleteRow(oButton.parentNode.parentNode.rowIndex);
        counter-=1;
        if(counter==0){
            document.getElementById('table').style.visibility = 'hidden';
        }
    }
}

function ctoe(x) {  //changes label to text input
    var ele = document.createElement('input');
        ele.setAttribute('type', 'text');
        ele.setAttribute('id', 'tt');
        ele.setAttribute('value', x.innerText);
    x.innerText='';
    x.appendChild(ele);
 } 

 function etoc(ele) {  //changes label to text input
    Array.from(document.querySelectorAll('table input')).forEach(function(ele) {
   var td = document.createElement('td');
   td.innerHTML = ele.value;
   ele.parentNode.replaceChild(td, ele);
 });
}

function editRow(oButton) 
{   
    var r= oButton.parentNode.parentNode.rowIndex;
    var cell = document.getElementById('ordersTable').rows[r].cells;
    var idCell = cell[0];
    var fnameCell = cell[1];
    var lnameCell = cell[2];
    var emailCell = cell[3];
    //var saveCell = cell[5];
    ctoe(idCell);
    ctoe(fnameCell);
    ctoe(lnameCell);
    ctoe(emailCell);
    //saveCell.style.display='block';    
}

function saveRow(btn)
{
    var r= btn.parentNode.parentNode.rowIndex;
    var cell = document.getElementById('ordersTable').rows[r].cells;
    var idCell = cell[0];
    var fnameCell = cell[1];
    var lnameCell = cell[2];
    var emailCell = cell[3];

    console.log(idCell.innerText,fnameCell.innerText);
    //var editCell = cell[4];
    
        if (isNaN(idCell.value) || idCell.value == '') {
            setWarning('ID has to be a positive number and cannot be empty either.');
            return true;
    
        } else if (!ValidateID(idCell.value)) {
            setWarning('ID details already exist');
            return true;
    
        } else if (!namev(fnameCell.value)) {
            setWarning('First Name format incorrect.');
            return true;
    
        } else if (!namev(lnameCell.value)) {
            setWarning('Last Name format incorrect.');
            return true;
    
        } else if (!ValidateEmail(emailCell.value)) {
            setWarning('Email format incorrect.');
            return true;
        } 
        etoc(idCell);
        etoc(fnameCell);
        etoc(lnameCell);
        etoc(emailCell);



}