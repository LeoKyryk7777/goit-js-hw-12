export function imageTemplate(item) {
  const {
    largeImageURL,
    webformatURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = item;
  return `<li class="photo-card">
  <a class="gallery-link" href="${largeImageURL}">
    <img
      class="gallery-image"
      src="${webformatURL}"
      alt="${tags}"
    />
  </a>
  <div class="info">
        <p>Likes: <span class="likes">${likes}</span></p>
        <p>Views: <span class="views">${views}</span></p>
        <p>Comments: <span class="comments">${comments}</span></p>
        <p>Downloads: <span class="downloads">${downloads}</span></p>
      </div>
</li>`;
}

export function imagesTemplate(arr) {
  return arr.map(imageTemplate).join('');
}
