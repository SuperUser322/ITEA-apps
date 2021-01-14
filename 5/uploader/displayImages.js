function displayImages(images, imagesList) {
    imagesList.innerHTML = images.map(function (image, index) { //id = "${image.id}" 4ая строка, добавил
        return `
            <li data-id="${image.id}">
                <figure>
                    <img src=${image.url} alt="Image ${index + 1}">
                    <div class="shadow">
                        <i class="fas fa-eye"></i>
                        <i class="fas fa-trash"></i>
                    </div>
                    <figcaption>
                        <p class="image-name">${image.name}</p>
                        <div id="edit">
                            <input type="text" class="input-name"/>
                            <br />
                            <i class="fas fa-check"></i>
                            <i class="fas fa-times"></i>
                        </div>
                        <p>${(image.size / 1000).toFixed(1)} kB</p>
                    </figcaption>
                    <button class="removeButton">Remove</button>
                </figure>
            </li>
        `
    }).join('');
}
