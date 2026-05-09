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

  galleries.forEach((gallery) => renderGallery(gallery));

  function renderGallery(gallery) {
    const list = gallery.list;

    if (!list) {
      return;
    }

    if (!Array.isArray(gallery.photos) || gallery.photos.length === 0) {
      const title = document.createElement("dt");
      title.id = "first-photographs";
      title.textContent = gallery.emptyTitle;

      const description = document.createElement("dd");
      description.textContent = gallery.emptyText;

      list.appendChild(title);
      list.appendChild(description);
      return;
    }

    gallery.photos.forEach((photo) => {
      const title = document.createElement("dt");
      const link = document.createElement("a");
      link.href = photo.src;
      link.textContent = photo.title || "Untitled photograph";
      title.appendChild(link);

      const description = document.createElement("dd");
      const parts = [photo.place, photo.date, photo.caption].filter(Boolean);
      description.textContent = parts.join(". ");

      if (photo.thumb || photo.src) {
        const imageLink = document.createElement("a");
        imageLink.href = photo.src;

        const image = document.createElement("img");
        image.src = photo.thumb || photo.src;
        image.alt = photo.title || "Japan photograph";
        image.loading = "lazy";

        imageLink.appendChild(image);
        description.appendChild(imageLink);
      }

      list.appendChild(title);
      list.appendChild(description);
    });
  }
})();
