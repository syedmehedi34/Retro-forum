// get the search bar value and send the data for fetching
const searchFunction = () => {
  const searchInput = document.getElementById("search-input");
  const searchValue = searchInput.value;
  //   console.log(searchValue);

  // send the search value to the fetch functions
  fetchData(searchValue);
};

// click the search button and run the search functionalities
const clickSearch = () => {
  searchFunction();
};

// fetch  all data and fetch by query
const fetchData = async (searchValue) => {
  //   console.log(searchValue);

  // fetch now
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      searchValue ? `?category=${searchValue}` : ""
    }`
  );
  const data = await res.json();

  // now send the data to a function that will create the cards
  cardsFunction(data.posts);
  //   console.log(data.posts);
};

// create cards function
const cardsFunction = (posts) => {
  const allPostContainer = document.getElementById("all-post-container");
  allPostContainer.innerHTML = "";
  //   console.log(posts);
  posts.forEach((post) => {
    // console.log(post);

    //
    const div = document.createElement("div");
    div.classList =
      "mb-6 shadow-lg h-fit col-span-2 flex gap-6 p-10 rounded-2xl bg-[#F3F3F5]";

    div.innerHTML = `

<div class="rounded-2xl relative">
  <img class="rounded-2xl w-16 h-16 object-cover" src="${post.image}" alt="" />
  <div
    class="w-3 h-3 ${
      post.isActive ? "bg-btnActive" : "bg-btnInActive"
    } rounded-full absolute top-0 right-0 transform translate-x-[25%] -translate-y-[25%]"
  ></div>
</div>
<!--  -->
<div class="w-full">
  <div
    class="text-primary80 font-Inter font-[500] text-sm flex gap-5"
  >
    <p># ${post.category}</p>
    <p>Author : ${post.author.name}</p>
  </div>
  <h3 class="font-bold text-primary text-xl mt-3 mb-4">
    ${post.title}
  </h3>
  <p class="text-primary60 w-[90%] font-Inter">
    ${post.description}
  </p>
  <div
   class="border-t border-dashed border-[#12132D40] mt-5 mb-6"
 ></div>
 <!--  -->
 <div class="flex justify-between w-full">
   <div class="font-Inter flex items-center gap-6 ">
     <div
       class="flex items-center font-Inter text-primary60 gap-3"
     >
       <i class="fa-solid fa-message"></i>
       <p>${post.comment_count}</p>
     </div>
     <div
       class="flex items-center font-Inter text-primary60 gap-3"
     >
       <i class="fa-regular fa-eye"></i>
       <p>${post.view_count}</p>
     </div>
     <div
       class="flex items-center font-Inter text-primary60 gap-3"
     >
       <i class="fa-regular fa-clock"></i>
       <p>${post.posted_time} min</p>
     </div>
   </div>
   <div
   onclick="mainButtonClicked('${encodeURIComponent(
     JSON.stringify(post).replace(/"/g, "&quot;").replace(/'/g, "&apos;")
   )}')"
     class="w-10 h-10 flex items-center justify-center rounded-full btn text-white bg-btnActive hover:bg-btnActive min-h-fit"
   >
     <i class="text-lg fa-solid fa-envelope"></i>
   </div>
 </div>
</div>  
    
    `;
    allPostContainer.appendChild(div);
  });
};

// mail button functionalities
const mainButtonClicked = (post) => {
  //   const postObj = JSON.parse(decodeURIComponent(post));
  const postObj = JSON.parse(
    decodeURIComponent(post)
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
  );

  const readContainer = document.getElementById("read-container");
  const div = document.createElement("div");
  div.classList =
    "selected-card mb-4 shadow-md text-sm flex justify-between gap-2 bg-white p-4 rounded-[16px]";
  div.innerHTML = `
  
 <h1 class="text-primary font-semibold">
   ${postObj.title}
 </h1>
 <div class="flex items-center font-Inter text-primary60 gap-2">
   <i class="fa-regular fa-eye"></i>
   <p>${postObj.view_count}</p>
 </div>

  
  `;
  readContainer.appendChild(div);
  selectedCountFunction();
};

// title count
const selectedCountFunction = () => {
  const selectedCount = document.getElementById("selected-count");
  //   console.log(selectedCount);
  const selectedCards = document.querySelectorAll(
    "#read-container > .selected-card"
  );
  //   console.log(selectedCards.length);
  selectedCount.innerText = `(${selectedCards.length})`;
};

//*/////////////////////////////////////////////

const latestPostLoad = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const post = await res.json();
  //   console.log(post);
  latestPostAppend(post);
};

//
//
const latestPostAppend = (posts) => {
  const latestPostContainer = document.getElementById("latest-post");
  posts.forEach((post) => {
    // console.log(post);
    const div = document.createElement("div");
    div.classList = "card border border-[#12132D26] shadow-md p-6";
    div.innerHTML = `
    
  <figure class="">
    <img
      src="${post.cover_image}"
      alt=""
      class="rounded-xl object-cover"
    />
  </figure>
  <div class="">
    <div class="flex gap-3 text-primary60 items-center mt-6 mb-4">
      <i class="fa-regular fa-calendar-minus"></i>
      <p>${
        post.author.posted_date ? post.author.posted_date : "Not available"
      }</p>
    </div>
    <h2 class="text-primary text-[18px] font-extrabold">
      ${post.title}
    </h2>
    <p class="text-primary60 mt-3 mb-4">
      ${post.description}
    </p>
    <div class="flex gap-4 items-center">
      <div class="w-10 h-10 rounded-full">
        <img class="rounded-full object-cover" src="${
          post.profile_image
        }" alt="" />
      </div>
      <div class="space-y-[5px]">
        <h3 class="text-primary font-bold">${post.author.name}</h3>
        <p class="text-primary60 text-sm">${
          post.author.designation ? post.author.designation : "Not mentioned"
        }</p>
      </div>
    </div>
  </div>
         
  
    `;
    latestPostContainer.appendChild(div);
  });
};
//
//
//
// run the functions
fetchData();
selectedCountFunction();
latestPostLoad();
