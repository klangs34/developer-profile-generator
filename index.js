const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');
const axios = require('axios');

//github header
const githubHeader = {
    headers: {
        Accept: "application/vnd.github.v3+json"
    }
}

//const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        // {
        //     type: "input",
        //     name: "name",
        //     message: "What is your name?"
        // },
        // {
        //     type: "input",
        //     name: "location",
        //     message: "Where are you from?"
        // },
        // {
        //     type: "input",
        //     name: "color",
        //     message: "What's your favorit color?"
        // },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub Username"
        }
    ])
        .then(response => {
            let { github } = response
            //console.log(name)
            axios.get(`https://api.github.com/users/${github}`, githubHeader)
                .then(res => console.log(res.data))
        });
}


function generateHTML(answers) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Document</title>
</head>
<body>
  <div class="jumbotron jumbotron-fluid">
  <div class="container">
    <h1 class="display-4">Hi! My name is ${answers.name}</h1>
    <p class="lead">I am from ${answers.location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${answers.github}</li>
      <li class="list-group-item">LinkedIn: ${answers.linkedin}</li>
    </ul>
  </div>
</div>
</body>
</html>`;
}

promptUser();