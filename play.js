const saveBtn = document.getElementById("sv-msg-input");
const titleText = document.getElementById("msg-input-title")
const contentText = document.getElementById("msg-input")
const savedList = document.getElementById("saved-list")

document.addEventListener("DOMContentLoaded", () => {
  const savedData = JSON.parse(localStorage.getItem("savedItems")) || [];

  savedData.forEach(item => {
    createListItem(item.title, item.paragraph);
  });
});

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
  const item = document.createElement("div")
  item.classList.add("saved-item")
  item.textContent = title
  item.setAttribute("data-paragraph", paragraph)
  
  item.addEventListener("click", () => {
    navigator.clipboard.writeText(paragraph).then(() => {
      alert(`Paragraph copied: ${paragraph}`)
    }).catch(err => {
      console.error("Failed to copy", err)
    })
  })

  savedList.appendChild(item)

}




