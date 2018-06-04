 # PlanCake
 by Team PlanZilla
 
## Team

- __Product Owner__: [Christina Yuen](https://github.com/ceyuen)
- __Scrum Master__: [William Ha](https://github.com/wvha)
- __Development Team Members__: [Brandon Villiados](https://github.com/Brandon-Villiados), 

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Getting Started](#getting-started)
    1. [Installing](#installing)
    1. [Running](#running)
    1. [Overall Flow](#overall-flow)
    1. [Jumping In](#jumping-in)
    1. [Deployment](#deployment)
    1. [Future Features](#future-features)

## Usage

Link: http://plancake.co

Local: http://localhost:3000/

## Requirements

- Node 8.9.4
- React 16.3.1
- PostgreSQL 7.4.2
- Express 4.16.3
- Jest 22.4.3

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Installing

From within the root directory:

```
npm install
```

### Running

To start server: 

```
npm run server-dev
```

To start webpack: 

```
npm run react-dev
```

### Overall Flow 

After logging in, the logged-in view provides a brief overview of all the events the user is a part of. 

The user can scroll through the event cards, click on them to see more details including itinerary, tasks, online attendees, and group-task overview. 

They can click on the event in the sidebar to see different discussion topics where they can chat, pin messages, like/dislike pins. 

Features that require instantaneous information require the use of web sockets. Refer to [Socket.IO](https://socket.io/) for more information on implementation.

Any information sent to the server is sent using [Axios](https://github.com/axios/axios). Once the information gets to the server, [React-Router](https://reacttraining.com/react-router/web/guides/basic-components) is used to direct it to the proper controller method. 

The database consists of many interconnected tables. Please contact us if you'd like to see our schema design. 

### Jumping in

Notable Files
1. /client/src/components/body/LoggedInView.jsx
1. /database/models/index.js
1. /server/controller.js
1. /server/routes/routes.js

### Deployment 

Make a pull request to development branch of [PlanCake](https://github.com/planzilla/plancake). We will review and deploy via Digital Ocean. 

### Future features 

1. OAuth with Google/Facebook
1. Integrate search tool to allow users to search and chat in the same window easily
1. Integrate easy split cost tool and a payment tool 
1. Integrate travel(flights or hotels) booking tool 