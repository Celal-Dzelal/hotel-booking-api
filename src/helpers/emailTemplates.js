"use strict";
module.exports = {
  welcomeTmp: (name) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>Your Page Title</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 0;
                }
                header {
                    background-color: #333;
                    color: #fff;
                    text-align: center;
                    padding: 1em;
                }
                footer {
                    background-color: #333;
                    color: #fff;
                    text-align: center;
                    padding: 1em;
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                }
                .content {
                    padding: 20px;
                }
            </style>
        </head>
        <body>

            <header>
                <h1>Welcome ${name} to My Website</h1>
            </header>

            <div class="content">
                <h2>Introduction</h2>
                <p>This is a simple template to get you started with HTML.</p>
            </div>

            <footer>
                <p>&copy; 2025 Your Website</p>
            </footer>

        </body>
        </html>

        `;
  },
};
