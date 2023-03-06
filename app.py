from flask import Flask, render_template, request, send_file
from pytube import YouTube
import os

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/download', methods=['POST'])
def download():
    url = request.form['url']
    format = request.form['format']
    yt = YouTube(url)
    if format == 'mp3':
        audio = yt.streams.filter(only_audio=True).first()
        out_file = audio.download(output_path="")
        base, ext = os.path.splitext(out_file)
        new_file = base + '.mp3'
        os.rename(out_file, new_file)
        return send_file(new_file, as_attachment=True)
    else:
        video = yt.streams.get_highest_resolution()
        out_file = video.download()
        return send_file(out_file, as_attachment=True)

if __name__ == '__main__':
    app.run()

