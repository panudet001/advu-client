---
Date: 2024/11/13
Author: Thanawat1997
---

# Angular version 17.3

<ui>
<li>Node.js  	^18.13.0 || ^20.9.0 </li>
<li>TypeScript >=5.2.0 <5.5.0 </li>
<li>RxJS ^6.5.3 || ^7.4.0 </li>
<li>Use npm i or yarn install </li>
</ui>

# How to start project by docker

### Development environment

1. Go to root folder project
2. Run the command

   `yarn start:docker`

3. Access the website http://localhost:4270/

_Note: If you want stop all container and service, type the command - `docker compose down -v`_

# How to start project on localhost

1. Go to root folder project run command `yarn install` or `npm install`
2. run `yarn dev:ssr` or `npm run dev:ssr`

# How to start project use api on localhost

1. Go to root folder project run command npm install
2. Run `yarn dev:ssr` or `npm run dev:ssr`
3. Run project api https://github.com/Wisdom-Money/wisdom-asset-api with command `docker compose up -d`
4. Stop your container adavu-backend we use just `container adavu-db`
5. Go to root folder project `wisdom-asset-api` run command `dotnet run`

# How to start project production

1. You can run `yarn build:prod:ssr` or `npm run build:prod:ssr`
2. Then Run `yarn serve:ssr` or `npm run serve:ssr`

## Project run completed fron-end

```sh

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **


✔ Compiled successfully.
✔ Browser application bundle generation complete.

Initial Chunk Files | Names   | Raw Size
runtime.js          | runtime | 12.96 kB |

24 unchanged chunks

Build at: 2023-06-21T15:06:06.064Z - Hash: b309ab1f8028e945 - Time: 352ms

✔ Compiled successfully.

```

## Project run completed back-end

```sh

info: Microsoft.Hosting.Lifetime[14]
     Now listening on: https://localhost:7100
info: Microsoft.Hosting.Lifetime[0]
     Application started. Press Ctrl+C to shut down.
info: Microsoft.Hosting.Lifetime[0]
     Hosting environment: Development
info: Microsoft.Hosting.Lifetime[0]
     Content root path: /Users/wd-0107/Documents/Project/wisdom-asset-api/

```
