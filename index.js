export class Users {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }
}

function generateRows(item) {
  const row = document.createElement('tr');
  const userCell = document.createElement('td');
  const emailCell = document.createElement('td');
  const phoneCell = document.createElement('td');
  const editCell = document.createElement('td');
  const deleteCell = document.createElement('td');
  const btnEdit = document.createElement('button');
  btnEdit.textContent = 'Editar';
  btnEdit.addEventListener('click', () => {
    updateOne(item.id, item);
  });
  const btnDelete = document.createElement('button');
  btnDelete.textContent = 'Borrar';
  btnDelete.addEventListener('click', () => {
    console.log('Entrar aca');
    deleteOne(item.id);
  });
  userCell.textContent = item.name;
  emailCell.textContent = item.email;
  phoneCell.textContent = item.phone;
  editCell.appendChild(btnEdit);
  deleteCell.appendChild(btnDelete);
  row.appendChild(userCell);
  row.appendChild(emailCell);
  row.appendChild(phoneCell);
  row.appendChild(editCell);
  row.appendChild(deleteCell);
  tabla.appendChild(row);
}

const formAdd = document.getElementById('formAdd');
const title = document.getElementById('title');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');

const formAdd2 = document.getElementById('formAdd2');
const name2 = document.getElementById('name2');
const email2 = document.getElementById('email2');
const phone2 = document.getElementById('phone2');

formAdd2.addEventListener('submit', () => {
  const user = new Users(name2.value, email2.value, phone2.value);
  addOne(user);
});

const openModal = document.getElementById('open-modal-add');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');

const modal2 = document.getElementById('modal2');
const closeModal2 = document.getElementById('close-modal2');

closeModal.addEventListener('click', () => {
  modal.close();
});

openModal.addEventListener('click', () => {
  modal2.showModal();
});
closeModal2.addEventListener('click', () => {
  modal2.close();
});

const BASE_URL = 'https://6482367e29fa1c5c5032ba3a.mockapi.io/users';
const tabla = document.getElementById('tabla');
function getAll() {
  fetch(BASE_URL)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((item) => {
        generateRows(item);
      });
    })
    .catch((err) => console.error(err));
}

function getOne(id) {
  fetch(BASE_URL + `/${id}`)
    .then((res) => res.json())
    .then((data) => {
      name.value = data.name;
      email.value = data.email;
      phone.value = data.phone;
    })
    .catch((err) => console.error(err));
}

function deleteOne(id) {
  fetch(BASE_URL + `/${id}`, {
    method: 'DELETE'
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      location.reload();
    })
    .catch((err) => console.error(err));
}

function addOne(user) {
  fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
    .then((res) => res.json())
    .then((user) => generateRows(user))
    .catch((err) => console.error(err));
}

function updateOne(id, user) {
  getOne(id);
  modal.showModal();
  formAdd.addEventListener('submit', () => {
    let user2 = {
      name: name.value,
      email: email.value,
      phone: phone.value
    };
    fetch(BASE_URL + `/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user2)
    }).then(() => {
      console.log('getAll');
      tabla.innerHTML = '';
      getAll();
    });
  });
}

function searchUser(keyword) {
  fetch(BASE_URL + `?search=${keyword}`)
    .then((res) => res.json())
    .then((data) => {
      tabla.innerHTML = '';
      data.forEach((item) => {
        generateRows(item);
      });
    })
    .catch((err) => console.error(err));
}

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

searchButton.addEventListener('click', () => {
  const keyword = searchInput.value;
  if (keyword.trim() !== '') {
    searchUser(keyword);
  }
});

const backButton = document.getElementById('back-button');
backButton.addEventListener('click', () => {
  location.reload();
});

getAll();
