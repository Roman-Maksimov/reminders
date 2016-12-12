# reminders
ReactJS Frontend Trial App

### Setup

```bash
$ npm i
```

### Dotenv

Ensure `.env` file exists inside the root directory of the project.

This file would be generated during deployment.

For development this file might be copied/linked from .evn.*.sample or copied from working envirnoment.

### Run developemnt server

```bash
$ npm start
```

### Run in docker
```bash
docker build --tag reminders_maksimov:1.0 .
docker run -tip 8080:8080 reminders_maksimov:1.0
```


Default url: `http://localhost:8080/`

### Make a build

**staging/production**

```bash
$ npm run build
```

### Packages versions management tips

```bash
$ npm install -g npm-freeze
```

Dump actual versions of installed packages

```bash
$ npm-freeze manifest
```

Check packages versions changes

```bash
$ npm-freeze check
```

