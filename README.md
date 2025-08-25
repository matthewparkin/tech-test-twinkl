# Twinkl React Tech Test

## Task description

You are tasked with creating a React application that interacts with a Posts API (https://jsonplaceholder.typicode.com/posts) to perform CRUD operations (Create, Read, Update, Delete). The application should be implemented using TypeScript and designed to be production-ready.

Refer to the [guide on how to use the JSONPlaceholder API](https://jsonplaceholder.typicode.com/guide/).

#### Time limit

We don't expect you to spend longer than 3 hours on this task. If you'd like to capture any decisions, thoughts, or next steps you would take, feel free to do so.

#### Requirements

##### Fetch and display posts

- [x] Implement a component that fetches the list of posts from https://jsonplaceholder.typicode.com/posts.
- [x] Display all fetched posts in a list.

##### Search posts

- [x] Implement a search bar that allows a user to search for posts by title and display only the desired posts. The search should be triggered on change.

For improvments could we do a button that goes and fetches the posts on search or uses the previous call (this could become out of date. Do we want to do it on key up and key down) do we want to keep it in memory (local storage).

##### Delete post

- [ ] For each post in the list, provide a "Remove" button.
- [ ] Implement the functionality to delete a post when the "Remove" button is clicked.

tick boxes (delete all, delete one or selected, could do this all in one call and make it agnostic)

##### Testing

- [ ] Write sufficient tests to satisfy a production-ready application.

unit test - jest 
could use super test https://www.npmjs.com/package/supertest to test the API calls and improve the coverage on testing the api.

##### Documentation

- [ ] Add appropriate documentation for your application.

I could, if given time add api documentation to enable easier production ready adoption. I've seen good reviews on swagger ui https://www.npmjs.com/package/swagger-ui. Which could help (might be overkill for this task).


#### Wireframes

##### Mobile

![mobile_view](assets/mobile_view.png?raw=true)

##### Desktop

![pc_view](assets/pc_view.png?raw=true)

## Getting Started

The repository is pre-configured with the following:

- TypeScript
- React
- Prettier
- Vite
- Vitest
- ESLint

No styling / CSS libraries are included by default - feel free to add your own using CSS Modules, Tailwind CSS, CSS-in-JS, plain CSS etc. but avoid heavyweight UI frameworks such as Matieral-UI, Chakra UI, shadcn/ui etc.

You are free to introduce additional libraries or tools as you see fit.

### Prerequisites

- Node.js: Ensure you have Node.js version 20 or higher installed.

### Installation

#### Clone the repository

```
git clone https://github.com/twinkltech/twinkl-react-tech-test.git
```

```
cd twinkl-react-tech-test
```

#### Using Node Version Manager (nvm)

```bash
nvm install && nvm use
```

#### Install dependencies

```
yarn
```

### Scripts

#### Development server

Start the development server:

```
yarn dev
```

#### Lint (ESLint)

Check for linting issues:

```
yarn lint
```

Fix lint issues in the codebase:

```
yarn lint:fix
```

#### Format (Prettier)

Check for formatting issues:

```
yarn format
```

Fix formatting issues:

```
yarn format:write
```

#### Testing (Vitest)

Run the test suite with:

```
yarn test
```


#### Security and general improvements
Could use something like SNYK to check for security issues in the dependencies.
I've used this previously and has helped to identify issues in the dependencies and reduce duplication.
Runbooks 
vault storing secrets. app confic for now, but would usually use vault.
Could use akamai or geolocation to route the user to the closest server or lock the application down to the region its needed for.
log lines - monitoring and alerting. Could use something like graphana. 
Could use new relic to monitor the application and get insights into the performance in a bit more detail.
SSO Id - do they have the right credentials to be accessing this application. Could defo be an issue with this api call. Should be considered going forward. Especially where children and private data is involved.