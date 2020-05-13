const body = document.body;
const imageLoader = document.querySelector('.image-loader');
const cropBox = document.querySelector('.crop-box');
const imageWrapper = document.querySelector('.image_wrapper');
let shiftCoefficient = {
    x: 0,
    y: 0
};

imageLoader.addEventListener('change', () => {
    try {
        const inputFiles = imageLoader.files;
        if (!inputFiles || inputFiles.length === 0) {
            return;
        }

        const inputFile = inputFiles[0];
        const img = document.createElement('img');
        img.className = 'preview';
        imageWrapper.appendChild(img);

        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            img.src = event.target.result;
            initCropFunc();
        });
        reader.addEventListener('error', (event) => {
            alert('ERROR: ' + event.target.error.code);
        });
        reader.readAsDataURL(inputFile);
    } catch(e) {
        alert(`Something went wrong ${e}`);
    }
});

function initCropFunc() {
    cropBox.addEventListener('mousedown', startMoveCropBox);
    cropBox.addEventListener('mouseup', stopMoveCropBox);

    const cropBoxControl = document.querySelector('.crop-box-control');
    cropBoxControl.addEventListener('mousedown', startChangeCropBox);
    cropBoxControl.addEventListener('mouseup', stopChangeCropBox);

    const cropButton = document.querySelector('.crop-btn');
    cropButton.addEventListener('click', crop);
}

function startMoveCropBox(e) {
    const cropBoxStyles = cropBox.getBoundingClientRect();
    shiftCoefficient = {
        x: e.pageX - cropBoxStyles.left,
        y: e.pageY - cropBoxStyles.top
    }
    body.addEventListener('mousemove', moveCropBox);
    body.addEventListener('mouseup', stopMoveCropBox);
}

function moveCropBox(e) {
    const cropBoxStyles = cropBox.getBoundingClientRect();

    cropBox.style.left = e.pageX - shiftCoefficient.x + 'px';
    cropBox.style.top = e.pageY - shiftCoefficient.y + 'px';
}

function stopMoveCropBox() {
    body.removeEventListener('mousemove', moveCropBox);
}


function startChangeCropBox(e) {
    e.stopPropagation();
    body.addEventListener('mousemove', changeCropBox);
    body.addEventListener('mouseup', stopChangeCropBox);
}

function changeCropBox(e) {
    const cropBoxStyles = cropBox.getBoundingClientRect();

    cropBox.style.width = e.pageX - cropBoxStyles.left + 'px';
    cropBox.style.height = e.pageY - cropBoxStyles.top + 'px';
}

function stopChangeCropBox() {
    body.removeEventListener('mousemove', changeCropBox);
}

function crop() {
    const myCanvas = document.querySelector('.my-canvas');
    const cropBoxStyles = cropBox.getBoundingClientRect();
    const imageWrapperStyles = imageWrapper.getBoundingClientRect();

    myCanvas.setAttribute('width', cropBoxStyles.width + 'px');
    myCanvas.setAttribute('height', cropBoxStyles.height + 'px');

    const ctx = myCanvas.getContext('2d');
    const img = document.querySelector('.preview');
    ctx.drawImage(img, -(cropBoxStyles.left - imageWrapperStyles.left), -(cropBoxStyles.top - imageWrapperStyles.top));
}