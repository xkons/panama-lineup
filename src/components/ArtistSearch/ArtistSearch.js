import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { List, Search } from 'semantic-ui-react';
import LineUpItem from '../LineUpItem/LineUpItem';

// the title parameter is required by the Semantic UI Search component
const resultPreviewsRenderer = ({ day, time, artist, stage, title }) => (
  <p key={artist}>{day} {time} <b>{artist}</b><br/>{stage}</p>
);

resultPreviewsRenderer.propTypes = {
  day: PropTypes.string,
  artist: PropTypes.string,
  stage: PropTypes.string,
  url: PropTypes.string,
  time: PropTypes.string,
};

class ArtistSearch extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.searchIndex = this._intiliazeSearchIndex(props.source);
  }

  searchIndex = [];

  componentWillMount() {
    this._resetComponent()
  }

  _resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  /**
   * Adds a title attribute to each item in the index since it is required
   * for the Semantic UI search component to work properly.
   * 
   * @param {array} documents
   */
  _intiliazeSearchIndex = (documents) => {
    documents.forEach((lineUpItem, position) => {
      lineUpItem["title"] = lineUpItem.artist;
      documents[position] = lineUpItem;
    });
    return documents;
  };

  /**
   * Is called when the user selects an Item from the previewed results.
   */
  _handleResultSelect = (e, { result }) => this.setState({ value: result.artist });

  /**
   * Is called when the search input changes.
   */
  _handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this._resetComponent();

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.artist);

      this.setState({
        isLoading: false,
        results: _.filter(this.searchIndex, isMatch),
      })
    }, 300)
  };

  getLineUpForMatchingArtists = (query) => {
    return this.searchIndex.filter(lineUpDocument => lineUpDocument.artist.startsWith(query))
  };

  render() {
    const { isLoading, value, results } = this.state;
    const searchInputProps = {fluid: true};

    return (
      <Fragment>
        <Search
          loading={isLoading}
          onResultSelect={this._handleResultSelect}
          onSearchChange={_.debounce(this._handleSearchChange, 500, { leading: true })}
          results={results}
          value={value}
          selectFirstResult={true}
          input={searchInputProps}
          placeholder="Künstler suchen"
          noResultsMessage="Keine Ergebnisse"
          resultRenderer={resultPreviewsRenderer}
        />
        {value === '' ? '' :
          <List relaxed verticalAlign='middle' size="large">
            {this.getLineUpForMatchingArtists(value).map(lineUpItem =>
              <LineUpItem 
                key={lineUpItem.artist}
                artist={lineUpItem.artist}
                starred={this.props.starredArtists.includes(lineUpItem.artist)}
                url={lineUpItem.url}
                time={lineUpItem.time}
                starHandler={this.props.starHandler} 
                stage={lineUpItem.stage}
                day={lineUpItem.day} />)
            }
          </List>
        }
      </Fragment>
    )
  }
}

ArtistSearch.propTypes = {
  source: PropTypes.array.isRequired,
  starHandler: PropTypes.func.isRequired,
  starredArtists: PropTypes.array.isRequired
};

export default ArtistSearch;
