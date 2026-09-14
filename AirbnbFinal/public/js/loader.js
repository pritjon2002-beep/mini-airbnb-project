document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", () => {
    let btn = form.querySelector("button[type='submit'], button:not([type])");
    if (btn && form.checkValidity()) {
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Loading...`;
    }
  });
});

// window.addEventListener("beforeunload", () => {
//   document.body.style.opacity = "0.6";
//   document.body.style.pointerEvents = "none";
// });
