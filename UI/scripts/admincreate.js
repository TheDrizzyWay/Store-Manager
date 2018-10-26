"use strict"

const myForm = document.getElementById("selectForm");
let resultDiv2 = document.getElementById("resultDiv2");
myForm.addEventListener("submit", showResult);

function showResult(e) {
	e.preventDefault();
	let selected = document.querySelector("select").value.toLowerCase();
	if (selected == "new product") {
		resultDiv2.className = "resultDiv2";
		resultDiv2.innerHTML =`<form class="resultform">
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
  								<input/><br>
  								<button>Confirm</button>
							</form>`;
		return;
	} else {
		resultDiv2.className = "resultDiv2";
		resultDiv2.innerHTML =`<form class="resultform">
  								<p>Create New Account</p>
  								<label>Name</label>
  								<input/>
  								<label>Email</label>
  								<input/>
  								<label>Username</label>
  								<input/>
  								<label>Default Password</label>
  								<input/><br>
  								<button>Confirm</button>
							</form>`;
		return; 
	}
}
