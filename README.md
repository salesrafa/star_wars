# Description
This application uses the Star Wars public API to collect data about planets and movies and provides some features

# Installation

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

# Running the app

```bash
$ npm run start
```
This command will start de application, generating the tables in database e logging in a file 'log.txt'.

# Test

To run the tests:
```bash
$ npm run test
```
The files with the tests coverage information will be in a folder called 'coverage'.

Opening the 'index.html' you can see the results like this:
<table class="coverage-summary">
<thead>
<tr>
   <th data-col="file" data-fmt="html" data-html="true" class="file">File</th>
   <th data-col="pic" data-type="number" data-fmt="html" data-html="true" class="pic"></th>
   <th data-col="statements" data-type="number" data-fmt="pct" class="pct">Statements</th>
   <th data-col="statements_raw" data-type="number" data-fmt="html" class="abs"></th>
   <th data-col="branches" data-type="number" data-fmt="pct" class="pct">Branches</th>
   <th data-col="branches_raw" data-type="number" data-fmt="html" class="abs"></th>
   <th data-col="functions" data-type="number" data-fmt="pct" class="pct">Functions</th>
   <th data-col="functions_raw" data-type="number" data-fmt="html" class="abs"></th>
   <th data-col="lines" data-type="number" data-fmt="pct" class="pct">Lines</th>
   <th data-col="lines_raw" data-type="number" data-fmt="html" class="abs"></th>
</tr>
</thead>
<tbody><tr>
	<td class="file high" data-value="src"><a href="src/index.html">src</a></td>
	<td data-value="100" class="pic high">
	<div class="chart"><div class="cover-fill cover-full" style="width: 100%"></div><div class="cover-empty" style="width: 0%"></div></div>
	</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="12" class="abs high">12/12</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="0" class="abs high">0/0</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="0" class="abs high">0/0</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="10" class="abs high">10/10</td>
	</tr>

<tr>
	<td class="file medium" data-value="src/controllers"><a href="src/controllers/index.html">src/controllers</a></td>
	<td data-value="75" class="pic medium">
	<div class="chart"><div class="cover-fill" style="width: 75%"></div><div class="cover-empty" style="width: 25%"></div></div>
	</td>
	<td data-value="75" class="pct medium">75%</td>
	<td data-value="36" class="abs medium">27/36</td>
	<td data-value="50" class="pct medium">50%</td>
	<td data-value="8" class="abs medium">4/8</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="5" class="abs high">5/5</td>
	<td data-value="73.52" class="pct medium">73.52%</td>
	<td data-value="34" class="abs medium">25/34</td>
	</tr>

<tr>
	<td class="file high" data-value="src/models"><a href="src/models/index.html">src/models</a></td>
	<td data-value="100" class="pic high">
	<div class="chart"><div class="cover-fill cover-full" style="width: 100%"></div><div class="cover-empty" style="width: 0%"></div></div>
	</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="36" class="abs high">36/36</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="0" class="abs high">0/0</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="6" class="abs high">6/6</td>
	<td data-value="100" class="pct high">100%</td>
	<td data-value="24" class="abs high">24/24</td>
	</tr>

<tr>
	<td class="file medium" data-value="src/services"><a href="src/services/index.html">src/services</a></td>
	<td data-value="77.38" class="pic medium">
	<div class="chart"><div class="cover-fill" style="width: 77%"></div><div class="cover-empty" style="width: 23%"></div></div>
	</td>
	<td data-value="77.38" class="pct medium">77.38%</td>
	<td data-value="84" class="abs medium">65/84</td>
	<td data-value="41.66" class="pct low">41.66%</td>
	<td data-value="12" class="abs low">5/12</td>
	<td data-value="81.25" class="pct high">81.25%</td>
	<td data-value="16" class="abs high">13/16</td>
	<td data-value="75.64" class="pct medium">75.64%</td>
	<td data-value="78" class="abs medium">59/78</td>
	</tr>

</tbody>
</table>

# Requests

## POST - /planet/load-planet/{api_id} 

Making a post in this endpoint sending the planet's id (api_id), the application will search for this planet e load in database.

Possible response:
```bash
{
    "message": "success"
}
```

## GET - /planet
  
Query Param (optional) - name
The application will search for all planets in database. If the parameter is received, he will filter the result.

Possible response:
```bash
[
    {
        "id": 11,
        "name": "Alderaan",
        "climate": "temperate",
        "terrain": "grasslands, mountains",
        "films": [
            {
                "name": "A New Hope",
                "director": "George Lucas",
                "release_date": "1977-05-25T00:00:00.000Z"
            },
            {
                "name": "Revenge of the Sith",
                "director": "George Lucas",
                "release_date": "2005-05-19T00:00:00.000Z"
            }
        ]
    },
    {
        "id": 12,
        "name": "Hoth",
        "climate": "frozen",
        "terrain": "tundra, ice caves, mountain ranges",
        "films": [
            {
                "name": "The Empire Strikes Back",
                "director": "Irvin Kershner",
                "release_date": "1980-05-17T00:00:00.000Z"
            }
        ]
    }
]
```
## GET - /planet/{api_id}
The application will search for the planet with de id (api_id) in database.

Possible response:
```bash
{
    "id": 12,
    "name": "Hoth",
    "climate": "frozen",
    "terrain": "tundra, ice caves, mountain ranges",
    "films": [
        {
            "name": "The Empire Strikes Back",
            "director": "Irvin Kershner",
            "release_date": "1980-05-17T00:00:00.000Z"
        }
    ]
}
```

## DELETE - /planet/{api_id}
The application will delete the planet with de id (api_id) in database.

Possible response:

```bash
{
    "message": "success"
}
```
# Stay in touch

- Author - [Rafael Sales](https://www.linkedin.com/in/rafael-rodrigues-de-oliveira-sales-4b0321102/)
