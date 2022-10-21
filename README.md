## Description
This application uses the Star Wars public API to collect data about planets and movies and provides some features

## Installation

This application uses MySQL.

Create the database
```bash
CREATE DATABASE star_wars;
```
In the directory of application run:
```bash
cp .env.example .env
```
Then, in .env file, fill in the fields with the DB credentials and SW_PUBLIC_API as "https://swapi.dev/api/"

So, you can run
```bash
$ npm install
```

## Running the app

```bash
$ npm run start
```
This command will start de application, generating the tables in database e logging in a file 'log.txt'.

## Test

To run the tests:
```bash
$ npm run test
```
The files with the tests coverage information will be in a folder called 'coverage'
Opening the 'index.html' you can see the results like this:
![](../../../../var/folders/p7/pgwtbfz15_56h_47gc2lnjh80000gn/T/TemporaryItems/NSIRD_screencaptureui_JyH0eV/Captura de Tela 2022-10-21 às 00.15.36.png)
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Rafael Sales](https://www.linkedin.com/in/rafael-rodrigues-de-oliveira-sales-4b0321102/)
