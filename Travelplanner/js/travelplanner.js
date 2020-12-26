		var antalPersoner = 0;
		var antalPersonerBarn = 0;
		var sumHyrBil = 0;
		var sumHotel = 0;
		var sumFlyg = 0;
		var sumFlygBarn = 0;
		var total = 0; 
		var symbol = '';
		document.getElementById('sendButton').addEventListener('click', function(){
			document.getElementById('mainContainer').style.display = "block";
			antalPersoner = parseInt(document.getElementById('antalPersonerText').value);
			antalPersonerBarn = parseInt(document.getElementById('antalPersonerTextBarn').value);
			symbol = document.getElementById('symbol').value;
			document.getElementById('antalPersonerDiv').style.display = "none";
			document.getElementById('logo').style.display = "none";
			checkChild();
			if(document.getElementById("traveltable").rows.length == 3){
			document.getElementById("addRow").click(); }
			if(document.getElementById("flygBarn") != null && antalPersonerBarn == 0){
			for(var i = 0;i < document.getElementById("traveltable").rows.length-1;i++){
			document.getElementById("traveltable").rows[i].deleteCell(3);
			}
			document.getElementById("beskrivning").style.width = "40%";
			}
			changeSymbol();
			

		});
		function checkChild(){
			if(antalPersonerBarn > 0 && document.getElementById("flygBarn") == null)
				{
				var row = document.getElementById("flyg").parentNode;
				var th = document.createElement("th");
				th.id = "flygBarn";
				th.innerHTML = "<i class='fas fa-baby'></i> Flyg Barn<br>("+symbol+")";
				th.style.width = "15%";
				row.insertBefore(th, row.childNodes[6]);
				row = document.getElementById("insertBefore");
				cell = row.insertCell(3);
				cell.id = "sumFlygBarn";
				cell.innerHTML = "- "+symbol;
				row = document.getElementById("totalHyrBil").parentNode;
				cell = row.insertCell(3);
				cell.id = "totalFlygBarn";
				cell.innerHTML = "- "+symbol;
				document.getElementById("beskrivning").style.width = "30%";
				for(var i = 1;i < document.getElementById("traveltable").rows.length-2;i++){
					if(document.getElementById("traveltable").rows[i].cells.length == 5){
					var newcell = document.getElementById("traveltable").rows[i].insertCell(3);
					newcell.className = "value editable";
					document.getElementById("refresh").click();
					}
					}
					
					
			}
				
				}
			document.getElementById('changeButton').addEventListener('click', function(){
			document.getElementById('mainContainer').style.display = "none";
			document.getElementById('antalPersonerDiv').style.display = "block";
			document.getElementById('logo').style.display = "block";
			resetSymbol();
		});
		function changeSymbol(){
			alltd = document.getElementById("traveltable").getElementsByTagName("td")
			for (var i = 0; i < alltd.length; i++) {
				replaced = alltd[i].innerHTML.replace('(symbol)', symbol);
				alltd[i].innerHTML = replaced;
			};
		};
		function resetSymbol(){
			alltd = document.getElementById("traveltable").getElementsByTagName("td")
			for (var i = 0; i < alltd.length; i++) {
				replaced = alltd[i].innerHTML.replace(symbol ,'(symbol)');
				alltd[i].innerHTML = replaced;
			};
		}
		var traveltable = document.getElementById("traveltable").rows;
		function sumOfColumn(antalPersoner){
			 sumHyrBil = 0;
			 sumHotel = 0;
			 sumFlyg = 0;
			 sumFlygBarn = 0;
			if(antalPersonerBarn > 0)
			{
				for (var i = 1; i < traveltable.length-1; i++){
					if(traveltable[i].cells[1].classList.contains('value')){
						sumHotel += isNaN(traveltable[i].cells[1].innerHTML) ? 0 : parseInt(traveltable[i].cells[1].innerHTML); 
					}        
				 }
				for (var i = 1; i < traveltable.length-1; i++){
					if(traveltable[i].cells[2].classList.contains('value')){
						sumFlyg += isNaN(traveltable[i].cells[2].innerHTML) ? 0 : parseInt(traveltable[i].cells[2].innerHTML); 
					}
				}
				for (var i = 1; i < traveltable.length-1; i++){
					if(traveltable[i].cells[3].classList.contains('value')){
						sumFlygBarn += isNaN(traveltable[i].cells[3].innerHTML) ? 0 : parseInt(traveltable[i].cells[3].innerHTML); 
					}
				}
				for (var i = 1; i < traveltable.length-1; i++){
					if(traveltable[i].cells[4].classList.contains('value')){
						sumHyrBil += isNaN(traveltable[i].cells[4].innerHTML) ? 0 : parseInt(traveltable[i].cells[4].innerHTML); 
					}
				}

				 document.getElementById("sumHotel").innerHTML = sumHotel+" "+symbol;
				 document.getElementById("sumFlyg").innerHTML = sumFlyg+" "+symbol;
				 document.getElementById("sumHyrBil").innerHTML = sumHyrBil+" "+symbol;
				 document.getElementById("sumFlygBarn").innerHTML = sumFlygBarn+" "+symbol;
				 document.getElementById("totalHotel").innerHTML = sumHotel*antalPersoner+" "+symbol;
				 document.getElementById("totalFlyg").innerHTML = sumFlyg*antalPersoner+" "+symbol;
				 document.getElementById("totalHyrBil").innerHTML = sumHyrBil*antalPersoner+" "+symbol;
				 document.getElementById("totalFlygBarn").innerHTML = sumFlygBarn*antalPersonerBarn+" "+symbol;
				 total = sumHotel+sumHyrBil;
				 total += sumFlyg*antalPersoner;
				 total += sumFlygBarn*antalPersonerBarn;
				 document.getElementById("total").innerHTML = "Total: "+total+" "+symbol;
				
				
				
				
			}else {
			for (var i = 1; i < traveltable.length-1; i++){
				if(traveltable[i].cells[1].classList.contains('value')){
					sumHotel += isNaN(traveltable[i].cells[1].innerHTML) ? 0 : parseInt(traveltable[i].cells[1].innerHTML); 
				}        
			 }
			for (var i = 1; i < traveltable.length-1; i++){
				if(traveltable[i].cells[2].classList.contains('value')){
					sumFlyg += isNaN(traveltable[i].cells[2].innerHTML) ? 0 : parseInt(traveltable[i].cells[2].innerHTML); 
				}
			}
			for (var i = 1; i < traveltable.length-2; i++){
				if(traveltable[i].cells[3].classList.contains('value')){
					sumHyrBil += isNaN(traveltable[i].cells[3].innerHTML) ? 0 : parseInt(traveltable[i].cells[3].innerHTML); 
				}
			}
			document.getElementById("sumHotel").innerHTML = sumHotel+" "+symbol;
			document.getElementById("sumFlyg").innerHTML = sumFlyg+" "+symbol;
			document.getElementById("sumHyrBil").innerHTML = sumHyrBil+" "+symbol;
			document.getElementById("totalHotel").innerHTML = sumHotel*antalPersoner+" "+symbol;
			document.getElementById("totalFlyg").innerHTML = sumFlyg*antalPersoner+" "+symbol;
			document.getElementById("totalHyrBil").innerHTML = sumHyrBil*antalPersoner+" "+symbol;
			 total = sumHotel+sumHyrBil;
			 total += sumFlyg*antalPersoner;
			 document.getElementById("total").innerHTML = "Total: "+total+" "+symbol;
			}
			
		}
		document.getElementById("addRow").addEventListener("click", function(){insertNewRow()});
		function insertNewRow(){
			
		
		  var table = document.getElementById("traveltable");
		  var beforeRow = document.getElementById("insertBefore");
		  if(table.rows.length < 11){
			  var rowIndex = beforeRow.rowIndex;
				var row = table.insertRow(rowIndex);
				var cell1 = row.insertCell(0);
				cell1.className = "value beskrivning";
				for(i=1;i<traveltable[0].cells.length-1;i++){
				var cell = row.insertCell(i);
				cell.className = "value editable";
				}
				var lastcell = row.insertCell();
				var btn = document.createElement("BUTTON");
				btn.innerHTML = "X";
				btn.id = lastcell.parentNode.rowIndex;
				btn.className = "btn btn-danger";
				btn.setAttribute("onclick", "removeRow(this.id)");
				lastcell.appendChild(btn);
				document.getElementById("refresh").click();
		  } else {
			  alert("Too many rows.");
		  }
		
		};
		function removeRow(id){
			var table = document.getElementById("traveltable");
			if(table.rows.length > 4){
				var table = document.getElementById("traveltable");
				table.deleteRow(id);
				updateRowId();
				sumOfColumn(antalPersoner);
			} else{
				alert("At least one row must exist.");
			}
		}
		function updateRowId(){
			var rows = document.getElementById("traveltable").rows;
			if(rows.length > 3){
			for(var i = 1; i < rows.length-2;i++){
				rows[i].lastChild.firstChild.id = rows[i].rowIndex;
			}
			}
			
		}
	$.fn.editable.defaults.mode = 'inline';
	$(document).ready(function() {
		$('.editable').editable({
			type: 'text',
			unsavedclass: null,
			validate: function(value) {
			    if(isNaN(parseInt(value))) {
			        return value+' is not a number';
			    }
			},
			success: function(response, newValue) {
					this.innerHTML = newValue;
					sumOfColumn(antalPersoner);
			}
		});
		$('.beskrivning').editable({
			type: 'text',
			unsavedclass: null,
			success: function(response, newValue) {
					this.innerHTML = newValue;
			}
		});
		
		$('#refresh').click(function(){
			$('.editable').editable({
				type: 'text',
				unsavedclass: null,
				validate: function(value) {
				    if(isNaN(parseInt(value))) {
				        return value+' is not a number';
				    }
				},
				success: function(response, newValue) {
						this.innerHTML = newValue;
						sumOfColumn(antalPersoner);
				}
			});
			$('.beskrivning').editable({
				type: 'text',
				unsavedclass: null,
				success: function(response, newValue) {
						this.innerHTML = newValue;
				}
			});
});
	});
