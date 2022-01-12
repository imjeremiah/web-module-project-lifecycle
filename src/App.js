import React from 'react';
import axios from 'axios';

import User from './components/User';

class App extends React.Component {
  state = {
    user: '',
    userInfo: {
      image: '',
      name: '',
      handle: '',
      repos: '',
      followerCount: '',
      followersUrl: ''
    },
    followers: []
  }

  componentDidMount() {
    axios.get(`https://api.github.com/users/imjeremiah`)
      .then(res => {
          this.setState({
            ...this.state,
            userInfo: {
              image: res.data.avatar_url,
              name: res.data.name,
              handle: res.data.login,
              repos: res.data.public_repos,
              followerCount: res.data.followers,
              followersUrl: res.data.followers_url
            }
          });
      })
      .catch(err => {
          console.error(err);
      })
    axios.get(`https://api.github.com/users/imjeremiah/followers`)
      .then(res => {
          this.setState({
              followers: res.data
          })
      })
      .catch(err => {
          console.error(err);
      })
  }

  handleChange = (e) => {
    this.setState({
      ...this.state,
      user: e.target.value
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.user}`)
      .then(res => {
        this.setState({
          ...this.state,
          userInfo: {
            image: res.data.avatar_url,
            name: res.data.name,
            handle: res.data.login,
            repos: res.data.public_repos,
            followerCount: res.data.followers,
            followersUrl: res.data.followers_url
          }
        });
      })
      .catch(err => {
        console.error(err);
      })
    axios.get(`https://api.github.com/users/${this.state.user}/followers`)
      .then(res => {
          this.setState({
              followers: res.data
          })
      })
      .catch(err => {
          console.error(err);
      })
    

  }

  render() {
    return (
      <div>
        <h1>GITHUB INFO</h1>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} placeholder='Github Handle'/>
          <button>Search</button>
        </form>
        <User user={this.state.user} userInfo={this.state.userInfo} followers={this.state.followers} />
      </div>
    );
  }
}

export default App;
