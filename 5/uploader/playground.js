// 1. Navigation - done
// 2. Add event listener - done
// 3. Get info about each image - done
// 4. Create data structure - done
// 5. Save in localstorage - done
// 6. Display images - done

var uploader = getElement('#uploader');
var imagesList = getElement('.images');
var removeImage = getElement('.removeButton');
var modalImage = getElement('.modal-image');
var modalName = getElement('.modal-name');

var images = JSON.parse(localStorage.getItem('images')) || [];

function getElement(selector) {         //get element
    return document.querySelector(selector);
}

function generateID() {         //id generation
    return (Date.now() + performance.now()).toString();
}

function updateLocalStorage(items, list) {
    localStorage.setItem(items, JSON.stringify(list));
}

function uploadImages() {
    var files = this.files, i, image, fileLength = files.length;
    if (FileReader) {
        for (i = 0; i < fileLength; i = i + 1) {
            var fileReader = new FileReader();
            const file = files[i];          //в es5 не знаю как обойти это стороною
            fileReader.addEventListener('load', function (event) {
                image = {};
                image['name'] = file.name;
                image['id'] = generateID();
                image['size'] = file.size;
                image['url'] = event.target.result;
                images.push(image);
                displayImages(images, imagesList);
                updateLocalStorage('images', images);
            });
            fileReader.readAsDataURL(file);
        }
    } else {
        alert('FileReader API does not support by your browser!');
    }
}

function updateImage(id, value) {           //update
    const findId = images.findIndex(image => image.id === id);
    images[findId].name = value;
    updateLocalStorage('images', images);
    displayImages(images, imagesList);
}

function deleteImage(target) {          //delete
    const id = target.closest('li').dataset.id;
    images = images.filter(image => image.id !== id);
    updateLocalStorage('images', images);
    displayImages(images, imagesList);
}

function openEdit(target) {            //open edit
    const editMode = target.closest('figcaption').querySelector('#edit');
    const inputName = target.closest('figcaption').querySelector('.input-name');
    const checkMark = target.closest('figcaption').querySelector('.fa-check');
    const cancelEdit = target.closest('figcaption').querySelector('.fa-times');
    const id = target.closest('li').dataset.id;
    const image = images.find(image => image.id === id);

    target.style.display = 'none';
    editMode.style.display = 'block';

    inputName.value = image.name;

    cancelEdit.onclick = () => closeEdit(target, editMode);
    checkMark.onclick = () => updateImage(id, inputName.value);
}

function closeEdit(target) {          //cancel editmode
    const editMode = target.closest('figcaption').querySelector('#edit');
    editMode.style.display = 'none';
    target.style.display = 'block';
}

function showImage(target) {        //modal with prewiev image
    var modalWindow = getElement('.modal-window');
    const closeImage = modalWindow.querySelector('.fa-times');
    const currentImage = target.closest('figure').querySelector('img');
    const currentName = target.closest('li').querySelector('.image-name');

    modalWindow.style.display = 'block';

    modalImage.src = currentImage.src;
    modalImage.alt = currentImage.alt;
    modalName.innerHTML = currentName.innerHTML;

    closeImage.onclick = () => modalWindow.style.display = 'none';
}

const handleInteraction = ({ target }) => {         //handler
    const closestItem = target.closest('.wrapper');
    if (!closestItem) return;
    if (target.className === 'fas fa-eye') {
        showImage(target);
    }
    if (target.className === 'removeButton' || target.className === 'fas fa-trash') {
        deleteImage(target);
    }
    if (target.className === 'image-name') {
        openEdit(target);
    }
}

displayImages(images, imagesList);

uploader.addEventListener('change', uploadImages);

var content = getElement('#content');
content.addEventListener('click', handleInteraction);