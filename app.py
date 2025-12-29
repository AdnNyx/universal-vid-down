import os
# Add render_template to imports
from flask import Flask, request, jsonify, render_template
import yt_dlp

app = Flask(__name__)

# New route to display frontend page (index.html)
@app.route('/')
def home():
    return render_template('index.html')

# Route untuk Sitemap (SEO)
@app.route('/sitemap.xml')
def sitemap():
    # Mengambil file sitemap.xml dari folder 'static'
    return send_from_directory('static', 'sitemap.xml')

# Route untuk Robots.txt (Opsional tapi sangat disarankan untuk SEO)
@app.route('/robots.txt')
def robots():
    # Anda perlu membuat file robots.txt di folder static juga
    return send_from_directory('static', 'robots.txt')
    
# Route API
@app.route('/download', methods=['GET'])
def get_video_info():
    video_url = request.args.get('url')

    if not video_url:
        return jsonify({
            "success": False,
            "error": "Parameter 'url' tidak ditemukan. Mohon sertakan URL video."
        }), 400

    try:
        ydl_opts = {
            'format': 'best[ext=mp4]/best',
            'quiet': True,
        }

        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info_dict = ydl.extract_info(video_url, download=False)
            
            response_data = {
                "success": True,
                "title": info_dict.get('title'),
                "uploader": info_dict.get('uploader'),
                "thumbnail_url": info_dict.get('thumbnail'),
                "download_url": info_dict.get('url'),
                "extension": info_dict.get('ext'),
            }
            return jsonify(response_data)

    except yt_dlp.utils.DownloadError as e:
        app.logger.error(f"yt-dlp error: {e}")
        return jsonify({
            "success": False,
            "error": "Gagal memproses video. Pastikan URL valid dan video bersifat publik."
        }), 404
    except Exception as e:
        app.logger.error(f"An unexpected error occurred: {e}")
        return jsonify({
            "success": False,
            "error": f"Terjadi kesalahan tak terduga: {str(e)}"
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))

    app.run(host='0.0.0.0', port=port, debug=True)


