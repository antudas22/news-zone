const loadCategoriesName = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategoriesName(data.data.news_category);
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
}

const loadData = (id) =>{
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayData(data.data));
}

const displayData = items =>{
    const showItems = document.getElementById('show-items');
    items.forEach(item =>{
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
        <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-4">
            <img src="${item.image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text">${item.details.slice(0, 280)}...</p>
            </div>
            </div>
        </div>
        </div>
        `;
        showItems.appendChild(itemDiv);
    })
}

loadData();

loadCategoriesName();