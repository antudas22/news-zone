const loadCategories = async() =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.data.news_category);
}

const displayCategories = categories =>{
    const categorySection = document.getElementById('category-section');
    categories.forEach(category =>{
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('fs-4', 'mt-2');
        categoryDiv.innerHTML = `
        <button class="bg-white border-0">${category.category_name}</button>
        `;
        categorySection.appendChild(categoryDiv);
    })
}

loadCategories()