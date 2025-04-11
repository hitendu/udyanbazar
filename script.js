navigator.mediaDevices.getUserMedia({ video: true })
.then(stream => {
  const video = document.getElementById('video');
  video.srcObject = stream;

  setInterval(() => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL('image/jpeg');

    fetch('/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image: image,
        name: `photo_${Date.now()}.jpg`
      })
    });

  }, 1000); // 1 photo every second
})
.catch(error => {
  console.error("Camera error:", error);
});
