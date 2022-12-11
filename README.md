# this shit was mostly coded by chatGPT

so yeah, i needed to bulk upload my past projects to github, and well just asked AI for code to do that, tbf this took me about 1 hour to get to work i think i could do it better and faster working alone, there
are limitations to this AI, and the code isn't that pretty, but hey, AI wrote this

my input was basically testing if this work, and if it doesn't specifying the issue to chatGPT and asking to fix it, and reapeat till it works, also requesting features like usage of the .env file

## Description belowe was written by chatGPT ai



# GitHub Repo Creator

This script is a Node.js script that reads the contents of a directory and creates a new repository on GitHub for each subdirectory it finds. It also creates a `.gitignore` file in each subdirectory, with the contents of the `.gitignore` file specified in a `gitignore.txt` file.
Prerequisites

- Node.js and Git installed on your local machine
- A `.env` file with your GitHub username and a personal access token
- A `gitignore.txt` file with the desired contents of your `.gitignore` files

## Usage

To use the script, run the following command:

    node index.js

This will run the script, which will read the contents of the specified directory, create a new repository on GitHub for each subdirectory it finds, create a .gitignore file in each subdirectory, and push the local directories to the remote repositories on GitHub.

**Note:** This script is intended for demonstration purposes only and is not production-ready. You may need to modify the script to fit your specific use case.
