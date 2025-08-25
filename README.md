# Twinkl React Tech Test

## Task description

You are tasked with creating a React application that interacts with a Posts API (https://jsonplaceholder.typicode.com/posts) to perform CRUD operations (Create, Read, Update, Delete). The application should be implemented using TypeScript and designed to be production-ready.

Refer to the [guide on how to use the JSONPlaceholder API](https://jsonplaceholder.typicode.com/guide/).

## Time limit

We don't expect you to spend longer than 3 hours on this task. If you'd like to capture any decisions, thoughts, or next steps you would take, feel free to do so.

## Requirements

## Fetch and display posts

- [x] Implement a component that fetches the list of posts from https://jsonplaceholder.typicode.com/posts.
- [x] Display all fetched posts in a list.

I probably could have further broken down the main post page into smaller components. This would have made testing quicker and improved maintainability. The current implementation has a lot of state and functions in a single component, which could have been refactored with more time.

I could have used something like react query to handle the data fetching and caching, which would have made the implementation cleaner and more efficient.

## Search posts

- [x] Implement a search bar that allows a user to search for posts by title and display only the desired posts. The search should be triggered on change.

For now I have implemented a search bar that filters the posts, but it does not make a new API call on every rerender only on mount. It filters the posts that have already been fetched and stores in memory. I did this to persist data and avoid unnecessary API calls to improve performance. A consideration is that we could get out of date data taking this route.


I have also added a debounce hook to prevent over rendering on every keystroke.


## Delete post

- [x] For each post in the list, provide a "Remove" button.
- [x] Implement the functionality to delete a post when the "Remove" button is clicked.

This is out of scope (and I'm running out of time) but I could add functionality for managing posts with tick boxes:
- Allow users to delete all posts, delete a single post, or delete selected posts. Wont work for this api but in production we could ask the team building it to allow a single API call to make the functionality more efficient and agnostic.

## Testing

- [x] Write sufficient tests to satisfy a production-ready application.

unit test - jest 
I used jest to test the components and the api calls.

Admittedly I was running out of time when it came to the unit tests after spending a bit too much time cleaning up state and the functions. I'd have liked to use more data-qa/data-testids where needed to make the tests more robust and easier to maintain, but in some cases I have just gone for finding by the text which could result in brittle tests, failing when someone wants to change a components content but the function would remain the same. 

Ideally I would like to set up automated tests through playwright or selenium. This would allow for end to end testing of the application and ensure that the application is working as expected.

In a production ready environment I would also look to set up a CI/CD pipeline to ensure that the application is tested and deployed automatically. Potentially using husky commit hooks on push to avoid committing code that does not pass the tests (personal prefference).

In order to help test end to end something like SuperTest (https://www.npmjs.com/package/supertest) could be used to test API calls are working as expected.

## Documentation

- [x] Add appropriate documentation for your application.

Given more time, I could add API documentation to aid easier production-ready adoption. I've seen positive reviews on tools like Swagger UI (https://www.npmjs.com/package/swagger-ui). Could be a great choice for this purpose, although it might be overkill for this specific task.

I've got in a good habbit recently of adding confluence pages to make HLD's and draw Io diagrams to help other developers understand the flow of apps. Could be something to add in the future. 

## Styling

I have done a very basic styling of the app using the wireframes and scss. Could have used tailwind to make the styling more consistent and easier to maintain, but I wanted to keep it simple for this task. (could have used mixins for this task too but I was starting to go over the recommended time limit so opted to leave it here).

I felt the amount of text for the posts was too long for the designs shown in the wireframes, so I made an alternative style for the divider and the post content (which in A real world scenario I would pose to the designers/product owner). It still satisfies the breif and looks clean, but I felt it was worth mentioning especially on longer titles.


## Future improvements

- **State Management**: For a larger application, a state management library like Redux or Zustand could be used to manage the application state more effectively.
- **Accessibility**: Implementing accessibility best practices to ensure the application is usable by all users. Could run it through Light house to check for issues. I'd assume I would benefit from adding aria attributes and places where I have used pixel values could be swapped to em/rem. I could also have used more semantic html elements.
- **Dependency Security**: Tools like Snyk can be used to check for security vulnerabilities in dependencies. I've used Snyk in the past, and it has been helpful in identifying issues and reducing duplication.

- **Runbooks**: Implementing runbooks for common operational tasks can improve efficiency and reliability.

- **Secrets Management**: For storing secrets (e.g., app configuration), a tool like Vault would typically be used. While app configuration is sufficient for now, Vault provides a more secure and scalable solution.

- **Geolocation and Routing**: Services like Akamai or geolocation-based routing could be used to direct users to the closest server or restrict access to specific regions where the application is needed.

- **Monitoring and Alerting**: Tools like Grafana can be used to monitor logs and set up alerts. Additionally, New Relic could provide detailed insights into application performance.

- **Single Sign-On (SSO)**: Ensure users have the correct credentials to access the application. This is especially important when dealing with sensitive data, such as private information (even more so with twinkle). Proper authentication and authorization should be considered for future development.

## Wireframes

##### Mobile

![mobile_view](assets/mobile_view.png?raw=true)

##### Desktop

![pc_view](assets/pc_view.png?raw=true)

## Prerequisites

- Node.js: Ensure you have Node.js version 20 or higher installed.

## Installation

### Clone the repository

```
git clone git@github.com:matthewparkin/tech-test-twinkl.git
```

```
cd tech-test-twinkl
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


