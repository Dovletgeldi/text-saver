const saveBtn = document.getElementById("sv-msg-input");
const titleText = document.getElementById("msg-input-title")
const contentText = document.getElementById("msg-input")
const savedList = document.getElementById("saved-list")
const searchBar = document.getElementById("search-bar")

document.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("savedItems")) || [];

  savedData.forEach(item => {
    createListItem(item.title, item.paragraph);
  });
});

searchBar.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase()
  const items = document.querySelectorAll(".saved-item")
  
  items.forEach(item => {
    const title = item.textContent.toLocaleLowerCase()
    if(title.includes(query)) {
      item.style.display = ""
    } else {
      item.style.display = "none"
    }
  })
})

saveBtn.addEventListener("click", () => {
  const title = titleText.value.trim()
  const paragraph = contentText.value.trim()
  
  if(!title || !paragraph) {
    alert("Both title and paragraph are required!")
    return
  }
  
  const savedData = JSON.parse(localStorage.getItem("savedItems")) || []
  savedData.push({title, paragraph})
  localStorage.setItem("savedItems", JSON.stringify(savedData))

  createListItem(title, paragraph)

  titleText.value = ""
  contentText.value = ""
})

function createListItem(title, paragraph) {
  const item = document.createElement("div");
  item.classList.add("saved-item");
  item.setAttribute("data-paragraph", paragraph);

  const titleSpan = document.createElement("span");
  titleSpan.classList.add("title");
  titleSpan.textContent = title;

  item.addEventListener("click", () => {
    navigator.clipboard.writeText(paragraph).then(() => {
      console.log("Paragraph copied!");
    }).catch(err => {
      console.error("Failed to copy", err);
    });
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("dblclick", () => {
    savedList.removeChild(item);
    let savedData = JSON.parse(localStorage.getItem("savedItems")) || [];
    savedData = savedData.filter(
      savedItem => savedItem.title !== title || savedItem.paragraph !== paragraph
    );
    localStorage.setItem("savedItems", JSON.stringify(savedData));
  });

  item.appendChild(titleSpan);
  item.appendChild(deleteBtn);

  savedList.appendChild(item);
}

document.getElementById("create").addEventListener("click", () => {
  const container = document.querySelector(".container");
  container.classList.toggle("hidden");
});








