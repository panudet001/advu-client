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

1. Go to root folder project 
2. Install the dependencies `yarn install`
3. Start the project `yarn dev:ssr`

# How to start project use api on localhost

Reference the project: https://github.com/Wisdom-Money/adavu-api

# How to start project with production mode

1. Run build the project `yarn build:prod:ssr`
2. Start the project with `yarn serve:ssr`

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