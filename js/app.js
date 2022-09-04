const loadCategoriesName = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayCategoriesName(data.data.news_category);
    }
    catch (error){
        console.log(error);
    }
}

const displayCategoriesName = categories =>{
    const categorySection = document.getElementById('category-section');
    categories.forEach(category =>{
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('fs-4', 'mt-2');
        categoryDiv.innerHTML = `
        <button onclick="loadData(${category.category_id})" class="bg-white border-0">${category.category_name}</button>
        `;
        categorySection.appendChild(categoryDiv);
        
    })
    // stop loader
    toggleSpinner(false);
    
}

const loadData = async(id) =>{
    // start loader
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    try {
        const res = await fetch(url)
        const data = await res.json();
        displayData(data.data);
    }
    catch (error){
        console.log(error);
    }
    
}
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}

const displayData = items =>{
    
    const showItems = document.getElementById('show-items');
    // showItems.textContent = '';
    items.forEach(item =>{
        const modalTitle = document.getElementById('exampleModalLabel');
        modalTitle.innerText = item.title;
        const modalDetails = document.getElementById('modal-details');
        modalDetails.innerHTML = `
        <img src="${item.image_url}" class="img-fluid rounded-start" alt="...">
        <p class="card-text">${item.details}</p>
        <p>Rating: ${item.rating.number}</p>
        <p>Badge: ${item.rating.badge}</p>
        `;

    const foundItems = document.getElementById('items-found');
    foundItems.innerText = `${items.length} Items Found
        `;
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
        <div class="card mb-3 border-0 shadow p-3 mb-5 bg-body rounded">
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${item.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.details.slice(0, 280)}...</p>
            <div class="d-flex justify-content-between align-items-center mt-5">
                <div class="d-flex gap-2 align-items-center"><img src="${item.author.img}" style="width: 50px;" class="rounded-circle"> <h4>${item.author.name ? item.author.name : 'No Data'}</h4></div>
                <div class=""><p>Views: ${item.total_view ? item.total_view : 'No Data'}</p></div>
                <div><button id="btn-explore" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Explore</button></div>
            </div>
            </div>
            </div>
        </div>
        </div>
        `;
        showItems.appendChild(itemDiv);
    })
}



loadData('8');

loadCategoriesName();