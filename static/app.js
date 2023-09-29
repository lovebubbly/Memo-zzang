async function editMemo(event) {
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 값을 입력하세요");
  const res = await fetch(`/memos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      content: editInput,
    }),
  });
  Readmemo();
}

async function deleteMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  Readmemo();
  console.log(`Sending DELETE request for ID: ${id}`);
}

function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");

  li.innerText = `${memo.content}`;

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", editMemo);
  editBtn.dataset.id = memo.id;

  const delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.addEventListener("click", deleteMemo);
  delBtn.dataset.id = memo.id;

  ul.appendChild(li);
  ul.appendChild(editBtn);
  ul.appendChild(delBtn);
}
function handleSubmit(event) {
  event.preventDefault();
  console.log("Form submitted!");
  const input = document.querySelector("#memo-input");
  Creatememo(input.value);
  input.value = "";
}
async function Readmemo() {
  const res = await fetch("/memos"); //Get요청이 갑니당
  const jsonRes = await res.json();
  const ul = document.querySelector("#memo-ul");
  ul.innerHTML = "";
  jsonRes.forEach(displayMemo);
}

async function Creatememo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date().toISOString(),
      content: value,
    }),
  });
  const jsonRes = await res.json();
  console.log(jsonRes);
  Readmemo();
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);

Readmemo();
