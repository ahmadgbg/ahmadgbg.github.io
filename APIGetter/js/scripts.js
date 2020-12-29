function addResults(key, row = false){
    const div = document.createElement('div');

    div.className = 'col-lg';
    if(row){
        const row = document.createElement('div');
        row.className = 'row';
        document.getElementById('results').appendChild(row);
        row.appendChild(div);

    }else{
        var getDiv = document.querySelectorAll("#results div.row");
        getDiv[getDiv.length-1].appendChild(div);
    }
    
    const table = document.createElement('table');

    table.className = 'table result-'+key;

    table.innerHTML = `<thead>
                        <tr>
                        </tr>
                        <tr>
                        </tr>
                        <tr>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>`;
                    div.appendChild(table); 

}

document.getElementById("submitButton").addEventListener("click", function(){
    getApi();
});

document.getElementById("apiUrl").addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
        getApi();
    }
});

function getValues(jsonString, table){
        if(typeof jsonString == 'object' && jsonString != null && jsonString != []){
            for(var i = 0; i < Object.values(jsonString).length; i++){
                if(typeof Object.values(jsonString)[i] == 'object' && jsonString != null && jsonString != []){
                    var tr = document.createElement('tr');
                    for(var j = 0; j < Object.values(Object.values(jsonString)[i]).length; j++){
                            tr.innerHTML += '<td>'+Object.values(Object.values(jsonString)[i])[j]+'</td>';
                        }
                    table.querySelectorAll("tbody")[0].appendChild(tr);
                }else{
                    table.querySelectorAll("tbody")[0].innerHTML += '<tr><td>'+Object.values(jsonString)[i]+'</td></tr>';
                }
            }
        }else {
            table.querySelectorAll("thead > tr:nth-child(2) > th")[0].innerHTML += jsonString;
        }   
}

function getKeys(jsonString, table){
    if(typeof jsonString == 'object' && jsonString != null && jsonString != []){
            if(typeof Object.values(jsonString)[0] == 'object' && jsonString != null && jsonString != []){
                for(var j = 0; j < Object.keys(Object.values(jsonString)[0]).length; j++){
                    table.querySelectorAll("thead > tr")[2].innerHTML += '<th>'+Object.keys(Object.values(jsonString)[0])[j]+'</th>';
                }
            }else{
                table.querySelectorAll("thead > tr")[2].innerHTML += '<th>'+Object.keys(jsonString)[0]+'</th>';
            }
    }
}

function getApi() {
    const apiUrl = document.getElementById('apiUrl').value;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', apiUrl, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        var resultExist = document.querySelectorAll('#results div');
        if (resultExist.length > 0){
            for(var i = 0; i < resultExist.length;i++){
                resultExist[i].parentNode.removeChild(resultExist[i]);
            }
        }
        if (status === 200) {
            const response = xhr.response;
            document.getElementById('responseCode').innerHTML = 'Response Code: '+xhr.status+' '+xhr.statusText;
            document.getElementById('responseCode').style.backgroundColor = '#198754'
            var count = 0;
            var row = false;
            for (var key in response) {
                var divClass = key.replace(/(\W)/g, '\\$1');
                if(count === 0){
                    row = true;
                }
                if(count % 3 === 0) {
                    row = true;
                }
                addResults(divClass, row);
                row = false;
                var table = document.getElementsByClassName('result-'+divClass)[0];
                getKeys(response[key], table);
                table.querySelectorAll("thead > tr")[0].innerHTML = '<th colspan="'+table.rows[2].cells.length+'" class="key">Key: '+key+'</th>';
                table.querySelectorAll("thead > tr")[1].innerHTML = '<th colspan="'+table.rows[2].cells.length+'" class="values">Values: </th>';
                getValues(response[key], table);
                count += 1;
            }
        } else {
            document.getElementById('responseCode').innerHTML = 'Response Code: '+xhr.status+' '+xhr.statusText+' - See console log for more information.'
            document.getElementById('responseCode').style.backgroundColor = '#dc3545'
        }
    }
    xhr.onerror = function() {
        document.getElementById('responseCode').innerHTML = 'Response Code: '+xhr.status+' '+xhr.statusText+' - See console log for more information.';
        document.getElementById('responseCode').style.backgroundColor = '#dc3545'
    }
    xhr.send();
    
}