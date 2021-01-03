// 1. Navigation - done
// 2. Add event listeners - done
// 3. Add item - done
// 4. Display item - done

var itemsList = getElement('.plates');
var addItems = getElement('.add-items');
var editItem = getElement('.fas fa-pencil-alt');
var removeItem = getElement('.fas fa-trash');
var myModal = getElement('.modal-window');
var closeModal = getElement('.fas fa-times');
var modalInput = getElement('#modal-input');

function getElement(selector) {
    return document.querySelector(selector);
}

var items = JSON.parse(localStorage.getItem('items')) || [];

function generateID() {         //id generation
    return (Date.now() + performance.now()).toString();
}

function updateLocalStorage(items, list) {
    localStorage.setItem(items, JSON.stringify(list));
}

function addItem(event) {
    event.preventDefault();
    var text = this.querySelector('[name=item]').value;
    var item = {
        text: text,
        done: false,
        id: generateID()
    };
    items.push(item);
    populateList(items, itemsList);
    updateLocalStorage('items', items);
    this.reset();
}

function updateItem(id, value) {    //update
    const findId = items.findIndex(item => item.id === id);
    items[findId].text = value;
    updateLocalStorage('items', items);
    populateList(items, itemsList);
    hideModal();
}

function updateMark(target) {   //checkbox
    const id = target.parentNode.dataset.id;
    const findId = items.findIndex(item => item.id === id);
    items[findId].done = target.checked;
    updateLocalStorage('items', items);
    populateList(items, itemsList);
}

function deleteItem(target) {   //delete
    let result = window.confirm('Are you sure?');
    if (result) {
        const id = target.parentNode.dataset.id;
        items = items.filter(item => item.id !== id);
        updateLocalStorage('items', items);
        populateList(items, itemsList);
    }
}

function showModal(target) {
    myModal.style.display = 'block';
    const id = target.parentNode.dataset.id;
    const item = items.find(item => item.id === id);
    modalInput.value = item.text;
    const checkMark = getElement('.fa-check');
    checkMark.onclick = () => updateItem(id, modalInput.value);
}

function hideModal() {
    return myModal.style.display = 'none';
}

function populateList(plates, platesList) {
    platesList.innerHTML = plates.map(function (plate, index) {
        let checked = plate.done ? 'checked' : '';
        return `
            <li data-id="${plate.id}">
                <input type="checkbox" id="item${index}" class="checkMark" ${checked}>
                <label for="item${index}">${plate.text}</label>
                <i class="fas fa-pencil-alt"></i>
                <i class="fas fa-trash"></i>
            </li>
        `
    }).join('');
}

const handleInteraction = ({ target }) => {     //handler
    const closestItem = target.closest('.wrapper');
    if (!closestItem) return;
    const content = getElement('#content');
    if (target.className === 'fas fa-pencil-alt') {
        showModal(target);
    }
    if (target.className === 'fas fa-trash') {
        deleteItem(target);
        hideModal();
    }
    if (target.className === 'fas fa-times') {
        hideModal();
    }
    if (target.className === 'checkMark') {
        updateMark(target);
    }
}

populateList(items, itemsList);

addItems.addEventListener('submit', addItem);

const content = getElement('#content');
content.addEventListener('click', handleInteraction);