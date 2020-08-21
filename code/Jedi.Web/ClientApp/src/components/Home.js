import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render() {
    return (
      <div className="logo-container">
        <p>
          There is no emotion, there is peace.<br />
          There is no ignorance, there is knowledge.<br />
          There is no passion, there is serenity.<br />
          There is no chaos, there is harmony.<br />
          There is no death, there is the Force.<br />
          <i>- Obi-Wan Kenobi</i>
        </p>
        <img src="./img/jedi-metal.png" height="200" alt="Jedi Symbol" />

        <p>
          <small>
            NODE_ENV: {process.env.NODE_ENV}<br />
            HOSTNAME: {process.env.HOSTNAME}</small>
        </p>
      </div>
    );
  }
}
