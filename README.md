# Eclair

## ARM

### C++ Department

- Credentials for Raspberry

```
login: pi
password: raspberry
```

- Install wiringPi

```
sudo apt-get install wiringpi
```

- Compile

```
gcc –o blink blink.c -lwiringPi
```

- Run

```
sudo ./blink
```

## Setup

To make it run locally you need to install [Parcel](https://parceljs.org/getting_started.html)

```
npm install
```

To get all assets locally

```
npm run test
```

To start working

```
npm run dev
```

## Deployment

Example of deploy via [GitHub Pages](https://www.sitepoint.com/parcel-hyperapp-github-pages/)

Start the development server:

```
npm run start
```

Rebuild the app:

```
npm run build
```

Push the changes to [Home page](https://manviel.github.io/Eclair/)
