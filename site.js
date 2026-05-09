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
      const empty = document.createElement("p");
      empty.id = "first-photographs";
      empty.textContent = gallery.emptyText;
      list.appendChild(empty);
      return;
    }

    gallery.photos.forEach((photo) => {
      const image = document.createElement("img");
      image.src = photo.src;
      image.alt = photo.title || "Japan photograph";
      image.loading = "lazy";
      list.appendChild(image);
    });
  }
})();
