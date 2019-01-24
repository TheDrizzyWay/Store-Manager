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
			<li>Sample product 1<a href="adminview.html" class="view">View </a></li><br>
			<li>Sample product 2<a href="adminview.html" class="view">View </a></li><br>
			<li>Sample product 3<a href="adminview.html" class="view">View </a></li><br>
		</ol>`;
		return;
	} else {
		resultDiv.className = "resultDiv";
		resultDiv.innerHTML =`<ol>
			<li>Sample attendant 1<a href="adminrecord.html" class="view">View Sales record</a></li><br>
			<li>Sample attendant 2<a href="adminrecord.html" class="view">View Sales record</a></li><br>
			<li>Sample attendant 3<a href="adminrecord.html" class="view">View Sales record</a></li><br>
		</ol>`;
		return; 
	}
}
