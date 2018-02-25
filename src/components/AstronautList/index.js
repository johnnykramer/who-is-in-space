import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class AstronautList extends Component {
  render() {
    const { astros, onSelectAstro } = this.props;
    return (
      <div>
        <h4>
          {`${astros.length} people now in space`}
        </h4>
        <ListGroup>
          {astros.map(astro => {
            return (
              <ListGroupItem key={astro.name} onClick={() => onSelectAstro(astro.name)}>
                {astro.name}
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}
