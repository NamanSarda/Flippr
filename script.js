const url =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=podcast&key=AIzaSyBUROeJVJbOGxVYmQrlUHrqt0lxA4FiNls";

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const videos = data.items;
    console.log(videos);

    const videosContainer = document.querySelector("#videos-container");

    videos.forEach((video) => {
      const videoId = video.id.videoId;
      const thumbnailUrl = video.snippet.thumbnails.high.url;
      const title = video.snippet.title;

      const videoItem = `
      <div class="card swiper-slide">
      <div class="video-item">
       <img src="${thumbnailUrl}" />
       <a href="#" id="${videoId}">${title}</a>
     </div>
     </div>
`;

      videosContainer.innerHTML += videoItem;

      const link = document.querySelectorAll(" .slide-container a");
      // console.log(link)

      link.forEach((li) => {
        console.log(li.id);
        li.addEventListener("click", () => {
          showModal(li.id);
          modal.style.display = "grid";
        });
      });
    });
  });

const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".close");

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

let player;

function showModal(id) {
  console.log(id);
  let tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";

  tag.onload = function () {
    function onYouTubeIframeAPIReady() {
      if (player) player.destroy();

      player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: `${id}`,
        playerlets: {
          playsinline: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }

    function onPlayerReady(event) {
      event.target.playVideo();
    }

    let done = false;
    function onPlayerStateChange(event) {
      if (event.data == YT.PlayerState.PLAYING && !done) {
        setTimeout(stopVideo, 6000);
        done = true;
      }
    }
    function stopVideo() {
      player.stopVideo();
    }

    onYouTubeIframeAPIReady();
  };

  let firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}
