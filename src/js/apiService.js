const API_KEY = '21961904-37dea9a1bda711bd2751c0404';
const BASE_URL = 'https://pixabay.com/api';


export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    
  }



  async fetchImg() {
    const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;
    return fetch(url)
      .then(response => response.json())
      .then(({ hits }) => {
        this.incrementPage();
        
        return hits;
        
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
