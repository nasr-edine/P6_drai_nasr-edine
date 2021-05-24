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
    //console.log(img)
    //console.log(img.src)
    divDescription.innerHTML = description

    // button.innerHTML = 'Play'
    // append(div_best_movie, h1)
    //console.log(divContainerImg)

    // append(divContainerImg, div_title);
    //console.log(divContainerImg)
    // //console.log(img)
    append(divImageBestMovie, img)
    // append(div_best_movie, a);
    // append(divContainerImg, divDescription);
    // append(bestMovieElement, button);
}

async function printBestMoviesList(moviesList, container) {
    // //console.log(container)
    const videos = document.getElementById(container);
    // let h1 = createNode('h1')
    // h1.innerHTML = "Meilleur film"

    return moviesList.map(async function (movie) {

        detailledInfosUrl = movie.url
        const detailledInfos = await fetch(detailledInfosUrl)
            .then(response => response.json())
        // //console.log(detailledInfos.description);


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
    // //console.log(bestMovie.results);

    detailledInfosUrl = bestMovie.results[0].url
    const detailledInfos = await fetch(detailledInfosUrl)
        .then(response => response.json())
    // //console.log(detailledInfos.description);

    printBestMovie(bestMovie.results[0], detailledInfos.description)

}

async function getBestMoviesList(container, url) {
    const bestMovies = await fetch(url)
        .then(response => response.json())
    // //console.log(bestMovies.results.length);

    const bestMoviesNext = await fetch(bestMovies.next)
        .then(response => response.json());
    // //console.log(bestMoviesNext.results.length);
    let fullList = bestMovies.results.concat(bestMoviesNext.results);
    // //console.log(fullList.length);
    firstList = fullList.slice(1, 8)
    // //console.log(firstList)
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
    // //console.log("modal: " + modal)

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // //console.log("span: " + span)

    function removeModal() {
        modal.style.display = "none";
        var titleModal = document.getElementById("title-modal");
        var imgModal = document.getElementById("img-modal");
        var descriptionModal = document.getElementById("description-modal");
        var smallInfos = document.getElementById('first-list')
        var smallInfos2 = document.getElementById('second-list')
        var directors = document.getElementById('directors')
        var actors = document.getElementById('actors')

        titleModal.remove();
        imgModal.remove();
        descriptionModal.remove();
        // Removing all items of an ul element
        while (smallInfos.firstChild) {
            console.log(smallInfos.firstChild)
            smallInfos.removeChild(smallInfos.firstChild);
        }
        smallInfos.remove();
        // Removing all items of an ul element
        while (smallInfos2.firstChild) {
            console.log(smallInfos2.firstChild)
            smallInfos2.removeChild(smallInfos2.firstChild);
        }
        smallInfos2.remove()
        directors.remove();
        actors.remove()

    }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        removeModal()
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            removeModal()
        }
    }
    document.addEventListener("click", function (event) {
        var path = event.path || (event.composedPath && event.composedPath());
        if (event.target.matches(".best-movie")) {
            //console.log("View button has been clicked")
            printData(path[0].dataset.id)
            return
        }
        if (event.target.matches(".close")) {
            //console.log("close button has been clicked")
            return
        };
        if (event.target.matches(".modal-content")) {
            //console.log("anywhere inside of the modal has been clicked")
            return
        };
        if (event.target.matches(".modal")) {
            //console.log("anywhere outside of the modal has been clicked")
            return
        };
        if (event.target.matches("body")) {
            //console.log("anywhere in body has been clicked")
            return
        };
        if (event.target.matches(".img-carousel")) {
            //console.log("image has been clicked")
            event.preventDefault();
            // printData(event.path[1].dataset.id)
            printData(path[1].dataset.id)
            return
        };


    });

    let firstCarousel = document.getElementById('carousel');


    async function printData(dataId) {


        //console.log("dataId: " + dataId)
        urlMovieClicked = 'http://localhost:8000/api/v1/titles/' + dataId
        //console.log("urlMovieClicked: " + urlMovieClicked)

        const movieModalDisplay = await fetch(urlMovieClicked)
            .then(response => response.json())

        modal.style.display = "block";

        let h1 = createNode('h1')
        let img = createNode('img');
        let divDescription = createNode('div');

        let smallInfos = createNode('ul')
        let genres = createNode('li');
        let datePublished = createNode('li');
        let duration = createNode('li');
        let countries = createNode('li');

        let smallInfos2 = createNode('ul')
        let rated = createNode('li');
        let imdbScore = createNode('li');
        let worldwideGrossIncome = createNode('li');

        let directors = createNode('div');
        let actors = createNode('div');

        // new
        let divImgModal = document.getElementById('div-img-modal')
        let cardRight = document.getElementById('card-right')
        //console.log(divImgModal)
        //console.log(cardRight)
        // *****

        h1.id = "title-modal"
        img.id = "img-modal"
        divDescription.id = "description-modal"

        h1.textContent = movieModalDisplay.title
        divDescription.textContent = movieModalDisplay.description

        smallInfos.setAttribute('id', 'first-list')
        genres.textContent = movieModalDisplay.genres
        // genres.setAttribute("class", "details-infos-modal");
        genres.setAttribute("id", "genres");
        genres.setAttribute('id', 'item-first-list')

        datePublished.textContent = movieModalDisplay.date_published
        // datePublished.setAttribute("class", "details-infos-modal");
        datePublished.setAttribute("id", "date_published");

        duration.textContent = movieModalDisplay.duration + " min"
        // duration.setAttribute("class", "details-infos-modal");
        duration.setAttribute("id", "duration");
        duration.setAttribute('id', 'item-first-list')

        smallInfos2.setAttribute('id', 'second-list')
        countries.textContent = movieModalDisplay.countries
        // countries.setAttribute("class", "details-infos-modal");
        countries.setAttribute("id", "countries");

        rated.textContent = movieModalDisplay.rated
        // rated.setAttribute("class", "details-infos-modal");
        rated.setAttribute("id", "rated");

        imdbScore.textContent = movieModalDisplay.imdb_score
        // imdbScore.setAttribute("class", "details-infos-modal");
        imdbScore.setAttribute("id", "imdb_score");

        // worldwideGrossIncome.textContent = movieModalDisplay.worldwide_gross_income
        if (!movieModalDisplay.worldwide_gross_income) {
            worldwideGrossIncome.textContent = 'inconnu'
            console.log('inconnu')
        } else {

        }
        // worldwideGrossIncome.setAttribute("class", "details-infos-modal");
        worldwideGrossIncome.setAttribute("id", "worldwide_gross_income");

        directors.textContent = movieModalDisplay.directors
        directors.setAttribute("class", "details-infos-modal");
        directors.setAttribute("id", "directors");

        actors.textContent = movieModalDisplay.actors
        actors.setAttribute("class", "details-infos-modal");
        actors.setAttribute("id", "actors");

        img.src = movieModalDisplay.image_url;

        console.log(movieModalDisplay.genres)
        console.log(movieModalDisplay.date_published)
        console.log(movieModalDisplay.duration)
        console.log(movieModalDisplay.countries)

        console.log(movieModalDisplay.rated)
        console.log(movieModalDisplay.imdb_score)
        console.log(movieModalDisplay.worldwide_gross_income)

        console.log(movieModalDisplay.directors)
        console.log(movieModalDisplay.actors)


        var modalContent = document.getElementById("modal-content");
        // //console.log(modalContent)

        append(cardRight, h1)
        append(cardRight, divDescription)

        append(smallInfos, genres)
        append(smallInfos, datePublished)
        append(smallInfos, duration)
        append(smallInfos, countries)

        append(cardRight, smallInfos)

        append(smallInfos2, rated)
        append(smallInfos2, imdbScore)
        append(smallInfos2, worldwideGrossIncome)
        append(cardRight, smallInfos2)

        append(cardRight, directors)
        append(cardRight, actors)


        append(divImgModal, img)
        append(modalContent, divImgModal);

        // append(modalContent, img);
        append(modalContent, cardRight);
    }
    // *********************

}