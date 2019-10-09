# Eclair
## ARM
### C++ Department

- Credentials for Raspberry
```
login: pi
password: raspberry
```

- Install wiringPi
```sh
sudo apt-get install wiringpi
```

- Compile
```sh
gcc –o blink blink.c -lwiringPi
```

- Run
```sh
sudo ./blink
```