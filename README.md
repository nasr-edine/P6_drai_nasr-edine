# P6_drai_nasr-edine

Développez une interface utilisateur pour une application web Python

## Installation

Clone repository using:
```bash
git clone https://github.com/nasr-edine/P6_drai_nasr-edine.git
```
Move to the P6_drai_nasr-edine root folder with:
```bash
cd P6_drai_nasr-edine
```
Clone API repository in root project folder with:
```bash
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
```

Installing pipenv:
```bash
pip install pipenv
```

Move to the ocmovies-api root folder with:
```bash
cd ocmovies-api-en
```

Install project dependencies with pipenv install:
```bash
pipenv install
```
Create and populate project database with: 
```bash
pipenv run python manage.py create_db
```
## Usage

Run the server with:
```bash
pipenv run python manage.py runserver
```
open index.html with your favorite browser:
```bash
open -a "Google Chrome" index.html
open -a "firefox" index.html
open -a "safari" index.html
```


### Folder Structure with db.json created

    .
    ├── index.html           # the main file to launch with your browser to display interface
    ├── styles.css           # css code for style of html page
    ├── app.js               # content javascript code for api requests and events handling and displaying
    ├── OCMovies-API-EN-FR/  # REST API  
    └── README.md