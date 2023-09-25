import axios from 'axios'

export default function(context) {
	var diaryToken = context.app.context.$cookies.get('diaryToken');
	if(!diaryToken||diaryToken=='') {
		return context.redirect('/');
	}
	axios.post("http://localhost:8081/v1/api/diary/checktoken",{'token':diaryToken})
    .then(resp => {
      	var data=resp.data;
      	if(data.status=='fail') {
			return context.redirect('/');           
        } else {
        	axios.defaults.headers.diaryToken=diaryToken;
        }
    })
}