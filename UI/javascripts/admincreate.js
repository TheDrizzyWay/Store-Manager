"use strict"

const myForm = document.getElementById("selectForm");
let resultDiv = document.getElementById("resultDiv");
myForm.addEventListener("submit", showResult);

function showResult(e) {
	e.preventDefault();
	let selected = document.querySelector("select").value.toLowerCase();
	if (selected == "new product") {
		resultDiv.className = "resultDiv";
		resultDiv.innerHTML =`<form class="resultform">
  								<p>Create New Product</p>
  								<label>Product Name</label>
  								<input/>
  								<label>Product Category</label>
  								<input/>
                  <label>Images:</label>
                  <input type="file" name="">
  								<label>Product Description</label>
  								<input/>
  								<label>Product Price</label>
  								<input/>
  								<label>Product Quantity</label>
  								<input/>
  								<label>Product Minimum Stock</label>
  								<input/>
  								<button>Confirm</button>
							</form>`;
		return;
	} else if (selected == "new category") {
		resultDiv.className = "resultDiv";
		resultDiv.innerHTML =`<form class="resultform">
  								<p>Create New Category</p>
  								<label>Category Name</label>
  								<input/>
  								<label>Category Description</label>
  								<input/>
  								<button>Confirm</button>
							</form>`;
		return; 
	} else {
		resultDiv.className = "resultDiv";
		resultDiv.innerHTML =`<form class="resultform">
  								<p>Create New Account</p>
  								<label>Name</label>
  								<input/>
  								<label>Email</label>
  								<input/>
  								<label>Username</label>
  								<input/>
  								<label>Default Password</label>
  								<input/>
  								<button>Confirm</button>
							</form>`;
		return; 
	}
}
