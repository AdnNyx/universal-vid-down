document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('url-form');
    const urlInput = document.getElementById('fb-url');
    const submitBtn = document.getElementById('submit-btn');
    const loader = document.getElementById('loader');
    const resultDiv = document.getElementById('result');

    // Background Animation Logic
    const background = document.querySelector('.background-animation');
    const createSquares = () => {
        const squareCount = 20;
        for (let i = 0; i < squareCount; i++) {
            const square = document.createElement('li');
            square.classList.add('square');

            const size = Math.random() * 150 + 50;
            square.style.width = `${size}px`;
            square.style.height = `${size}px`;
            
            square.style.left = `${Math.random() * 100}%`;
            square.style.animationDuration = `${Math.random() * 15 + 10}s`;
            square.style.animationDelay = `${Math.random() * 5}s`;

            background.appendChild(square);
        }
    };
    createSquares();
    // End of Animation Logic

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const url = urlInput.value.trim();
        if (!url) {
            alert('Harap masukkan URL video!');
            return;
        }

        loader.style.display = 'block';
        resultDiv.style.display = 'none';
        resultDiv.innerHTML = '';
        submitBtn.disabled = true;

        try {
            // Call backend API
            const response = await fetch(`/download?url=${encodeURIComponent(url)}`);
            const data = await response.json();

            if (data.success) {
                displayResult(data);
            } else {
                displayError(data.error);
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            displayError('An error accurred while prossesing the video. Please try again.');
        } finally {
            loader.style.display = 'none';
            submitBtn.disabled = false;
            urlInput.value = '';
        }
    });

    function displayResult(data) {
        const { title, uploader, thumbnail_url, download_url, extension } = data;
        
        const resultHTML = `
            <img src="${thumbnail_url}" alt="Video Thumbnail">
            <div class="info">
                <h3>${title || 'Title not available'}</h3>
                <p>Oleh: ${uploader || 'Unknown Uploader'}</p>
                <a href="${download_url}" class="download-btn" download>Download Video (.${extension || 'mp4'})</a>
            </div>
        `;

        resultDiv.innerHTML = resultHTML;
        resultDiv.style.display = 'flex';
    }

    function displayError(message) {
        const errorHTML = `<p style="color: #ff8a80;"><strong>Error:</strong> ${message}</p>`;
        resultDiv.innerHTML = errorHTML;
        resultDiv.style.display = 'block';
    }
});