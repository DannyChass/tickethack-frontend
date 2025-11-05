const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", async () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  if (email === "" || password === '') {
    alert("les champs doivent être remplis");
  } else {
    try {
      const reponse = await fetch("http://localhost:3000/users/login", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email, password}),
      });
      const data = await reponse.json();
      if(data) {
        localStorage.setItem("Id", data.result._id);
        window.location.href= '/landingpage.html'
        console.log(data)
      }
    } catch (error) {
      console.log(error);
    }
  }
});

const signup = document.getElementById("signupButton");
signup.addEventListener("click", async () => {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;

  try {
    const response = await fetch("http://localhost:3000/users/addUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    const data = await response.json();
    if (data) {
      //window.location('index.html')
      console.log(data);
    }
  } catch (error) {
    console.log(error);
  }
});
