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

To make it run locally you need to install [PARCEL](https://parceljs.org/getting_started.html)

To get all assets locally

```
npm run build
```

To start working

```
npm run dev
```
