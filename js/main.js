document.querySelector('#clickMe').addEventListener('click', makeReq)

async function makeReq(){

  const userName = document.querySelector("#userName").value.toLowerCase();
  const res = await fetch(`/api?student=${userName}`)
  const data = await res.json()

  console.log(data);
  document.querySelector("#personName").textContent = data.gameResult
  document.querySelector("#personStatus").textContent = data.botPick
  document.querySelector("#personOccupation").textContent = data.currentOccupation
}
