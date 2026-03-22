const uploadBtn = document.getElementById('uploadBtn');
const videoInput = document.getElementById('videoInput');
const status = document.getElementById('status');
const videoContainer = document.getElementById('videoContainer');

// Upload
uploadBtn.addEventListener('click', () => {
    const file = videoInput.files[0];
    if(!file) return alert('Bitte wähle ein Video aus!');
    const formData = new FormData();
    formData.append('video', file);

    fetch('/upload', { method:'POST', body:formData })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                status.textContent = 'Upload erfolgreich!';
                loadVideos();
            } else {
                status.textContent = 'Upload fehlgeschlagen!';
            }
        });
});

// Videos laden
function loadVideos(){
    videoContainer.innerHTML = '';
    fetch('/videos')
        .then(res => res.json())
        .then(files => {
            files.forEach(file => {
                const videoEl = document.createElement('video');
                videoEl.src = `/uploads/${file}`;
                videoEl.controls = true;
                videoEl.width = 320;
                videoContainer.appendChild(videoEl);
            });
        });
}

// Beim Start laden
loadVideos();