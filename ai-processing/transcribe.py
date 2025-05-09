import whisper
import sys
import os

def transcribe_audio(audio_path):
    if not os.path.exists(audio_path):
        print("Audio file not found.")
        return

    print("Loading Whisper model...")
    model = whisper.load_model("base")  # options: tiny, base, small, medium, large

    print(f"Transcribing: {audio_path}")
    result = model.transcribe(audio_path)

    print("\n--- TRANSCRIPTION ---")
    print(result["text"])
    return result["text"]

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python transcribe.py path_to_audio_file")
    else:
        transcribe_audio(sys.argv[1])
