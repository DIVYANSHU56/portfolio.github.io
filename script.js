function openModal(image) {
    var modal = document.getElementById("modal");
    var modalImg = document.getElementById("modal-image");
    var captionText = document.getElementById("caption");
    
    modal.style.display = "block";
    modalImg.src = image.src;
    captionText.innerHTML = image.alt;
}

function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

function uploadImage(event) {
    var files = event.target.files;
    var gallery = document.getElementById("gallery");

    for (var i = 0; i < files.length; i++) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var newImg = document.createElement("img");
            newImg.src = e.target.result;
            newImg.alt = "Uploaded Image";
            newImg.onclick = function() {
                openModal(newImg);
            };
            gallery.appendChild(newImg);
        };
        reader.readAsDataURL(files[i]);
    }
}

document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var formData = new FormData(this);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('gallery').innerHTML += data;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

