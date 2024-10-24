
![dockerai-banner](https://github.com/user-attachments/assets/f7cd29bf-8170-4eb3-acea-ab7ed64a50f2)


AI-Powered Docker File Generator - This project is a web application that generates Dockerfiles for GitHub repositories using AI. It leverages the GitHub API to fetch repository data and the Groq AI API to generate Dockerfile instructions based on user input.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Components](#components)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/your-repo.git
    cd your-repo
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your environment variables:

    ```sh
    NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key
    NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
    ```

4. Run the development server:

    ```sh
    npm run dev
    ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. Enter your GitHub username and repository name.
2. Provide instructions for how you want your Dockerfile to be generated.
3. Click the "Generate Docker File" button.
4. The generated Dockerfile will be displayed, and you can download it.

## Environment Variables

- `NEXT_PUBLIC_GROQ_API_KEY`: Your Groq API key.
- `NEXT_PUBLIC_GITHUB_TOKEN`: Your GitHub token.

## Components

### `DockerFileGeneratorComponent`

Located in [`components/docker-file-generator.tsx`](components/docker-file-generator.tsx), this component handles the main functionality of the application.

#### State Variables

- `dockerFile`: Stores the generated Dockerfile content.
- `githubRepo`: Stores the GitHub repository name.
- `githubOwner`: Stores the GitHub username.
- `dockerFileInstructions`: Stores the user-provided instructions for generating the Dockerfile.
- `isLoading`: Indicates whether the Dockerfile generation is in progress.
- `error`: Stores any error messages.
- `downloadUrl`: Stores the URL for downloading the generated Dockerfile.

#### Functions

- `handleGenerateDockerFile`: Handles the Dockerfile generation process.
- `getGroqChatCompletion`: Fetches the AI-generated Dockerfile instructions from the Groq API.
- `getGithubRepoData`: Fetches the repository data from the GitHub API.

### UI Components

- `Input`: Custom input component.
- `Button`: Custom button component.
- `Textarea`: Custom textarea component.
- `Label`: Custom label component.
- `Card`, `CardContent`, `CardDescription`, `CardHeader`, `CardTitle`: Custom card components.
- `Alert`, `AlertDescription`: Custom alert components.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

<br>
<div align="center">
<a href="https://groq.com" target="_blank" rel="noopener noreferrer">
  <img
    height="80px"
    src="https://groq.com/wp-content/uploads/2024/03/PBG-mark1-color.svg"
    alt="Powered by Groq for fast inference."
  />
</a>
</div>
