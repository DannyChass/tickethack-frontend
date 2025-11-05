const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", async () => {
  const reponse = fetch("http://");
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
});

const signup = document.getElementById("signupButton");
signup.addEventListener("click", async () => {
  const email = document.getElementById("signuEmail").value;
  const password = document.getElementById("signupPassword").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;

  try {
    const response = await fetch("htpp://localhost:3000/users/addUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email, password, firstName, lastName),
    });

    const data = await response.json();
    if (data){
        window.location('index.html')
    }
  } catch (error) {
    console.log(error);
  }
});
