import React from 'react';
import pmAPI from '../pmAPI';
const { Provider, Consumer } = React.createContext();
class UserProvider extends React.Component {
  state = {
    loading: false,
    id: null,
    username: null,
  };

  fetchMe = async () => {
    this.setState({
      loading: true,
    });
    try {
      const res = await pmAPI.get('/me');
      this.setState({
        id: res.data.id,
        username: res.data.username,
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  join = async (username, password) => {
    try {
      await pmAPI.post('users/register', {
        username: username,
        password: password,
      });
      alert('회원가입이 완료되었습니다.');
    } catch (e) {
      if (e.response) {
        if (e.response.status >= 500) {
          alert('서버에 이상이 생겼습니다. 잠시 후에 다시 시도부탁드립니다.');
        } else if (e.response.status === 400) {
          alert('아이디가 중복되었습니다. 다시 입력부탁드립니다.');
        }
      }
    }
  };

  login = async (username, password) => {
    this.setState({
      loading: true,
    });
    try {
      const res = await pmAPI.post('/users/login', {
        username: username,
        password: password,
      });
      localStorage.setItem('token', res.data.token);
      await this.fetchMe();
      console.log('로그인됨');
    } finally {
      this.setState({
        loading: false,
      });
    }
  };

  logout = () => {
    localStorage.removeItem('token');
  };

  render() {
    const value = {
      join: this.join,
      login: this.login,
      logout: this.logout,
      username: this.username,
      password: this.password,
    };
    return <Provider value={value}>{this.props.children}</Provider>;
  }
}

export { UserProvider, Consumer as UserConsumer };