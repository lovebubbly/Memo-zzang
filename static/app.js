function displayMemo(memo) {
  const ul = document.querySelector("#memo-ul");
  const li = document.createElement("li");
  li.innerText = `[id:${memo.id}] ${memo.content}`;
  ul.appendChild(li);
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
