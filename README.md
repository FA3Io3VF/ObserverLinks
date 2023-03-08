# ObserverLinks
An asynchronous dynamic gallery link generator

The class handles _polymorphic_ responses with a list or JSON of objects with image 
and associated link. The code tries to automatically decide the type of response received. 


## _Constructor:_

1) The target element selector

2) The image selector to lazy load

3) A CSS classes to add to the li element and the a elemnt

4) The fallback image to use if the original image cannot be loaded

## _Methods:_

1) renderImages() which creates a list of li elements, each of which contains an image

2) observeImages() which uses the IntersectionObserver to lazy loading of images


At first run the page shows a generic fallback image instead of the actual images. 
Lazy images are loaded only when they are visible in the user's viewport, improving overall page performance 

# _Example:_

```html
<body>
  <div class="container">
    <ul id="image-list">
      <li><a href="image1.jpg" class="lazy-image" scr-img="image1.jpg"><img src="placeholder.jpg" alt=""></a></li>
      <li><a href="image2.jpg" class="lazy-image" scr-img="image2.jpg"><img src="placeholder.jpg" alt=""></a></li>
      <li><a href="image3.jpg" class="lazy-image" scr-img="image3.jpg"><img src="placeholder.jpg" alt=""></a></li>
      <li><a href="image4.jpg" class="lazy-image" scr-img="image4.jpg"><img src="placeholder.jpg" alt=""></a></li>
    </ul>
  </div>

  <script src="ObserverLinks.js"></script>
  <script>
    const ObserverLinks = new ObserverLinks('#image-list', '.lazy-image', 'image-item', 'image-link', 'fallback.jpg');
    ObserverLinks.renderImages(ObserverLinks.lazyImages);
    ObserverLinks.observeImages();
  </script>
</body>
```

## _Examples of accepted formats:_

```javascript
[
  {
    "src": "localhost:8080/images/img1.jpg",
    "link": "localhost:8080/img1"
  },
  {
    "src": "localhost:8080/images/img2.jpg",
    "link": "localhost:8080/img2"
  },
  {
    "src": "localhost:8080/images/img3.jpg",
    "link": "localhost:8080/img3"
  }
]
```

```
{
  "images": [
    {
      "src": "localhost:8080/images/img1.jpg",
      "link": "localhost:8080/img1"
    },
    {
      "src": "localhost:8080/images/img2.jpg",
      "link": "localhost:8080/img2"
    },
    {
      "src": "localhost:8080/images/img3.jpg",
      "link": "localhost:8080/img3"
    }
  ]
}
```
