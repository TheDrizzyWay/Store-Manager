"use strict"

const myForm = document.getElementById("selectForm");
let resultDiv = document.getElementById("resultDiv");
myForm.addEventListener("submit", showResult);

function showResult(e) {
	e.preventDefault();
	let selected = document.querySelector("select").value.toLowerCase();
	if (selected == "products") {
		resultDiv.className = "resultDiv";
		resultDiv.innerHTML =`<ol>
			<li>Sample product 1<a href="saleorder.html" class="view">View Details</a></li><br>
			<li>Sample product 2<a href="saleorder.html" class="view">View Details</a></li><br>
			<li>Sample product 3<a href="saleorder.html" class="view">View Details</a></li><br>
		</ol>`;
		return;
	} else {
		resultDiv.className = "resultDiv";
		resultDiv.innerHTML =`<ol>
			<li>Sample category 1</li><br>
			<li>Sample category 2</li><br>
			<li>Sample category 3</li><br>
		</ol>`;
		return; 
	} 
}
