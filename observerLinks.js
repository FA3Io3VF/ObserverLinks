class ObserverLinks {
  constructor(
	targetSelector, 
	imgSelector = 'img[scr-img]', 
	liClassNames = '', 
	aClassNames = '', 
	fallbackImgSrc = ''
	) 
  {
    this.targetSelector = targetSelector;
    this.imgSelector = imgSelector;
    this.liClassNames = liClassNames;
    this.aClassNames = aClassNames;
    this.lazyImages = [];
    this.targetElement = null;
    this.fallbackImg = null;
    this.fallbackImgSrc = fallbackImgSrc;

    this.renderFakeFallbackImage();
  }

  renderFakeFallbackImage() {
    this.targetElement = document.querySelector(this.targetSelector);
    if (this.fallbackImgSrc) {
      this.fallbackImg = this.createImageElement();
      this.fallbackImg.id = 'fallback';
      this.fallbackImg.src = this.fallbackImgSrc;
      this.fallbackImg.alt = '';
      this.targetElement.appendChild(this.fallbackImg);
    }
  }

  createImageElement() {
    const img = new Image();
    img.alt = '';
    return img;
  }

  addClassNames(element, classNames) {
    if (classNames) {
      classNames.split(' ').forEach(className => {
        element.classList.add(className);
      });
    }
  }

  createLinkElement(image) {
    const link = document.createElement('a');
    link.href = image.link;
    this.addClassNames(link, this.aClassNames);
    return link;
  }

  createImageElementFromLazyImage(lazyImage) {
    const img = this.createImageElement();
    img.src = lazyImage.dataset.src;
    img.onerror = () => {
      if (this.fallbackImg) {
        img.src = this.fallbackImgSrc;
      }
    };
    img.removeAttribute('scr-img');
    return img;
  }

  createListItemElement(image) {
    const li = document.createElement('li');
    this.addClassNames(li, this.liClassNames);
    return li;
  }

  renderImageElementInLink(link, image) {
    const img = this.createImageElementFromLazyImage(image);
    link.appendChild(img);
    return img;
  }

  renderLinkElementInListItem(li, link) {
    li.appendChild(link);
  }

  renderListItemInList(ul, li) {
    ul.appendChild(li);
  }

  replaceTheElementWithList(ul) {
    if (this.fallbackImg) {
      this.targetElement.replaceChild(ul, this.fallbackImg);
    } else {
      this.targetElement.appendChild(ul);
    }
  }

  renderImages(images) {
    const ul = document.createElement('ul');

    images.forEach(image => {
      const li = this.createListItemElement(image);
      const link = this.createLinkElement(image);
      const img = this.renderImageElementInLink(link, image);
      this.renderLinkElementInListItem(li, link);
      this.renderListItemInList(ul, li);
    });

    this.replaceTheElementWithList(ul);

    this.lazyImages = Array.from(document.querySelectorAll(`${this.targetSelector} ${this.imgSelector}`));
  }

  observeImages() {
    const options = {
      rootMargin: '50px 0px',
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('scr-img');
          observer.unobserve(img);
        }
      });
    }, options);

    this.lazyImages.forEach(img => observer.observe(img));
  }
}
