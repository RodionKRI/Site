// fetch('https://jsonplaceholder.typicode.com/posts/1')
//   .then(response => response.json())
//   .then(json => document.getElementById('root').innerHTML = (`
//   <h2>${json.title}</h2>
//   <p>${json.body}</p>
//  `));
  

//   const goodsInfo = JSON.parse(goods)

// const content = document.querySelector('.content')

// goodsInfo.forEach(element => {
//     const id = document.createElement("div")
//     const img = document.createElement('img')
//     const name = document.createElement("h2")
//     const description = document.createElement("p")
//     const price = document.createElement("p")

//     img.src = element.img;
//     name.textContent = element.name;
//     description.textContent = element.description;
//     price.textContent = element.price;

//     content.appendChild(id)
//     id.appendChild(img)
//     id.appendChild(name)
//     id.appendChild(description)
//     id.appendChild(price)
// });
fetch('https://jsonplaceholder.typicode.com/posts/')
.then(res => res.json())
.then(posts => {
  for (let post of posts) {
    showPost(post);
  }
})
.catch(err => {
  throw err;
});
function showPost(post) {
  const postWrapper = document.createElement('div');
  postWrapper.innerHTML = (`
    <h2>${post.title}</h2>
    <p>${post.body}</p>
   `);
    document.getElementById('content-left').append(postWrapper);
}

// fetch('https://jsonplaceholder.typicode.com/posts/1')
//   .then((response) => response.json())
//   .then((json) => console.log(json));


async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts');
  const data = await response.json();
  return data;
}
console.log(getData());
async function main() {
  const postsData = await getData();
  let currentPage = 1;
  let rows = 10;

  function displayList(arrData, rowPerPage, page) {
    const postsEl = document.querySelector('.posts');
    postsEl.innerHTML = "";
    page--;

    const start = rowPerPage * page;
    const end = start + rowPerPage;
    const paginatedData = arrData.slice(start, end);

    paginatedData.forEach((el) => {
      const postEl = document.createElement("div");
      postEl.classList.add("post");
      postEl.innerHTML = (`
      <h2>${el.title}</h2>
      <p>${el.body}</p>
     `);
      postsEl.appendChild(postEl);
    })
  }

  function displayPagination(arrData, rowPerPage) {
    const paginationEl = document.querySelector('.pagination');
    const pagesCount = Math.ceil(arrData.length / rowPerPage);
    const ulEl = document.createElement("ul");
    ulEl.classList.add('pagination__list');

    for (let i = 0; i < pagesCount; i++) {
      const liEl = displayPaginationBtn(i + 1);
      ulEl.appendChild(liEl)
    }
    paginationEl.appendChild(ulEl)
  }

  function displayPaginationBtn(page) {
    const liEl = document.createElement("li");
    liEl.classList.add('pagination__item')
    liEl.innerText = page

    if (currentPage == page) liEl.classList.add('pagination__item--active');

    liEl.addEventListener('click', () => {
      currentPage = page
      displayList(postsData, rows, currentPage)

      let currentItemLi = document.querySelector('li.pagination__item--active');
      currentItemLi.classList.remove('pagination__item--active');

      liEl.classList.add('pagination__item--active');
    })

    return liEl;
  }

  displayList(postsData, rows, currentPage);
  displayPagination(postsData, rows);
}

main();