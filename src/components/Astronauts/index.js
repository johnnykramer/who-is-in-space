import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row, Col } from 'react-bootstrap';

import AstronautList from '../AstronautList';
import AstronautDetail from '../AstronautDetail';

export default class Astronauts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      astros: [],
      selectedAstro: null,
    };
    this.getAstros();
  }
  getAstros() {
    axios
      .get('http://api.open-notify.org/astros.json')
      .then(res => {
        const astros = res.data.people;
        this.setState({
          astros: astros,
          selectedAstro: astros[0].name,
        });
      });
  }
  selectAstro(name) {
    this.setState({ selectedAstro: name });
  }
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={3}>
            <AstronautList
              astros={this.state.astros}
              onSelectAstro={this.selectAstro.bind(this)}
            />
          </Col>
          <Col xs={12} md={9}>
            <AstronautDetail astro={this.state.selectedAstro} />
          </Col>
        </Row>
      </Grid>
    );
  }
}