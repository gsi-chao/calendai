# CalendAI - Your AI-Powered Social Media Scheduling Tool

This is the repository for CalendAI, a Next.js application that helps you manage your social media content creation and scheduling with the power of AI.

## Features

* **Smart Scheduling:** Optimize your posting times based on historical data and audience engagement.
* **AI-Powered Content Creation:** Generate captivating titles, content, and images for your posts.
* **Tag Recommendation:** Identify relevant hashtags to expand your reach and attract new followers.

## Getting Started

Before you run the application, follow these steps to configure it:

1. **Create a `.env.local` file:**

   Create a file named `.env.local` in the root directory of the project. This file will store your environment variables. You can find a template `.env.local.example` file for reference. Make sure to update it with your own values for variables like database connection details and API keys. Review the `.env.example` file for the required environment variables.

2. **Install dependencies:**

   Open your terminal in the project directory and run the following command:

   ```bash
   npm install
   ```

   This will install all the necessary dependencies for the application to run.

3. **Run migrations:**

   Next.js uses migrations to manage your database schema. To apply any pending migrations, run the following command:

   ```bash
   npm run migration:run
   ```

4. **Start the development server:**

   Once you've completed the previous steps, you can start the development server to run the application locally:

   ```bash
   npm run dev
   ```

   This will start the server and open your default browser at `http://localhost:3000/`.

## Technologies Used

* Next.js: React framework for server-rendered and statically generated web applications.
* Vercel AI SDK: Provides functions for AI-powered content generation and refinement.
* (Database Name - replace with the specific database technology used)

## Contributing

We welcome contributions to CalendAI! Please see the CONTRIBUTING.md file for guidelines on how to contribute.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
