// Intersection Observer für Auto Play / Pause
const videos = document.querySelectorAll(".video-container");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const iframe = entry.target.querySelector("iframe");

    if (entry.isIntersecting) {
      iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    } else {
      iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }
  });
}, { threshold: 0.6 });

videos.forEach(video => observer.observe(video));


// Double Tap Like Animation
videos.forEach(container => {
  let lastTap = 0;
  const heart = container.querySelector(".heart");
  heart.innerHTML = "❤️";

  container.addEventListener("touchend", function () {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
      heart.classList.add("active");
      setTimeout(() => heart.classList.remove("active"), 600);
    }

    lastTap = currentTime;
  });
});