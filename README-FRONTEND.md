# KF6012 Assessment Frontend Documentation; Author: Filip Brebera (w21020340)

This document outlines the Assessment Frontend structure and functionality. The architecture of this Frontend is heavily inspired by my personal preferences when coding in other javascript frameworks such as Vue. The emphasis is placed on efficient routing, state management ensuring a seamless user experience and developer workflow.

## URL to the deployed app

The app is deployed on the NUWebSpace server and can be accessed on the following url: [https://w21020340.nuwebspace.co.uk/kf6012/coursework/frontend/home](https://w21020340.nuwebspace.co.uk/kf6012/coursework/frontend/home)

All routes are accessible from the navigation bar.

## Structure

The structure of the app is as follows:

```
| src
| | assets - assets such as images, fonts, etc.
| | components - components that are used in the app
| | | common - components that are used specifically for each route
| | | shared - components that are shared across the app
| | config - config file for the app
| | hooks - logic shared across components
| | routes - pages
| | stores - zustand stores - shared state
| | utils - utility functions
| | main.jsx - entry point of the app

| index.html - html template for the app
| jsconfig.json - jsconfig file - allows for import aliases
| package.json - package management file
| components.json - shadcn ui config
| postcss.config.js - postcss config
| tailwind.config.js - tailwind config
| vite.config.js - vite config
| bun.lockb - the bun lock file - used for package management
```

### Routing

I chose to use tanstack router as it allows me to have more control around the routing and as well use loaders that are run before the rendering, which makes it look faster like if the app was rendered with the server even though it is not.

### State management

I decided to use zustand as it allows me to access the state outside of hooks, opposed to react context. This allows me to have more control over the state and as well allows me to use the state in the utility and loader functions.

## Configuration

The app is configured using the config file in the src/config folder. This file contains all the configuration for the app.

- **apiUrl** - the url of the backend server

## Potential Issues

Slow internet connection might cause issues with slower routing as the data are preloaded before the rendering. To mitigate these issues with slower internet connection, use local development server.

## Installation

To install the app run the following command in the terminal:

```bash
bun i
```

## Usage

To run the app run the following command in the terminal:

```bash
bun dev
```

You can use other package managers such as npm or yarn, however, I recommend using bun as it is faster and more reliable.
