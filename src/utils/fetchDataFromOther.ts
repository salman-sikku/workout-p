export const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd100df5cf9msh8c5a8badbbe8749p178438jsnbd19850af42a',
    'X-RapidAPI-Host': 'muscle-group-image-generator.p.rapidapi.com'
  }
};

export const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'e0aafb3b93mshaace1ad04ffcdf2p14a5c9jsn344e37bd9ad7',
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com'
    }
};

export const fetchYouTubeVideo = async (url: any, options:any)=>{
    try {
        const res = await fetch(url, options) ;
        const data = await res.json() ;

        return data
    } catch (error) {
      console.log(error)  
    }
}

// url: 'https://youtube-search-and-download.p.rapidapi.com/channel/about',
// params: {
//   id: 'UCE_M8A5yxnLfW0KghEeajjw'
// },
  