# Tube.AI - YouTube Summarizer and Chatbot

Tube.AI is an innovative YouTube summarizer bot with intelligent chatbot functionality that addresses the common issue faced by existing YouTube summarizers. While many bots heavily rely on video captions to understand and generate content, they fail when captions are unavailable. Tube.AI solves this problem by leveraging OpenAI's Whisper model to extract text from a video's audio, providing a robust solution for summarization and user queries.

## Problem Statement

Most existing YouTube summarizer chatbots depend solely on video captions to comprehend the video content. When videos lack captions, these bots struggle to generate meaningful content, leading to a diminished user experience.

## Solution Overview

Tube.AI employs a two-step approach to handle both scenarios of caption availability:

1. **Caption Presence:**
   - If captions are available, Tube.AI utilizes the `youtube-transcript` api to extract them.
   - Extracted captions are then fed into the GPT model for content generation.

2. **Caption Absence:**
   - If captions are not present, Tube.AI downloads the video's audio using `ytdl-core`.
   - OpenAI's Whisper model extracts text from the audio file.
   - The extracted text is then used as input for the GPT model for content generation.

The summarized content and extracted captions are stored in a `.txt` file, enabling the chatbot to refer to the video's context.

## Features

- **Summarization:**
  - Tube.AI summarizes YouTube videos intelligently, providing users with concise overviews.

- **Query Response:**
  - The chatbot answers user queries about any YouTube video, ensuring an interactive experience.

- **Caption Handling:**
  - Handles scenarios with or without video captions by employing advanced AI models.

## Getting Started

1. Clone the repository:

    ```bash
    git clone https://github.com/7Biscuits/TubeAI.git
    cd TubeAI
    ```

2. Install dependencies:

    ```bash
    yarn
    ```

3. Run the application:

    ```bash
    yarn dev
    ```

## Usage

- Provide the YouTube video ID to Tube.AI.
- Tube.AI intelligently extracts content, summarizes the video, and responds to user queries.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute the code.

---

**Tube.AI** - Making YouTube content accessible and summarized for everyone!