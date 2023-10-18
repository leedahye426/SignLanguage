import os

video_folder_path = "video"  # 비디오 파일이 있는 폴더의 경로
video_paths = []

# 폴더 내의 모든 파일을 가져와서 처리합니다.
for file_name in os.listdir(video_folder_path):
    file_path = os.path.join(video_folder_path, file_name)

    # MP4 파일인지 확인합니다.
    if os.path.isfile(file_path) and file_name.endswith('.mp4'):
        video_paths.append(file_path)

print(video_paths)