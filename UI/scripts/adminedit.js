'use strict';

const myEdit = document.getElementById('edit');
let resultDivOne = document.getElementById('resultDivOne');
myEdit.addEventListener('click', showResultDivOne);

function showResultDivOne(e) {
	e.preventDefault();
		resultDivOne.className = "resultDivOne";
		resultDivOne.innerHTML =`<ol>
			<li><span id="optionOne">Modify Product</span></li><br>
			<li><span>Modify user account</span></li><br>
			<li><span>Delete Product</span></li>
			<li><span>Delete user account</span></li>
		</ol>`;
		return;
}