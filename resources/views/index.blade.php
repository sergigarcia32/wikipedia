@include('components/head')
<body>
    <main>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <form id="searchForm" class="p-5">
                        <h1 class="h3 mb-3 fw-normal">Formulario de busqueda</h1>

                        <div class="form-floating">
                        <input type="text" class="form-control" id="searchInput" placeholder="Introduce tu búsqueda">
                            <label for="floatingInput">Buscar...</label>
                        </div>
                        
                        <button class="btn btn-primary w-100 mt-3 p-2" type="submit">Buscar</button>
                    </form>
                    <div id="results" class="mt-4"></div>
                    <div id="error-message" class="alert alert-danger d-none" role="alert"></div>
                </div>
            </div>
        </div>
    </main>
</body>
<script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
<script src="{{ asset('js/app.js') }}"></script>
</html>