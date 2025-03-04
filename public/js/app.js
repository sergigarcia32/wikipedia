document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("searchForm").addEventListener("submit", function(event) {
        event.preventDefault(); 

        let searchTerm = document.getElementById("searchInput").value.trim();
        let csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        let apiUrl = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerm)}&format=json&origin=*`;

        validateInput(searchTerm);
        
        saveHistory(searchTerm, csrfToken);
        
        searchResults(apiUrl);
    });
    
});

function validateInput(searchTerm){

    if (searchTerm === "") {
        alert("Por favor, ingresa un término de búsqueda.");
        return;
    }
}

function saveHistory(searchTerm, csrfToken){
    fetch('/save-search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrfToken
        },
        body: JSON.stringify({ term: searchTerm })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error al guardar:', data.error);
            showError('Error al guardar la búsqueda: ' + data.error);
        } else {
            console.log(data.message);  
        }
    })
    .catch(error => {
        console.error("Error con el fetch:", error);
        showError("Error con la solicitud de guardado: " + error.message);

    });
}

function searchResults(apiUrl){
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "<h2>Resultados:</h2>";

            if (data.query.search.length === 0) {
                resultsDiv.innerHTML += "<p>No se encontraron resultados.</p>";
                return;
            }
            data.query.search.forEach(result => {
                let title = result.title;
                let snippet = result.snippet;
                let pageUrl = `https://es.wikipedia.org/wiki/${encodeURIComponent(title)}`;

                resultsDiv.innerHTML += `
                    <div class="card my-3">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${snippet}...</p>
                            <a href="${pageUrl}" target="_blank" class="btn btn-sm btn-primary">Ver más</a>
                        </div>
                    </div>
                `;
            });
        })
        .catch(error => {
            showError("Error al obtener datos: " + error.message);
        });}

function showError(message) {
    const errorDiv = document.getElementById("error-message");

    errorDiv.innerHTML = message;   
    errorDiv.classList.remove("d-none");  

    setTimeout(() => {
        errorDiv.classList.add("d-none");
    }, 5000)
}