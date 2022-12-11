const fs = require('fs');
const { exec } = require('child_process');
const request = require('request');
require('dotenv').config();

const username = process.env.GITHUB_USERNAME;
const token = process.env.GITHUB_TOKEN;
const baseUrl = 'https://api.github.com';
const dir = 'D:/Projects/Ai';

// Get all the subdirectories in the given directory
fs.readdir(dir, (err, files) => {
    if (err) {
        console.error(err);
        return;
    }

    // Create a repository for each subdirectory
    files.forEach((file) => {
        const repoName = file;

        const gitignoreContents = "node_modules/\n.DS_Store"; // replace with your desired .gitignore file contents

           // Set the local directory to push to the repository
           const localDir = `${dir}/${repoName}`;

        const gitignorePath = `${localDir}/.gitignore`;

        // Write the .gitignore file
        fs.readFile('./gitignore.txt', "utf8", (err, data) => {
            if (err) {
              console.error(`Error reading .gitignore file: ${err}`);
              return;
            }
          
            // Set the gitignoreContents variable to the contents of the file
            const gitignoreContents = data;
          
            // Write the .gitignore file
            fs.writeFile(gitignorePath, gitignoreContents, (err) => {
              if (err) {
                console.error(`Error writing .gitignore file: ${err}`);
                return;
              }
          
              console.log(`Successfully wrote .gitignore file to ${gitignorePath}`);
            });
          });

        // Set the repository options
        const options = {
            url: 'https://api.github.com/user/repos',
            method: 'POST',
            headers: {
                'User-Agent': username,
                'Authorization': `token ${token}`,
            },
            json: {
                'name': repoName, // replace with your repository name
                'description': 'Automatically generated repo from my harddrive', // replace with your repository description
                'private': false, // set to true to create a private repository
            },
        };



        // Send the request to create the repository
        request(options, (error, response, body) => {
            if (!error && response.statusCode == 201) {
                console.log(`Successfully created repository: ${body.html_url}`);

                // Set the clone URL for the repository
                const cloneUrl = body.clone_url;

                // Set the local directory to push to the repository
                const localDir = `${dir}/${repoName}`;

                exec(`git init`, { cwd: localDir }, (err, stdout, stderr) => {
                    if (err) {
                        console.error(`Error initializing Git repository: ${err}`);
                        return;
                    }

                    // The Git repository was successfully initialized
                    console.log(`Successfully initialized Git repository in ${localDir}`);

                    // Push the local directory to the repository
                    exec(`git remote add origin ${cloneUrl}`, { cwd: localDir }, (err, stdout, stderr) => {
                        if (err) {
                            console.error(`Error pushing to repository: ${err}`);
                            return;
                        }

                        exec(`git add .`, { cwd: localDir }, (err, stdout, stderr) => {
                            if (err) {
                                console.error(`Error pushing to repository: ${err}`);
                                return;
                            }

                            exec(`git commit -m "Initial commit"`, { cwd: localDir }, (err, stdout, stderr) => {
                                if (err) {
                                    console.error(`Error pushing to repository: ${err}`);
                                    return;
                                }
                                exec(`git push -u origin master`, { cwd: localDir }, (err, stdout, stderr) => {
                                    if (err) {
                                        console.error(`Error pushing to repository: ${err}`);
                                        return;
                                    }

                                    // The local directory was successfully pushed to the repository
                                    console.log('Successfully pushed local directory to repository.');
                                });
                            });
                        });
                    });
                })
            } else { console.log(error) }
        })
    })
});
