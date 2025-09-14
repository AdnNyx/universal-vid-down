# 📥 Video Downloader

A simple web application built with **Python** and **Flask** to download public videos from the web.  
It provides a modern, responsive web interface and a **JSON API** for further integration.

![App Screenshot](https://github.com/AdnNyx/universal-vid-down/blob/main/Image/example.png?raw=true)

---

## 🚀 Features

- 🎨 **Modern Web Interface**  
  Clean, responsive design with animated backgrounds.

- 🔌 **Flexible JSON API**  
  `/download` endpoint that returns video information in JSON format.

- 🧠 **Automatic Data Retrieval**  
  Fetches video title, uploader name, and thumbnail image.

- 🔧 **Reliable Backend**  
  Powered by `yt-dlp`, frequently updated to support changes on video platforms.

- ⚡ **Lightweight & Easy to Run**  
  Built with Flask, a Python micro-framework.

---

## 🗂️ Project Structure

```

video-downloader/
├── app.py              # Flask backend (API & Web server)
├── requirements.txt    # Python dependencies
├── templates/
│   └── index.html      # Web interface
└── static/
├── style.css       # Frontend styling
└── script.js       # Frontend logic

````

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://your-repository-url.git
cd your-project-directory
````

### 2. Create `requirements.txt`

Add the following:

```
Flask
yt-dlp
```

### 3. Create and Activate Virtual Environment

```bash
# Create virtual environment
python3 -m venv venv

# Activate (Linux/macOS)
source venv/bin/activate

# Activate (Windows)
venv\Scripts\activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## ▶️ Usage

### 1. Run the Server

```bash
python app.py
```

Access at: [http://127.0.0.1:5000](http://127.0.0.1:5000)

### 2. Use the Web Interface

* Enter the video URL in the input field.
* Click **"Get Video"**.
* If successful, video information and download links will appear.

### 3. Use the API Directly (Optional)

Endpoint:

```
GET /download?url=https://example.com/video/...
```

✅ Example Success Response:

```json
{
  "success": true,
  "title": "Awesome Video Title",
  "uploader": "Uploader Name",
  "thumbnail_url": "https://url.to/thumbnail.jpg",
  "download_url": "https://url.to/video.mp4",
  "extension": "mp4"
}
```

❌ Example Error Response:

```json
{
  "success": false,
  "error": "Failed to process video. Please ensure the URL is valid and the video is public."
}
```

---

## 🧰 Technologies Used

* **Backend**: Python, Flask
* **Video Processing**: yt-dlp
* **Frontend**: HTML5, CSS3, Vanilla JavaScript

---

## 📄 License

This project is released under the MIT License.
You are free to use it for personal, educational, or extended development purposes.

---

## 🙋 Contributors

* **Developer**: [@vollereich](https://www.instagram.com/vollereich/)
