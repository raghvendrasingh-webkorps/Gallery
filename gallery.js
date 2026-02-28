function Gallery(gallery) {
  if (!gallery) {
    throw new Error('No gallery found!');
  }

  const images = Array.from(gallery.querySelectorAll('img'));
  const modal = document.querySelector('.modal');
  const modalImage = modal.querySelector('img');
  const modalTitle = modal.querySelector('h2');
  const modalDesc = modal.querySelector('p');
  const prevButton = modal.querySelector('.prev');
  const nextButton = modal.querySelector('.next');
  const closeButton = modal.querySelector('.close');

  let currentImage;

  function showImage(el) {
    if (!el) return;

    currentImage = el;

    modalImage.src = el.src;
    modalTitle.textContent = el.title;
    modalDesc.textContent = el.dataset.description;

    openModal();
  }

  function openModal() {
    modal.classList.add('open');

    nextButton.addEventListener('click', showNextImage);
    prevButton.addEventListener('click', showPrevImage);
    window.addEventListener('keyup', handleKeyUp);
  }

  function closeModal() {
    modal.classList.remove('open');

    nextButton.removeEventListener('click', showNextImage);
    prevButton.removeEventListener('click', showPrevImage);
    window.removeEventListener('keyup', handleKeyUp);
  }

  function showNextImage() {
    if (!currentImage) return;

    const index = images.indexOf(currentImage);
    const nextIndex = (index + 1) % images.length;

    showImage(images[nextIndex]);
  }

  function showPrevImage() {
    if (!currentImage) return;

    const index = images.indexOf(currentImage);
    const prevIndex = (index - 1 + images.length) % images.length;

    showImage(images[prevIndex]);
  }

  function handleKeyUp(e) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  }

  images.forEach((image) => {
    image.addEventListener('click', () => showImage(image));

    image.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') showImage(image);
    });
  });

  nextButton.addEventListener('click', showNextImage);
  prevButton.addEventListener('click', showPrevImage);
  closeButton.addEventListener('click', closeModal);
}

Gallery(document.querySelector('.gallery1'));
Gallery(document.querySelector('.gallery2'));
