<img src="https://www.fiftyfivetech.io/wp-content/uploads/2021/05/logo.png">

# sample-user-service repository

✨ This repository showing that how we are using clean code architecture, folder structure, and component reusability.✨

We at Fiftyfive Technologies follow the practices defined by SOLID principles and Clean Architecture.

## Features

- _**Functionality**_  : Work correctly, efficiently, and robustly.
- _**Readability**_    : The primary audience for our code is other developers.
- _**Extensibility**_  : Well-designed code should be extensible as a building block for solving new problems.
- _**Scalability**_    : The code that can scale along with the need of your business.

## Tech Stack

- [NodeJS](https://nodejs.org/en/) - JS runtime environment to executes Typescript code
- [GraphQl](https://graphql.org/) - It is data query and manipulation language for APIs.
- [Express-Graphql](https://graphql.org/graphql-js/running-an-express-graphql-server/) - Used to host the APIs on a server.
- [Prisma](https://www.prisma.io/) - The typescript and NodeJS ORM.
- [Nexus](https://nexusjs.org/) - Declarative, Code-First GraphQL Schemas for JS/TS.
- [Apollo Server](https://www.apollographql.com/) - Apollo Server is an open-source, spec-compliant GraphQL server 
- [MongoDb](https://www.mongodb.com/) - A NoSQL database solution.
- [AWS S3](https://aws.amazon.com/s3/) - Used to store all the profile images.


## Installation

Requires [Node.js](https://nodejs.org/) to run.

- Install the dependencies and devDependencies and start the server.

  ```sh
  cd sample-user-service
  npm i or npm install --legacy-peer-deps
  ```
- Create a environment file, with relevant data and name `.env.local`.
- To connect to MongoDB and build Prisma Schemas
  
  ```sh
  dot-env -e .env.local -- npx prisma generate
  dot-env -e .env.local -- npx prisma db push
  ```
- Now to run the project enter
  ```sh
  npm run start:local
  ```

## Package manager - npm
This project is using `npm` as package manager, if you do not have this installed on your machine please start by looking at the [npm docuentation and tutorials](https://docs.npmjs.com/). After installing the package manager the following commands will be availible for you:
- `npm install` - Installing dev dependencies.
- `npm run start:local` - To start the sever.

If you seem to still have issues with these commands, try running `npm cache clean` and do `npm install` or `npm install --legacy-peer-deps`

## Linting
Project is using ESLint to make sure that we keep same coding style in the project. Currently the ruleset is defined in `.eslintrc.json`.

## Architecture and Project structure

This project follows the `Clean Architecture`, and hence have focused the structuring of the project on the standard practices that are recommended by the `Clean Architecture`. You will find we have focused on `de-coupling` and `reusability` of the code.

![GraphQL-Apollo-1400x821](https://user-images.githubusercontent.com/21957552/193445506-330012b0-c307-4f9e-b694-85847dc1c676.png)

This project is structured in the following way:

```
├── .gitignore
├── package.json
├── config
|  ├── config.ts
|  └── index.ts
├── prisma
|  └── schema.prisma
├── src
|  ├── app.ts
|  ├── core
|  |  ├── interfaces
|  |  |  ├── {type}.ts
|  |  |  └── index.ts
|  |  ├── models
|  |  |  ├── {modelType}.ts
|  |  |  └── index.ts
|  |  ├── resolvers
|  |  |  ├── inputTypes
|  |  |  |  ├── {type}
|  |  |  |  |  ├── {name}.ts
|  |  |  |  |  └── index.ts
|  |  |  |  └── index.ts
|  |  |  ├── mutation
|  |  |  |  ├── {type}
|  |  |  |  |  ├── {mutationType}.mutation.ts
|  |  |  |  |  └── index.ts
|  |  |  |  └── index.ts
|  |  |  ├── query
|  |  |  |  ├── {type}
|  |  |  |  |  ├── {queryType}.query.ts
|  |  |  |  |  └── index.ts
|  |  |  |  └── index.ts
|  |  |  └── index.ts
|  |  ├── utils
|  |  |  ├── {type}.helper.ts
|  |  |  └── index.ts
|  |  └── index.ts
|  ├── detaultData
|  |  ├── country.json
|  |  └── countryDialCodes.json
|  ├── hanlders
|  |  ├── {type}.handler.ts
|  |  └── index.ts
|  ├── logger
|  |  ├── logger.ts
|  |  └── index.ts
|  └── server
|     ├── context.ts
|     ├── imageClient.ts
|     ├── prismaClient.ts
|     ├── schema.ts
|     └── server.ts
└── tsconfig.json
```

- **index.ts** - You should always include `index` file in every folder. When you have a lot of components you need to export from a given folder and you would like to destructure in the files you're importing them into. You don't have to follow this at all, but is still best practice to do it this way; it can be easier when exporting a large amount of files such as from a reducer in Redux or a utility folder with a large amount of smaller components like a `<Button>` or `<Input>`, and it is easier to read for other users if everything coalesces into a single index file rather than several different files.

- **config** - To hold all the configuration level data.

- **prisma** - To connect to mongoDB client and create schemas and model relations.

- **src/app.ts** - To create a basic Express server.

- **src/server** - Folder to contain the main services, clients, and server information etc.
  - **src/server/schema.ts** - To link `prisma` and `nexus` via `nexus-plugin-prisma` and hand over all the models to nexus.
  - **src/serve/server.tsr** - To create a `Apollo-graphql` server and apply middlewares.
  - **src/server/prismaClient.ts** - The ORM `prisma-client` to query on connected database.

- **src/logger** - Contains the `pino-logger` and provides abstration on methods to be used when logging.

- **src/handlers** - Global handler type util files that are dedicated to one particualr task or business area. These provide abstraction on a feature usually created as a wrapper layer for 3rd party dependencies.

- **src/defaultData** - To hold all the static, raw JSON data in different files. Here we hold information on `Countries`.

- **src/core** - This contains all the core business logic. The `queries`, `mutations, `nexus-ObjectTypes` and `nexus-InputTypes` are all housed inside of the `core` folder. This also contains a `utils` folder that conatains various helpers, which are more related to business logics and help segregate them from the queries and mutations.

- **tsconfig.json** - This is used to configure typescript compiler options and also to specify the root files for the project.

![images](https://user-images.githubusercontent.com/21957552/193446357-c643f255-a56f-49da-8b9e-3c20869ad6db.png)

### What is the best way to add new queries or mutations or features?

If you only have to add/update query or mutations, follow the steps to get the desired reults.
  - Go to `core` -> `resolvers`.
  - Here we have `query`, `mutations` and `inputTypes`.
  - Start by defining new inputType under the feature that you are trying to make updates. To do this either create a new file with `query` or `mutation` type.
  - Once, done jump to `query` or `mutation` folder and go into the feature folder that you are updating. Now if adding a new query/mutation, create a new file and name it accordingly, and also export it via `index.ts` else, open an existing file you want to update and make the changes.
  - Also make any updates you need to output object types in `models` folder and in the `interfaces` sections.

## License

**55 Tech**

**We are relentlessly focusing on digital transformation. Dive deep into the customer cases to know more about the project which we delivered.**
