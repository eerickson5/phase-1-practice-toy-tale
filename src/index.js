let addToy = false;
//http://localhost:3000/toys


handleLikeClicked = (toy) => {
  toy.likes ++;
  fetch(`http://localhost:3000/toys/${toy.id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toy)
  })
  .then((res) => res.json())
  .then((returnedValue) => {
    const likesElement = document.querySelector(`#toy-${toy.id} p`);
    likesElement.textContent = returnedValue.likes;
  })
  .catch(e => console.log(e.message))
}

createCard = (toy) => {
  const card = document.createElement("div");
  card.className = "card";
  card.id = `toy-${toy.id}`;
  console.log(card.id);

  const toyName = document.createElement('h2');
  toyName.textContent = toy.name;
  card.appendChild(toyName);

  const image = document.createElement("img");
  image.src = toy.image;
  image.className = "toy-avatar";
  card.appendChild(image);

  const likes = document.createElement("p");
  likes.textContent = toy.likes;
  card.appendChild(likes);

  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.id = toy.id;
  likeButton.textContent = "Like ❤️";
  likeButton.addEventListener("click", () => handleLikeClicked(toy))
  card.appendChild(likeButton)

  return card;
}

fetchToyCards = () => {
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toys => {
    toys.forEach(toy => {
      const card = createCard(toy);
      document.getElementById("toy-collection").append(card);
    })
  })
}

handleFormResponse = () => {
  const form = document.querySelector("form");
  let inputs = document.querySelectorAll("input.input-text");

  const name = inputs[0].value;
  const image = inputs[1].value;

  toyObject = {name, image, likes: 0};
  
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(toyObject)
  })
  .then((res) => res.json())
  .then((returnedToy) => {
    const card = createCard(returnedToy);
    document.getElementById("toy-collection").append(card);
  })
  .catch(e => console.log(e.message))

  form.reset();
}

document.addEventListener("DOMContentLoaded", () => {
  fetchToyCards();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", (e) => {
        e.preventDefault();
        handleFormResponse();
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});
