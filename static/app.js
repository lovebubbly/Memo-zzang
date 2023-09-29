function handleSubmit(event) {
  event.preventDefault();

  const input = document.querySelector("#memo-input");
  Creatememo(input.value);
  input.value = "";
}
async function Creatememo(value) {
  const res = await fetch("/memos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date(),
      content: value,
    }),
  });
  const jsonRes = await res.json();
  console.log(jsonRes);
}

const form = document.querySelector("#memo-form");
form.addEventListener("submit", handleSubmit);
