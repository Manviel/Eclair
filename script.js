const addLink = document.getElementById("add-link");

addLink.addEventListener("submit", function(e) {
  e.preventDefault();

  const form = e.target.children[0].value;

  getPrivacyPage(form);
});

function getPrivacyPage(url) {
  const xhr = new XMLHttpRequest();

  xhr.open("GET", `${url}privacy`, true);

  xhr.setRequestHeader("Content-Type", "application/xhr");
  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

  const privacy = document.getElementById("privacy");

  privacy.href = `${url}privacy`;
  privacy.innerText = `${url}privacy`;

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const htmlDoc = new DOMParser().parseFromString(
        xhr.responseText,
        "text/html"
      );

      const temp = htmlDoc.body.innerText;

      const words = temp.split(/\s+/).join(" ");

      document.write({
        policy: [
          {
            title: "Privacy Policy",
            filename: `${url}/privacy`,
            document: words.slice(0, 1000)
          }
        ],
        filename: `${url}/privacy`
      });
    }
  };

  xhr.send();
}
