
 const imageContainer = document.getElementById("image-container");
 const loader = document.getElementById('loader');

 let ready = false;
 let imagesLoaded = 0;
 let totalImages = 0;


 let photosArray = [];
 let countGosIntotheAPi = 25;
 const apiKey = 'OWKbAdGTuuDyjwM2QfHIRGFGmrE5eQFFIchvM9N6rRs'

 let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${countGosIntotheAPi}`;




 const loadedImage = () => {
     imagesLoaded++;
     console.log(imagesLoaded);
     if(imagesLoaded === totalImages){
         ready = true;

         loader.hidden = true;
     }
 }

 const setAttributes = (element, attributes) => {
     for( const key in attributes){
         element.setAttribute(key, attributes[key])
     }
 }

 const displayPhotos = () => {

     imagesLoaded = 0

     totalImages = photosArray.length;

     photosArray.forEach((photo) => {
         const anchorTag = document.createElement('a');

         const image = document.createElement("img");

         setAttributes(anchorTag, {
             href: photo.links.html,
             target: "_blank"
         })

         setAttributes(image, {
             src: photo.urls.regular,
             alt: photo.alt_description,
             title: photo.alt_description
         })
         image.addEventListener('load', loadedImage);
         anchorTag.appendChild(image);
         imageContainer.appendChild(anchorTag);
     });
 }

async function getphotos(){
     try{
         const response = await fetch(apiUrl);
         photosArray = await response.json();

         displayPhotos();

     } catch(err){
         console.log(err)
     }
 }

 window.addEventListener('scroll', () => {

     if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){

         ready = false;

         getphotos()
     }
 })

 //On Load
 getphotos();
