# Angular Chatbot Example

This folder contains a minimal Angular application that demonstrates how you might build a chat UI which streams responses from a language model.

## Prerequisites

- Node.js and npm
- Angular CLI (`npm install -g @angular/cli`)

## Running the application

```bash
npm install
ng serve
```

Navigate to `http://localhost:4200` to see the chat interface.

## Chat service

The `ChatService` in `src/app/chat/chat.service.ts` posts the user's message and an augmented context to `/api/chat` and streams the returned text chunks back to the component. Replace `/api/chat` with your backend endpoint that proxies requests to the LLM of your choice.

## Embedding elsewhere

Build the project with `ng build --configuration production` and copy the contents of `dist/angular-chat` into your website. You can also wrap the app as a custom element using `@angular/elements` if you want to embed it inside another framework.
