Pixelate Colorbook - Platform to turn your own images into colorbooks.
Description:

Pixelate Colorbook is a web application designed to help users turn their images into pixelated colorbooks with a few clicks.
Features:

    Pixelate your images: download a pixelate version of your image without losing the size of the original.
    Receive a colorbook version of a pixelated image: you can easily download it, print it and color it in by using the presented hex codes.
    Minimalistic Design: The app's design focuses on simplicity and ease of use, providing users with a clean and intuitive interface to make the exercise logging process hassle-free.
Technologies Used:

    Next.js: The web application is built using Next.js, a front-end framework in Javascript, to handle routing and HTTP requests.
    JavaScript: To enhance the user experience, JavaScript is incorporated to generate interactive charts for visualizing workout progress.
    Python/Flask: The app utilizes python scripting to convert the image design using special libraries.
    Google Cloud Functions: Was used to host the python/flask script.

Design Choices:

The design of the Pixelate Colorbook prioritizes simplicity and usability, as the main objective was to create a user-friendly and minimalistic exercise logger. Bootstrap was chosen for its responsive layout and pre-designed components, which allowed for quicker development and ensured a consistent look across different devices.
Instructions:

To run the Pixelate Colorbook, follow these steps:

    Ensure you have Node installed on your system.
    Clone the project repository to your local machine.
    Open a terminal and navigate to the project directory.
    Go to the main directory and run npm install to install the necesarry dependencies.
    Set up the necesarry .env variables inside server/config folder (API_URL).
    Access the application by navigating to http://localhost:3000 in your web browser.

Additional Information:

The Pixelate Colorbook was developed as part of a personal project to enhance programming skills while building a practical and useful application. The app is still a work in progress, and future updates may include more features, such as workout plan customization and social sharing capabilities. Feedback and suggestions are always welcome to improve the app further.