import React, { Component } from 'react';
import Blog from './blog';
import './com.css';

class DessertBlog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desserts: []
    };
  }

  componentDidMount() {
    fetch('/desserts.json') // Adjust the path based on your project structure
      .then(response => response.json())
      .then(data => {
        this.setState({ desserts: data });
      })
      .catch(error => console.error('Error fetching the desserts data:', error));
  }

  render() {
    const { desserts } = this.state;

    return (
      <div className='dessert-blog'>
        <div className='span-row'><h1>Dessert</h1></div>
        {desserts.map((dessert, index) => (
          <Blog
            key={index}
            picture={dessert.image.desktop} 
            price={dessert.price}
            rname={dessert.category}
            name={dessert.name} 
            cl={dessert.cl}
          />
        ))}
      </div>
    );
  }
}

export default DessertBlog;
