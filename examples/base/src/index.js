import axios from 'axios';

axios.get('/user/profile').then((res) => {
  const { data } = res;
  document.writeln(JSON.stringify(data));
  document.close();
});
