import React, { Component } from 'react';
import './LineUp.css';
import Favorites from '../Favorites/Favorites';
import localForage from "localforage";
import ArtistSearch from '../ArtistSearch/ArtistSearch';
import LineUpList from '../LineUpList/LineUpList';
import Navigation from '../Navigation/Navigation';
import {
  Button,
  Header,
  Segment,
  Divider
} from 'semantic-ui-react';
import lineUpItems from '../../Resources/lineUpItems.json';

const days = ["Freitag", "Samstag"];
const stages = ["Panama Stage", "Baumann Container Stage", "Umbrella Stage", "Sparkassen Bretterbude", "Jägermeister Stage"];

class LineUp extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = {
        day: "Freitag",
        stage: "Panama Stage",
        favoritesViewIsActive: false,
        starredArtists: [],
        showSearch: false
    };
  }

  componentDidMount = () => {
    localForage.getItem('panamaStarredArtists', (err, offlineStars) => {
      if (err === null && offlineStars !== null) {
        if (!this.favoritesAreEqual(offlineStars, this.state.starredArtists)) {
          this.setState({starredArtists: offlineStars})
        }
      }
    });
  };

  setDay = (day) => this.setState({ "day": day, favoritesViewIsActive: false });

  setStage = (stage) => this.setState({ "stage": stage, favoritesViewIsActive: false });

  getLineUpItems = (day, stage) => lineUpItems.filter(lineUpItem => lineUpItem.day === day && lineUpItem.stage === stage);

  getLineUpFilteredByArtists = (artists) => lineUpItems.filter(lineUpItem => artists.includes(lineUpItem.artist));

  addStar = (artist) => this.setState(prevState => {
      const newStars = [...prevState.starredArtists, artist];
      localForage.setItem('panamaStarredArtists', newStars);
      return {starredArtists: newStars}
    }
  );

  removeStar = (removedArtist) => this.setState(prevState => {
      const newStars = prevState.starredArtists.filter(artist => artist !== removedArtist);
      localForage.setItem('panamaStarredArtists', newStars);
      return {starredArtists: newStars}
    }
  );

  starArtistHandler = (artist) => {
    this.state.starredArtists.includes(artist) ? this.removeStar(artist) : this.addStar(artist);
  };

  toggleSearch = () => this.setState(prevState => ({showSearch: !prevState.showSearch}));

  showFavorites = () => this.setState({ favoritesViewIsActive: true });

  favoritesAreEqual = (offline, online) => offline.length === online.length && online.every((element) => offline.includes(element));

  render() {
    return (
      <div className="App">
        <header>
          <Header className="heading" as='h1'>Panama Line-Up</Header><Button onClick={this.toggleSearch} className="panama-button search-btn" icon={this.state.showSearch ? 'close' : 'search'} />
          {this.state.showSearch ?
            <ArtistSearch 
              source={lineUpItems} 
              starHandler={this.starArtistHandler}
              starredArtists={this.state.starredArtists} /> : 
            ''
          }
          <Divider />
        </header>
        <main>
          <Navigation
            days={days}
            stages={stages}
            activeDay={this.state.day}
            activeStage={this.state.stage}
            changeDayHandler={this.setDay}
            changeStageHandler={this.setStage}
            favoritesViewIsActive={this.state.favoritesViewIsActive}
            showFavorites = {this.showFavorites} />
          <Segment>
            {this.state.favoritesViewIsActive ? 
              <Favorites 
                removeStarHandler={this.removeStar}
                items={this.getLineUpFilteredByArtists(this.state.starredArtists)} /> :
              <LineUpList 
                starredArtists={this.state.starredArtists}
                starArtistHandler={this.starArtistHandler}
                items={this.getLineUpItems(this.state.day, this.state.stage)} />
            }
          </Segment>
          <p>Indem du auf die Namen der Künstler klickst, gelangst du zu deren Soundcloud- oder Spotify-Seiten.</p>
        </main>
      </div>
    );
  }
}

export default LineUp;
