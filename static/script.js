const downloadButton = document.getElementById('download-button');
const downloadForm = document.getElementById('download-form');
const progressBar = document.querySelector('.progress-bar');

downloadForm.addEventListener('submit', (event) => {
    event.preventDefault();

    downloadButton.disabled = true;

    const url = document.getElementById('url').value;
    const format = document.getElementById('format').value;
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/download', true);
    xhr.responseType = 'blob';

    xhr.onload = () => {
        if (xhr.status === 200) {
            downloadButton.disabled = false;

            const blob = xhr.response;
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${Date.now()}.${format}`;
            a.click();

            window.URL.revokeObjectURL(url);
        }
    };

    xhr.onprogress = (event) => {
        const total = event.total;
        const loaded = event.loaded;
        const percent = Math.round((loaded / total) * 100);

        progressBar.style.width = `${percent}%`;
    };

    const formData = new FormData();
    formData.append('url', url);
    formData.append('format', format);
    xhr.send(formData);
});
