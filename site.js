(function () {
  const galleries = [
    {
      list: document.getElementById("tokyo-photo-list"),
      photos: typeof tokyoPhotos === "undefined" ? [] : tokyoPhotos,
      emptyTitle: "First Tokyo photographs",
      emptyText:
        "No Tokyo photographs are uploaded yet. The first images will appear here."
    },
    {
      list: document.getElementById("kyoto-photo-list"),
      photos: typeof kyotoPhotos === "undefined" ? [] : kyotoPhotos,
      emptyTitle: "First Kyoto photographs",
      emptyText:
        "No Kyoto photographs are uploaded yet. The first images will appear here."
    }
  ];

  const viewer = createViewer();

  galleries.forEach((gallery) => renderGallery(gallery));

  function renderGallery(gallery) {
    const list = gallery.list;

    if (!list) {
      return;
    }

    if (!Array.isArray(gallery.photos) || gallery.photos.length === 0) {
      const empty = document.createElement("p");
      empty.id = "first-photographs";
      empty.textContent = gallery.emptyText;
      list.appendChild(empty);
      return;
    }

    gallery.photos.forEach((photo, index) => {
      const image = document.createElement("img");
      image.src = photo.src;
      image.alt = photo.title || "Japan photograph";
      image.loading = "lazy";
      image.tabIndex = 0;
      image.addEventListener("click", () => viewer.open(gallery.photos, index));
      image.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          viewer.open(gallery.photos, index);
        }
      });
      list.appendChild(image);
    });
  }

  function createViewer() {
    let photos = [];
    let currentIndex = 0;
    let touchStartX = 0;
    let touchStartY = 0;
    let isPinching = false;

    const viewerElement = document.createElement("div");
    viewerElement.className = "photo-viewer";
    viewerElement.hidden = true;

    const controls = document.createElement("p");
    controls.className = "photo-viewer-controls";

    const previous = document.createElement("button");
    previous.type = "button";
    previous.textContent = "previous";

    const close = document.createElement("button");
    close.type = "button";
    close.textContent = "close";

    const next = document.createElement("button");
    next.type = "button";
    next.textContent = "next";

    controls.appendChild(previous);
    controls.append(" ");
    controls.appendChild(close);
    controls.append(" ");
    controls.appendChild(next);

    const image = document.createElement("img");
    image.className = "photo-viewer-image";
    image.alt = "";

    viewerElement.appendChild(controls);
    viewerElement.appendChild(image);
    document.body.appendChild(viewerElement);

    previous.addEventListener("click", () => show(currentIndex - 1));
    next.addEventListener("click", () => show(currentIndex + 1));
    close.addEventListener("click", closeViewer);
    viewerElement.addEventListener("touchstart", handleTouchStart, { passive: true });
    viewerElement.addEventListener("touchmove", handleTouchMove, { passive: true });
    viewerElement.addEventListener("touchend", handleTouchEnd);
    viewerElement.addEventListener("touchcancel", resetTouch);

    document.addEventListener("keydown", (event) => {
      if (viewerElement.hidden) {
        return;
      }

      if (event.key === "Escape") {
        closeViewer();
      }

      if (event.key === "ArrowLeft") {
        show(currentIndex - 1);
      }

      if (event.key === "ArrowRight") {
        show(currentIndex + 1);
      }
    });

    function open(nextPhotos, index) {
      photos = nextPhotos;
      currentIndex = index;
      viewerElement.hidden = false;
      document.body.classList.add("is-viewing-photo");
      show(index);
      if (viewerElement.requestFullscreen) {
        viewerElement.requestFullscreen().catch(() => {});
      }
      close.focus();
    }

    function show(index) {
      if (photos.length === 0) {
        return;
      }

      currentIndex = (index + photos.length) % photos.length;
      image.src = photos[currentIndex].src;
      image.alt = photos[currentIndex].title || "Japan photograph";
      viewerElement.scrollTop = 0;
    }

    function handleTouchStart(event) {
      if (event.touches.length !== 1) {
        isPinching = event.touches.length > 1;
        return;
      }

      isPinching = false;
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    }

    function handleTouchMove(event) {
      if (event.touches.length > 1) {
        isPinching = true;
      }
    }

    function handleTouchEnd(event) {
      if (isPinching) {
        if (event.touches.length === 0) {
          resetTouch();
        }
        return;
      }

      if (event.changedTouches.length !== 1) {
        return;
      }

      const touchEndX = event.changedTouches[0].clientX;
      const touchEndY = event.changedTouches[0].clientY;
      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) {
        return;
      }

      if (deltaX < 0) {
        show(currentIndex + 1);
      } else {
        show(currentIndex - 1);
      }
    }

    function resetTouch() {
      touchStartX = 0;
      touchStartY = 0;
      isPinching = false;
    }

    function closeViewer() {
      viewerElement.hidden = true;
      document.body.classList.remove("is-viewing-photo");
      if (document.fullscreenElement === viewerElement) {
        document.exitFullscreen().catch(() => {});
      }
    }

    return { open };
  }
})();
