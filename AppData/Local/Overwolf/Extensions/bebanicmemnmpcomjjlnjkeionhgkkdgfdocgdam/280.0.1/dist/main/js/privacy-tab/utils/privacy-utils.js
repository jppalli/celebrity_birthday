class PrivacyUtils {
  static initScrollIntoView(name) {
    let parts = window.location.hash.split("/");
    if (!parts[2] || parts[2] !== name) {
      return;
      
    }

    setTimeout(() => {
      let section = document.getElementById(parts[2]);
      section.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }
}
