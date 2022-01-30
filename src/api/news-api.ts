import axios from "axios"
const NEWS_TOKEN='6c7c19e02c6073bd9ce80b6d47a8483b'
export const newsAPI = {
   getNews() {
      return axios.get(`https://gnews.io/api/v4/top-headlines?lang=en&token=${NEWS_TOKEN}`).then(res => res.data)
   },
   searchNews(searchString:String){
      return axios.get(`https://gnews.io/api/v4/search?q=${searchString}&max=50&lang=en&token=${NEWS_TOKEN}`).then(res=>res.data);
   }
}