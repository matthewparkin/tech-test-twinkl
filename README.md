# Twinkl React Tech Test

## Task description

You are tasked with creating a React application that interacts with a Posts API (https://jsonplaceholder.typicode.com/posts) to perform CRUD operations (Create, Read, Update, Delete). The application should be implemented using TypeScript and designed to be production-ready.

Refer to the [guide on how to use the JSONPlaceholder API](https://jsonplaceholder.typicode.com/guide/).

### Time limit

We don't expect you to spend longer than 3 hours on this task. If you'd like to capture any decisions, thoughts, or next steps you would take, feel free to do so.

### Requirements

#### Fetch and display posts

- [x] Implement a component that fetches the list of posts from https://jsonplaceholder.typicode.com/posts.
- [x] Display all fetched posts in a list.

I could have probably broken the main post page down further, defo would have benefitted from this in testing, ended up with a lot of state and functions in one component, but ran out of time to fix it.

#### Search posts

- [x] Implement a search bar that allows a user to search for posts by title and display only the desired posts. The search should be triggered on change.

For now I have implemented a search bar that filters the posts, but it does not make a new API call on every rerender only on mount. Instead, it filters the posts that have already been fetched and stores in memory. I did this to avoid unnecessary API calls and to improve performance. I have also added a debounce hook to prevent over rendering on every keystroke.

For improvements, we could add a button to fetch posts based on the search query or reuse the previous API call (though this might result in outdated data). Alternatively, we could trigger the search on key up or key down events. Another consideration is whether we want to persist the data in memory (e.g., using local storage) to improve performance and reduce API calls.

#### Delete post

- [x] For each post in the list, provide a "Remove" button.
- [x] Implement the functionality to delete a post when the "Remove" button is clicked.

This is out of scope (and I'm running out of time) but I could add functionality for managing posts with tick boxes:
- Allow users to delete all posts, delete a single post, or delete selected posts. Wont work for this api but in production we could ask the team building it to allow a single API call to make the functionality more efficient and agnostic.

#### Testing

- [x] Write sufficient tests to satisfy a production-ready application.

unit test - jest 
I used jest to test the components and the api calls.

Admittedly I was running out of time when it came to the unit tests after spending a bit too much time cleaning up state and the functions. I'd have liked to use more data-qa/data-testids where needed to make the tests more robust and easier to maintain, but in some cases I have just gone for finding by the text which could result in brittle tests, failing when someone wants to change a components content but the function would remain the same. 

Ideally I would like to set up more automated tests through playwright or selenium. This would allow for end to end testing of the application and ensure that the application is working as expected.

In a production ready environment I would also look to set up a CI/CD pipeline to ensure that the application is tested and deployed automatically. Potentially using husky commit hooks on push to avoid committing code that does not pass the tests (personal prefference).

In order to help test end to end something like SuperTest (https://www.npmjs.com/package/supertest) could be used to test API calls are working as expected.

#### Documentation

- [x] Add appropriate documentation for your application.

Given more time, I could add API documentation to aid easier production-ready adoption. I've seen positive reviews on tools like Swagger UI (https://www.npmjs.com/package/swagger-ui). Could be a great choice for this purpose, although it might be overkill for this specific task.

I've got in a good habbit recently of adding confluence pages to make HLD's and draw Io diagrams to help other developers understand the flow of apps. Could be something to add in the future. 



#### Further improvements
- **Dependency Security**: Tools like Snyk can be used to check for security vulnerabilities in dependencies. I've used Snyk in the past, and it has been helpful in identifying issues and reducing duplication.

- **Runbooks**: Implementing runbooks for common operational tasks can improve efficiency and reliability.

- **Secrets Management**: For storing secrets (e.g., app configuration), a tool like Vault would typically be used. While app configuration is sufficient for now, Vault provides a more secure and scalable solution.

- **Geolocation and Routing**: Services like Akamai or geolocation-based routing could be used to direct users to the closest server or restrict access to specific regions where the application is needed.

- **Monitoring and Alerting**: Tools like Grafana can be used to monitor logs and set up alerts. Additionally, New Relic could provide detailed insights into application performance.

- **Single Sign-On (SSO)**: Ensure users have the correct credentials to access the application. This is especially important when dealing with sensitive data, such as private information (even more so with twinkle). Proper authentication and authorization should be considered for future development.

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

## Prerequisites

- Node.js: Ensure you have Node.js version 20 or higher installed.

## Installation

### Clone the repository

```
git clone https://github.com/twinkltech/twinkl-react-tech-test.git - update with my repo
```

```
cd twinkl-react-tech-test
```

### Using Node Version Manager (nvm)

```bash
nvm install && nvm use
```

### Install dependencies

```
yarn
```

## Scripts

### Development server

Start the development server:

```
yarn dev
```

### Lint (ESLint)

Check for linting issues:

```
yarn lint
```

Fix lint issues in the codebase:

```
yarn lint:fix
```

### Format (Prettier)

Check for formatting issues:

```
yarn format
```

Fix formatting issues:

```
yarn format:write
```

### Testing (jest)

Run the test suite with:

```
yarn test
```

### Coverage report:

```
yarn test:coverage
```


