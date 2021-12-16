# Interview Scheduler
A basic React app for scheduling appointments and updating a postgres database with the results using axios. It has been tested using jest, cypress and storybook.
![full page view](https://user-images.githubusercontent.com/89506417/146315104-a47e7c13-11fe-4e53-8c71-ec6db31773a0.png)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Navigating the app
To schedule an interview simply click on the available slot
![add interview button](https://user-images.githubusercontent.com/89506417/146315631-bd233e22-28b9-49e9-8b00-c017228942b3.png)


You will see a list of interviewers working that day taken from the database
![Edit view](https://user-images.githubusercontent.com/89506417/146315753-bd33126a-876b-40b1-8acb-7f2dd17b9f4e.png)


Once you've typed in and saved the results will show as soon as they've had time to process
![Saved Appointment](https://user-images.githubusercontent.com/89506417/146315915-5955fe6f-55c6-4c81-ac74-0166680d4622.png)

From there you're able to edit and delete as needed.

