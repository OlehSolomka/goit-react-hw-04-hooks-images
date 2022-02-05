const KEY = "24293217-fac742fabeea19ad0d08fc078";

function fetchImage(searchImg, page = 1) {
  return fetch(
    `https://pixabay.com/api/?q=${searchImg}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12-fac742fabeea19ad0d08fc078`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Нет картинки с тегом  ${searchImg}`));
  });
}

const api = {
  fetchImage,
};
export default api;
