![](http://i.imgur.com/esjTHFE.png)

### Overview
DataPlay is an open-source data analysis and exploration game developed by [PlayGen](http://playgen.com/) as part of the EU's [CELAR](http://celarcloud.eu) initiative.

The aim of DataPlay, besides taking CELAR for a spin, is to provide a collaborative environment in which non-expert users get to "play" with government data. The system presents the user with a range of elements of the data, displayed in a variety of visual forms. People are then encouraged to explore this data together. The system also seeks to identify potential correlations between disparate datasets, in order to help users discover hidden patterns within the data.

### Architecture
The back end is written in [Go](http://golang.org/), to provide concurrency for large volume data processing. There is a multiple master/frontend architecture which relies on [HAProxy](http://www.haproxy.org/) for its Load-balancing capabilities. The backend also utilises [Martini](https://github.com/go-martini/martini) for parametric API routing, [PostgreSQL](http://www.postgresql.org/) with [GORM](https://github.com/jinzhu/gorm) for dealing with datasets, [Cassandra](http://cassandra.apache.org/) coupled with [gocql](https://github.com/gocql/gocql) for data obtained via scraping of 3rd party news sources. [Redis](http://redis.io/) for storing monitoring and session related data.

The front end is written in [CoffeeScript](http://coffeescript.org/) and [AngularJS](https://angularjs.org/) and makes use of the [d3.js](http://d3js.org/), [dc.js](http://dc-js.github.io/dc.js/) and [NVD3.js](http://nvd3.org/) charting packages.

DataPlay alpha contains a rudimentary selection of datasets drawn from [data.gov.uk](http://data.gov.uk/), along with political information taken from the [BBC](http://www.bbc.co.uk/news/), which was extracted and analysed via [python](https://www.python.org/) scripted [import.io](https://import.io/) and Go implemented [embed.ly](http://embed.ly/).

##Screens
### Landing Page
![](http://i.imgur.com/mGn80SN.png)

### Home Page
![](http://i.imgur.com/Ut62v6k.png)

### Overview Screen
![](http://i.imgur.com/krYs5fT.png)

### Search Page
![](http://i.imgur.com/3kkjeM7.png)

### Chart Page
![](http://i.imgur.com/sS58Hli.png)

## Installation

1. Install Ubuntu & Node.js
2. Install all necessary dependencies `npm install`

*Note*: Refer [`tools/deployment/base.sh`](tools/deployment/base.sh) for base system config and libs.

### Production:

1. HAProxy Load Balancer [`tools/deployment/loadbalancer/haproxy.sh`](tools/deployment/loadbalancer/haproxy.sh)
2. Gamification instances [`tools/deployment/app/frontend.sh`](tools/deployment/app/frontend.sh)
3. Computation/API instances [`tools/deployment/app/master.sh`](tools/deployment/app/master.sh)
4. PostgreSQL DB instance [`tools/deployment/db/postgresql.sh`](tools/deployment/db/postgresql.sh)
5. Cassandra DB instance [`tools/deployment/db/cassandra.sh`](tools/deployment/db/cassandra.sh)
6. Redis instance [`tools/deployment/db/redis.sh`](tools/deployment/queue/redis.sh)

### Monitoring:

1. API response time monitoring [`tools/deployment/monitoring/api.sh`](tools/deployment/monitoring/api.sh)
2. HAProxy API for dynamic scaling [`tools/deployment/loadbalancer/api/`](tools/deployment/loadbalancer/api/)

## Usage

### Development:

1. Run Backend in Classic mode `./start.sh`
2. Run Frontend `cd www-src && npm install && grunt serve`

### Staging:

1. Run Gamification server in Master mode `./start.sh --mode=2`
2. Run Compute server in Node mode `./start.sh --mode=1`
3. Deploy & run Frontend in `cd www-src && npm install && grunt serve:dist`

### Production:

1. Run Gamification server in Master mode `./start.sh --mode=2`
2. Run Compute server in Node mode `./start.sh --mode=1`
3. Deploy & run Frontend in `cd www-src && npm install && grunt build`

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

v1.0.2: 	Added API health monitoring probes.

v1.0.1: 	System-wide environment variables

v1.0.0: 	CELAR compatible scripts

v0.9.1: 	Deployment Scripts

v0.9.0: 	Update to AngularJS v1.3

v0.8.9: 	Use NVD3 for Correlated Charts

v0.8.5: 	Added Correlated Charts

v0.8.0: 	Added Related Charts

v0.7.5: 	Added DC.js for Charts

v0.7.2: 	Use Bootstrap for HTML

v0.7.0: 	Migrated frontend to AngularJS

v0.6.1: 	Moved Sessions to Redis

v0.6.0: 	Use GORM for PostgreSQL

v0.5.0: 	Go 1.1 with embedded HTML views

## Authors

Mayur Ahir [mayur@playgen.com]

Jack Cannon [jack@playgen.com]

Lex Robinson [lex@playgen.com]

## License

TODO: Write license

CC BY-NC-SA or GPL v3 or MIT?
