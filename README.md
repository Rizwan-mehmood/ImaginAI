
<div id="top">

<!-- HEADER STYLE: CLASSIC -->
<div align="center">

<img src="/client/public/favicon.ico" width="30%" alt="ImaginAI Logo"/>

# <code>ImaginAI</code>

<em>Generate images from imagination with AI prompts.</em>

<!-- BADGES -->
<em>Built with the tools and technologies:</em>

<img src="https://img.shields.io/badge/Express-000000.svg?style=default&logo=Express&logoColor=white" alt="Express">
<img src="https://img.shields.io/badge/JSON-000000.svg?style=default&logo=JSON&logoColor=white" alt="JSON">
<img src="https://img.shields.io/badge/OpenAI-412991.svg?style=default&logo=OpenAI&logoColor=white" alt="OpenAI">
<img src="https://img.shields.io/badge/npm-CB3837.svg?style=default&logo=npm&logoColor=white" alt="npm">
<img src="https://img.shields.io/badge/Mongoose-F04D35.svg?style=default&logo=Mongoose&logoColor=white" alt="Mongoose">
<img src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=default&logo=dotenv&logoColor=black" alt=".ENV">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=default&logo=JavaScript&logoColor=black" alt="JavaScript">
<br>
<img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style=default&logo=Nodemon&logoColor=white" alt="Nodemon">
<img src="https://img.shields.io/badge/React-61DAFB.svg?style=default&logo=React&logoColor=black" alt="React">
<img src="https://img.shields.io/badge/Cloudinary-3448C5.svg?style=default&logo=Cloudinary&logoColor=white" alt="Cloudinary">
<img src="https://img.shields.io/badge/Axios-5A29E4.svg?style=default&logo=Axios&logoColor=white" alt="Axios">
<img src="https://img.shields.io/badge/CSS-663399.svg?style=default&logo=CSS&logoColor=white" alt="CSS">
<img src="https://img.shields.io/badge/styledcomponents-DB7093.svg?style=default&logo=styled-components&logoColor=white" alt="styledcomponents">

</div>

---

## Overview

**ImaginAI** is a full-stack web app that enables users to generate images using AI by simply entering a text prompt. The application integrates MongoDB, Express, React, Node.js, and AI image generation APIs to deliver a smooth and creative experience.

Live Link: [https://imaginnai.netlify.app](https://imaginnai.netlify.app)

---

## Features

- Enter creative prompts to generate images using AI
- View all generated images in a beautiful gallery
- Share your creations with others
- Backend image handling and database integration
- Responsive and clean React UI

---

## Project Structure

```sh
└── /
    ├── client
    │   ├── .gitignore
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── public
    │   ├── README.md
    │   └── src
    ├── README.md
    └── server
        ├── controllers
        ├── error.js
        ├── index.js
        ├── models
        ├── package-lock.json
        ├── package.json
        └── routes
```


## Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB URI
- Cloudinary credentials
- AI API Key

### Installation

```sh
git clone https://github.com/Rizwan-mehmood/imaginai.git
cd imaginai
cd client && npm install
cd server && npm install
```

### Usage

Before starting the client, **make sure to update the backend URL** in:

```sh
client/src/api/index.js
```

Replace the `baseURL` with your local development server URL:
```sh
http://localhost:8080
```

```sh
cd server
npm start
# in another terminal
cd client
npm start
```


<div align="right">

[![][back-to-top]](#top)

</div>

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square
