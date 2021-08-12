let profile;

async function main() {
  await liff.init({ liffId: "1656049054-rOwXLowg" });
  if (liff.isLoggedIn()) {
    await getUserProfile();
    checkUserSubmission();
  } else {
    liff.login();
  }
}
main();

async function getUserProfile() {
  profile = await liff.getProfile();
  document.getElementById("pictureUrl").src = profile.pictureUrl;
  /* document.getElementById("displayName").append(profile.displayName)
  document.getElementById("statusMessage").append(profile.statusMessage)
  /* document.getElementById("userId").append(profile.userId) */
  document.getElementById("TB_userId").value = profile.userId;
  return profile;
}

function logOut() {
  liff.logout();
  window.location.reload();
}

let userList = document.querySelector("#userList");
let form = document.querySelector("#addUser");

function renderUser(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let weight = document.createElement("span");
  let height = document.createElement("span");
  let userid = document.createElement("span");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  weight.textContent = doc.data().weight;
  height.textContent = doc.data().height;
  userid.textContext = doc.data().userid;

  li.appendChild(name);
  li.appendChild(weight);
  li.appendChild(height);
  li.appendChild(userid);

  userList.appendChild(li);
}

function showBody(){
  document.querySelector("body").style.display = "block"
}


function checkUserSubmission(){
  db.collection("user")
    .where("userid","==", profile && profile.userId)
    .get()
    .then(user => {
      if(!user.empty)  {
        window.location.replace("thankyou.html");
        return;
     }
    showBody();
    renderUser(doc);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("user")
    .add({
      name: form.name.value,
      weight: form.weight.value,
      height: form.height.value,
      userid: form.userid.value,
    })
    .then(() => {
      form.name.value = "";
      form.weight.value = "";
      form.height.value = "";
      form.userid.value = "";
      window.location.replace("thankyou.html");
    })
    .catch((err) => {
      console.error(err);
    });
});
