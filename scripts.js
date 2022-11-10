if (window.XMLHttpRequest) {
  xmlhttp = new XMLHttpRequest();
} else {
  xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
}

xmlhttp.open('GET', 'info.xml', false);
xmlhttp.send();
xmlDoc = xmlhttp.responseXML;
const products = xmlDoc.getElementsByTagName('product');
createElements();

function createElements() {
  let tableContents = `<tr>
  <th>Code</th>
  <th>Name</th>
  <th>Desc</th>
  <th>Quantity</th>
  <th>Price</th>
</tr>`;

  for (let i = 0; i < products.length; i++) {
    let row = `<tr>
      <td>${products[i].childNodes[1].innerHTML}</td>
      <td>${products[i].childNodes[3].innerHTML}</td>
      <td>${products[i].childNodes[5].innerHTML}</td>
      <td>${products[i].childNodes[7].innerHTML}</td>
      <td>${products[i].childNodes[9].innerHTML}</td>
    </tr>`;

    tableContents += row;
  }

  document.getElementById('theTable').innerHTML = tableContents;
}

function searchProductsByCode() {
  let search = document.getElementById('searchBar').value;
  if (search == '') {
    createElements();
    return;
  }

  let tableContents = `<tr>
  <th>Code</th>
  <th>Name</th>
  <th>Desc</th>
  <th>Quantity</th>
  <th>Price</th>
  </tr>`;

  for (let el of products) {
    if (checkIfReleventSearch(search, el.childNodes[1].innerHTML)) {
      let row = `<tr>
      <td>${el.childNodes[1].innerHTML}</td>
      <td>${el.childNodes[3].innerHTML}</td>
      <td>${el.childNodes[5].innerHTML}</td>
      <td>${el.childNodes[7].innerHTML}</td>
      <td>${el.childNodes[9].innerHTML}</td>
      </tr>`;

      tableContents += row;
    }
  }

  document.getElementById('theTable').innerHTML = tableContents;
}

function checkIfReleventSearch(search, code) {
  let validResponse = false;
  for (let i = 0; i < search.length && i < code.length; i++) {
    if (search.charAt(i) == code.charAt(i)) {
      validResponse = true;
    } else {
      return false;
    }
  }

  return validResponse;
}
