# Home Library Service

Rolling Scope School course task implementation. In the service `Users` can create, read, update, delete data about `Artists`, `Tracks` and `Albums`, add them to `Favorites` in their own Home Library!

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://docs.docker.com/get-docker/).

## Application setup

1. Clone the repository
```
git clone git@github.com:GolDOragon/nodejs2021Q4-service.git
```
2. Create and fill `.env`
> Now you can copy-past `.env.example`
3. Install dependencies
```bash
npm ci
```
4. Run app
```bash
npm run start:dev 
```
5. Setup database structure
```bash
npm run migration:run 
```
6. Ready for work

## Migration guide
1. Stop server
2. Checkout on main branch
```bash 
git checkout master
```
3. Synchronize database
``` 
DB_SYNCHRONIZE=true
```
4. Run server
```bash
npm run start:dev
```
5. Stop after it fully starts & checkout on your branch
7. Turn off synchronization
```
DB_SYNCHRONIZE=false
```
8. Run server
```bash
npm run start:dev
```
9. Generate migration
```bash
npm run migration:generate --name=<MigrationName>
```


## Testing

After application running open new terminal and enter:

To run all tests without authorization

```bash
npm run test
```

To run only one of all test suites

```bash
npm run test -- <path to suite>
```

To run all test with authorization

```bash
npm run test:auth
```

To run only specific test suite with authorization

```bash
npm run test:auth -- <path to suite>
```


 
### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
