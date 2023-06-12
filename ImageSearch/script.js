 const accessKey = "mzQuluaqik4zkT_ZIAJlx2z3OTXDp6F-zUxPa6LG14w";
 
 const formEl = document.querySelector("form");
 const searchInputEl = document.getElementById("search-input");
 const searchResultsEl = document.querySelector(".search-results");
 const showMoreButton = document.getElementById("show-more-button");

 let inputData = "";
 let page = 1;

async function searchImages(){
    inputData = searchInputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if(page === 1){
        searchResultsEl.innerHTML = "";
    }
    const results = data.results;
    results.map((result)=>{
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");
        const image = document.createElement("img");
        image.setAttribute("src",`${result.urls.small}`);
        image.setAttribute("alt",`${result.alt_description}`);
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultsEl.appendChild(imageWrapper);
    });
    page++;
    if(page>1){
        showMoreButton.style.display="block";
    }
}

 formEl.addEventListener("submit",(e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
 })

 showMoreButton.addEventListener("click",()=>{
    searchImages();
 })





