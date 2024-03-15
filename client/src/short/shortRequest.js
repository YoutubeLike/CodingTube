import axios from "axios";

export default function ShortRequest() {
  axios.post('http://localhost:5000/api/short/short-request')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
  // return (
  //   [videosInfos.channel_id, videosInfos.title, videosInfos.description]
  // );
}


