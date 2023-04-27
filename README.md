# felix mcdermott

# CarbonCode NextJS Tech Test

## Overview
The goal of this project is to create a basic quiz application using NextJS, Prisma, TailwindCSS and React Query. The application will have three main features: a home page that displays a list of quizzes, a create quiz page that allows users to input the name and questions for a new quiz, and a view quiz page that displays the name and questions of a selected quiz.

## Steps
The home page will retrieve the list of quizzes from an API using React Query, and allow users to click on a quiz to view it. There will also be a button on the home page that allows users to create a new quiz.

The create quiz page will have a form for users to input the name and three yes or no questions and their answers. When the form is submitted, it will create a new quiz in the database and redirect the user back to the home page.

The view quiz page will render the name and questions of the selected quiz, and will be optimized for fast loading using incremental static regeneration to fetch the data.

The provided template is a blank NextJS template with all required packages installed and set up. The database for the project will be SQLite file for ease of use. The project requires the implementation of best practices with the technologies used and the creation of an appropriate database schema using Prisma. Validation and error handling is not required for this project.

## Submission
Once finished, please either send the files to us in a compressed format (excluding the "node_modules" folder) via email, or create a public repository and share the link with us.
