import openai
import sys
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get your OpenAI API key from the .env
openai.api_key = os.getenv("OPENAI_API_KEY")

def summarize(text):
    if not text:
        return "Transcript is empty or missing."

    prompt = f"Summarize the following podcast transcript in clear bullet points:\n\n{text[:3000]}"

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Change to gpt-4 if needed
            messages=[
                {"role": "system", "content": "You are a podcast summarizer."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.6
        )
        summary = response['choices'][0]['message']['content']
        return summary
    except Exception as e:
        return f"Error: {e}"

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python summarize.py path_to_transcript.txt")
    else:
        file_path = sys.argv[1]
        if not os.path.exists(file_path):
            print("Transcript file not found.")
        else:
            with open(file_path, "r", encoding="utf-8") as f:
                transcript = f.read()
            print("\n--- SUMMARY ---")
            print(summarize(transcript))
