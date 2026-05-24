"""Extract audio (.wav) from video using moviepy."""
import os

def extract_audio(video_path: str) -> str:
    audio_path = os.path.splitext(video_path)[0] + ".wav"
    try:
        from moviepy.editor import VideoFileClip
        clip = VideoFileClip(video_path)
        if clip.audio is None:
            clip.close()
            return ""
        clip.audio.write_audiofile(audio_path, logger=None)
        clip.close()
        return audio_path
    except Exception as e:
        print(f"[audio_extractor] {e}")
        return ""
