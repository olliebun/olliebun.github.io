// credit: https://stackoverflow.com/a/63499899
const digest = async ({ algorithm = "SHA-256", message }) =>
  Array.prototype.map
    .call(
      new Uint8Array(
        await crypto.subtle.digest(algorithm, new TextEncoder().encode(message))
      ),
      (x) => ("0" + x.toString(16)).slice(-2)
    )
    .join("");

function buildURL(hashedPassword) {
  return "/press/protected/" + hashedPassword + ".html";
}

window.addEventListener("load", () => {
  var promptLink = document.getElementById("password-prompt")

  promptLink.addEventListener("click", async () => {
    const password = window.prompt("password from ollie", "");
    const hashedPassword = await digest(password);
    window.location.href = buildURL(hashedPassword);
  });
});

