const hostnameApi = 'http://localhost:8000'

const pathnameBestMovie = '../api/v1/titles/?sort_by=-imdb_score'
const pathnameComedy = '../api/v1/titles/?genre=Comedy&sort_by=-imdb_score'
const pathnameAction = '../api/v1/titles/?genre=Action&sort_by=-imdb_score'
const pathnameSciFi = '../api/v1/titles/?genre=Sci-Fi&sort_by=-imdb_score'

const bestMovieUrl = new URL(pathnameBestMovie, hostnameApi);
const comedyUrl = new URL(pathnameComedy, hostnameApi);
const actionUrl = new URL(pathnameAction, hostnameApi);
const SciFiUrl = new URL(pathnameSciFi, hostnameApi);

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

async function printBestMovie(bestMovie, description) {
    const div_best_movie = document.getElementById('best-imdb-score');
    const bestMovieElement = document.getElementById('best-movie');
    const divContainerImg = document.getElementById('container-best-movie');
    const divTitle = document.getElementById('title-best-movie')
    const divDescription = document.getElementById('description-best-movie')
    const divImageBestMovie = document.getElementById('image-best-movie')

    // let h1 = createNode('h1')
    // let a = createNode('a')
    // let div_title = createNode('div');
    let img = createNode('img');
    // let divDescription = createNode('div');
    // let button = createNode('button');

    // bestMovieElement.setAttribute('href', 'javascript:void(0);')
    bestMovieElement.setAttribute('data-id', bestMovie.id)
    // divContainerImg.setAttribute('data-id', bestMovie.id)

    // h1.innerHTML = "Meilleur film"
    // div_title.innerHTML = bestMovie.title
    divTitle.innerHTML = bestMovie.title
    img.src = bestMovie.image_url;
    console.log(img)
    console.log(img.src)
    divDescription.innerHTML = description

    // button.innerHTML = 'Play'
    // append(div_best_movie, h1)
    console.log(divContainerImg)

    // append(divContainerImg, div_title);
    console.log(divContainerImg)
    // console.log(img)
    append(divImageBestMovie, img)
    // append(div_best_movie, a);
    // append(divContainerImg, divDescription);
    // append(bestMovieElement, button);
}

async function printBestMoviesList(moviesList, container) {
    // console.log(container)
    const videos = document.getElementById(container);
    // let h1 = createNode('h1')
    // h1.innerHTML = "Meilleur film"

    return moviesList.map(async function (movie) {

        detailledInfosUrl = movie.url
        const detailledInfos = await fetch(detailledInfosUrl)
            .then(response => response.json())
        // console.log(detailledInfos.description);


        let a = createNode('a');
        let div_title = createNode('div');
        let img = createNode('img');
        let divDescription = createNode('div');

        divDescription.setAttribute('id', 'description')
        a.setAttribute('id', 'cell')
        a.setAttribute('class', 'cell')
        a.setAttribute('href', 'javascript:void(0);')
        a.setAttribute('data-id', movie.id)
        div_title.innerHTML = movie.title
        img.src = movie.image_url;
        img.setAttribute('class', 'img-carousel');
        divDescription.innerHTML = detailledInfos.description

        // append(a, div_title)
        append(a, img);
        // append(a, divDescription)
        append(videos, a);
    })
}

function error_function(error) {

    console.error('There has been a problem with your fetch operation:', error);

}
async function getBestMovie(url) {
    const bestMovie = await fetch(url)
        .then(response => response.json())
    // console.log(bestMovie.results);

    detailledInfosUrl = bestMovie.results[0].url
    const detailledInfos = await fetch(detailledInfosUrl)
        .then(response => response.json())
    // console.log(detailledInfos.description);

    printBestMovie(bestMovie.results[0], detailledInfos.description)

}

async function getBestMoviesList(container, url) {
    const bestMovies = await fetch(url)
        .then(response => response.json())
    // console.log(bestMovies.results.length);

    const bestMoviesNext = await fetch(bestMovies.next)
        .then(response => response.json());
    // console.log(bestMoviesNext.results.length);
    let fullList = bestMovies.results.concat(bestMoviesNext.results);
    // console.log(fullList.length);
    firstList = fullList.slice(1, 8)
    // console.log(firstList)
    printBestMoviesList(firstList, container)

}


getBestMovie(bestMovieUrl);
getBestMoviesList("carousel", bestMovieUrl);
getBestMoviesList("carouselb", comedyUrl);
getBestMoviesList("carouselc", actionUrl);
getBestMoviesList("carouseld", SciFiUrl);

window.onload = function () {
    function preva() {
        document.getElementById('carousel-wrappera').scrollLeft -= 50;
    }

    function nexta() {
        document.getElementById('carousel-wrappera').scrollLeft += 50;
    }

    function prevb() {
        document.getElementById('carousel-wrapperb').scrollLeft -= 50;
    }

    function nextb() {
        document.getElementById('carousel-wrapperb').scrollLeft += 50;
    }

    function prevc() {
        document.getElementById('carousel-wrapperc').scrollLeft -= 50;
    }

    function nextc() {
        document.getElementById('carousel-wrapperc').scrollLeft += 50;
    }

    function prevd() {
        document.getElementById('carousel-wrapperd').scrollLeft -= 50;
    }

    function nextd() {
        document.getElementById('carousel-wrapperd').scrollLeft += 50;
    }
    var leftArrowa = document.getElementById('preva');
    var rightArrowa = document.getElementById('nexta');
    var leftArrowb = document.getElementById('prevb');
    var rightArrowb = document.getElementById('nextb');
    var leftArrowc = document.getElementById('prevc');
    var rightArrowc = document.getElementById('nextc');
    var leftArrowd = document.getElementById('prevd');
    var rightArrowd = document.getElementById('nextd');

    leftArrowa.addEventListener("click", preva, false);
    rightArrowa.addEventListener("click", nexta, false);
    leftArrowb.addEventListener("click", prevb, false);
    rightArrowb.addEventListener("click", nextb, false);
    leftArrowc.addEventListener("click", prevc, false);
    rightArrowc.addEventListener("click", nextc, false);
    leftArrowd.addEventListener("click", prevd, false);
    rightArrowd.addEventListener("click", nextd, false);

    // *********************
    // Get the modal
    var modal = document.getElementById("myModal");
    // console.log("modal: " + modal)

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // console.log("span: " + span)

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        var titleModal = document.getElementById("title-modal");
        var imgModal = document.getElementById("img-modal");
        var descriptionModal = document.getElementById("description-modal");
        titleModal.remove();
        imgModal.remove();
        descriptionModal.remove();
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            var titleModal = document.getElementById("title-modal");
            var imgModal = document.getElementById("img-modal");
            var descriptionModal = document.getElementById("description-modal");
            titleModal.remove();
            imgModal.remove();
            descriptionModal.remove();
        }
    }
    document.addEventListener("click", function (event) {
        var path = event.path || (event.composedPath && event.composedPath());
        console.log(path)
        console.log(event.path)
        console.log(event.composedPath)
        console.log(event.composedPath())
        if (event.target.matches(".best-movie")) {
            console.log("View button has been clicked")
            // console.log(event)
            // console.log(event.path)
            // console.log(event.path[0])
            // console.log(event.path[0].dataset)
            // console.log(event.path[0].dataset.id)
            // printData(event.path[0].dataset.id)
            printData(path[0].dataset.id)
            return
        }
        if (event.target.matches(".close")) {
            console.log("close button has been clicked")
            return
        };
        if (event.target.matches(".modal-content")) {
            console.log("anywhere inside of the modal has been clicked")
            return
        };
        if (event.target.matches(".modal")) {
            console.log("anywhere outside of the modal has been clicked")
            return
        };
        if (event.target.matches("body")) {
            console.log("anywhere in body has been clicked")
            return
        };
        if (event.target.matches(".img-carousel")) {
            console.log("image has been clicked")
            event.preventDefault();
            // printData(event.path[1].dataset.id)
            printData(path[1].dataset.id)
            return
        };


    });

    // let clickBestMovie = document.getElementById('best-movie');
    // console.log("clickBestMovie")
    // console.log(clickBestMovie)

    // When the user clicks the best movie link , open the modal 
    // if (clickBestMovie) {
    //     clickBestMovie.addEventListener("click", printData, false);
    // }

    let firstCarousel = document.getElementById('carousel');
    // console.log("firstCarousel")
    // console.log(firstCarousel)

    // When the user clicks the best movie link , open the modal 
    // if (clickBestMovie) {
    //     clickBestMovie.addEventListener("click", printData, false);
    // }

    async function printData(dataId) {
        // console.log("a.dataset.number: " + clickBestMovie.dataset.number)
        // console.log("a.dataset.id: " + clickBestMovie.dataset.id)

        console.log("dataId: " + dataId)
        urlMovieClicked = 'http://localhost:8000/api/v1/titles/' + dataId
        console.log("urlMovieClicked: " + urlMovieClicked)

        const movieModalDisplay = await fetch(urlMovieClicked)
            .then(response => response.json())

        // console.log(movieModalDisplay)
        // console.log(movieModalDisplay.id)
        // console.log(movieModalDisplay.title)
        // console.log(movieModalDisplay.description)
        // console.log(movieModalDisplay.image_url)

        modal.style.display = "block";

        let h1 = createNode('h1')
        let img = createNode('img');
        let divDescription = createNode('div');

        h1.id = "title-modal"
        img.id = "img-modal"
        divDescription.id = "description-modal"

        h1.innerHTML = movieModalDisplay.title
        img.src = movieModalDisplay.image_url;
        divDescription.innerHTML = movieModalDisplay.description

        var modalContent = document.getElementById("modal-content");
        // console.log(modalContent)

        append(modalContent, h1)
        append(modalContent, img);
        append(modalContent, divDescription);
    }
    // *********************

}