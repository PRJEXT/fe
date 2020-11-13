function getQuerystring(search) {
  var pairs = location.search.slice(1).split('&');
  var result = {};

  pairs.forEach(function(pair) {
      pair = pair.split('=');
      result[pair[0]] = decodeURIComponent(pair[1] || '');
  });

  return result;
}

function handleFormSubmit () {
  const interest = document.getElementById("selecInte").value;
  const quality = document.getElementById("selecQuali").value;
  const review = document.getElementById("relatoExp").value;
  const { idStudent, idClass } = getQuerystring(window.location.search);
  
  console.log(interest, quality, review, idStudent, idClass);

  let response = fetch('/student', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ interest, quality, review, idStudent, idClass })
  })
  .then(response => response.json())
  .then(json =>  {
    console.log(json);
  })
  .catch(error => console.log(error));
}

