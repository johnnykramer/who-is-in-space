import React, { Component } from 'react';
import wtf from 'wtf_wikipedia';
import FA from 'react-fontawesome';
import { RiseLoader } from 'halogenium';
import { Carousel,
        Grid,
        Row,
        Col,
        Panel, 
        Well, } from 'react-bootstrap';

export default class AstronautDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAstro: null,
      astroData: null,
    };
  }
  getAstroData(name) {
    wtf.from_api(name, 'en', markup => {
      var data = wtf.parse(markup);
      this.setState({
        selectedAstro: name,
        astroData: data,
      });
    });
  }
  getImages(astroData) {
    if (astroData.images.length > 0) {
      return astroData.images;
    } else {
      return [{ url: 'http://via.placeholder.com/250?text=NO+PHOTO' }];
    }
  }
  getAstroType(astroData) {
    if (astroData.infoboxes[0].data.type) {
      return astroData.infoboxes[0].data.type.text;
    } else {
      return 'Unknown 🤷‍';
    }
  }
  getAstroNationality(astroData) {
    if (astroData.infoboxes[0].data.nationality) {
      return astroData.infoboxes[0].data.nationality.text;
    } else {
      return 'Unknown 🤷‍';
    }
  }
  getAstroOccupation(astroData) {
    if (astroData.infoboxes[0].data.occupation) {
      return astroData.infoboxes[0].data.occupation.text;
    } else if (astroData.infoboxes[0].data.previous_occupation) {
      return astroData.infoboxes[0].data.previous_occupation.text;
    } else {
      return 'Unknown 🤷‍';
    }
  }
  getAstroRank(astroData) {
    if (astroData.infoboxes[0].data.rank) {
      return astroData.infoboxes[0].data.rank.text;
    } else {
      return 'Unknown 🤷‍';
    }
  }
  getAstroMissions(astroData) {
    let missions = '';
    if (astroData.infoboxes[0].data.mission) {
      missions = astroData.infoboxes[0].data.mission.text;
    } else if (astroData.infoboxes[0].data.missions) {
      missions = astroData.infoboxes[0].data.missions.text;
    } else {
      missions = 'Unknown 🤷‍';
    }
    return missions;
  }
  getAstroEVA(astroData) {
    let eva = '';
    if (astroData.infoboxes[0].data.eva1 && astroData.infoboxes[0].data.eva2) {
      eva += `${astroData.infoboxes[0].data.eva1.text} times. Total: ${astroData.infoboxes[0].data.eva2.text}`;
    }
    return eva.length > 0 ? eva : 'Unknown 🤷‍';
  }
  getAstroIntro(astroData) {
    let text = '';
    if (astroData.sections.length > 0) {
      if (astroData.sections[0].sentences.length > 0) {
        astroData.sections[0].sentences.forEach(s => {
          text += ` ${s.text}`;
        });;
      }
    }
    return text;
  }
  render() {
    const { astro } = this.props;
    const { selectedAstro, astroData } = this.state;
    if (!astro) {
      return <RiseLoader className="text-center" color="gray" size="32px" margin="10px"/>;
    } else if (astro !== selectedAstro) {
      this.getAstroData(astro);
      return <RiseLoader className="text-center" color="gray" size="32px" margin="10px"/>;
    }
    console.log(astroData);
    return (
      <div>
        <Grid fluid>
          <Row className="show-grid">
            <Col xs={12} md={8}>
              <Panel>
                <Panel.Heading>
                  <Panel.Title componentClass="h3">
                    {astroData.infoboxes[0].data.name.text}
                  </Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  <Well>
                    <FA name="user" />
                    {` `}Nationality:{` `}
                    {this.getAstroNationality(astroData)}
                  </Well>
                  <Well>
                    <FA name="address-card" />
                    {` `}Type:{` `}
                    {this.getAstroType(astroData)}
                  </Well>
                  <Well>
                    <FA name="briefcase" />
                    {` `}Occupation:{` `}
                    {this.getAstroOccupation(astroData)}
                  </Well>
                  <Well>
                    <FA name="star" />
                    {` `}Rank:{` `}
                    {this.getAstroRank(astroData)}
                  </Well>
                  <Well>
                    <FA name="space-shuttle" />
                    {` `}Missions:{` `}
                    {this.getAstroMissions(astroData)}
                  </Well>
                  <Well>
                    <FA name="street-view" />
                    {` `}EVA:{` `}
                    {this.getAstroEVA(astroData)}
                  </Well>
                  <Well>
                    <FA name="book" />
                    {` `}Short bio:{` `}
                    <br />
                    {this.getAstroIntro(astroData)}
                  </Well>
                </Panel.Body>
              </Panel>
            </Col>
            <Col xs={12} md={4}>
              <Carousel slide={false}>
                {this.getImages(astroData).map(photo => {
                  return (
                    <Carousel.Item key={photo.url}>
                      <img
                        src={photo.url}
                        alt={astroData.infoboxes[0].data.name.text}
                        style={{ width: '350px' }}
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
