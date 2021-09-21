// const fs = require("fs");

const { writeFile, copyFile} = require("./utils/generate-site.js");
const generatePage = require("./src/page-template");

// const profileDataArgs = process.argv.slice(2);

// const [name, github] = profileDataArgs;

// console.log(profileDataArgs);

// const printProfileData = profileDataArr => {
//     for (let i =0; i < profileDataArr.length; i += 1) {
//     console.log(profileDataArr[i]);
//     }

//     console.log("===========");

//     profileDataArr.forEach(profileItem => console.log(profileItem));
// };
// printProfileData(profileDataArgs);

// const generatePage = (name, github) => {
//     return `
//     <!DOCTYPE html> 
//     <html lang="en"> 
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <meta http-equiv="X-UA-Compatible" content="ie=edge">
//       <title>Portfolio Demo</title>
//     </head>
  
//     <body>
//       <h1>${name}</h1>
//       <h2><a href="https://github.com/${github}">Github</a></h2>
//     </body>
//     </html>
//     `;
// };

// fs.writeFile("./index.html", generatePage(name, github), err => {
//     if (err) throw new Error(err);

//     console.log('Portfolio complete! Check out index.html to see the output!');
// });
// console.log(name, github);
// console.log(generatePage(name, github));

const inquirer = require("inquirer");

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub username",
      validate: gitHubName => {
        if (gitHubName) {
          return true;
        } else {
          console.log('Please enter your username!');
          return false;
        }
      }
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message: "Would you like to enter some information about yourself for an 'About' section?"
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself: ",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ]);
};

const promptProject = portfolioData => {
    console.log(`
  =================
  Add a New Project
  =================
  `);

  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        validate: projectName => {
          if (projectName) {
            return true;
          } else {
            console.log('Please enter your projects name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: projectDes => {
          if (projectDes) {
            return true;
          } else {
            console.log('Please enter your description!');
            return false;
          }
        }
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)',
        validate: projectLink => {
          if (projectLink) {
            return true;
          } else {
            console.log('Please enter your GitHub repos link!');
            return false;
          }
        }
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
  };

  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse);
  })
  .catch(err => {
    console.log(err);
  });
  

// fs.writeFile('./dist/index.html', pageHTML, err => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Page created! Check out index.html to see the output!');

//   fs.copyFile("./src/style.css", "./dist/style.css", err => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("Style sheet copied successfully!");
//   });
// });
