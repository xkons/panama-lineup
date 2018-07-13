import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { List, Search } from 'semantic-ui-react';

const resultRenderer = ({ day, time, artist, stage, title }) => <p key={artist}>{day} {time} <b>{artist}</b><br/>{stage}</p>

resultRenderer.propTypes = {
  day: PropTypes.string,
  artist: PropTypes.string,
  stage: PropTypes.string,
  url: PropTypes.string,
  time: PropTypes.string,
}

class ArtistSearch extends Component {
  /**
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.searchIndex = this.intiliazeSearchIndex(props.source);
  }

  searchIndex = [];

  componentWillMount() {
    this.resetComponent()
  }

  intiliazeSearchIndex = (documents) => {
    documents.forEach((lineUpItem, position) => {
      lineUpItem["title"] = lineUpItem.artist;
      documents[position] = lineUpItem;
    });
    return documents;
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.artist })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.artist)

      this.setState({
        isLoading: false,
        results: _.filter(this.searchIndex, isMatch),
      })
    }, 300)
  }

  getMatches = (query) => {
    return this.searchIndex.filter(lineUpDocument => lineUpDocument.artist.startsWith(query))
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Fragment>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
          results={results}
          value={value}
          placeholder="Künstler suchen"
          resultRenderer={resultRenderer}
          {...this.props}
        />
        {this.state.value === '' ? '' :
          <List relaxed verticalAlign='middle' size="large">
            {this.getMatches(this.state.value).map(lineUpItem => 
              <List.Item key={lineUpItem.artist}>
                <List.Content>
                  <List.Header>{lineUpItem.time} {lineUpItem.url !== null ? <a href={lineUpItem.url}>{lineUpItem.artist}</a> : lineUpItem.artist}</List.Header>
                  <List.Description>{lineUpItem.stage}</List.Description>
                </List.Content>
              </List.Item>)
            }
          </List>
        }
      </Fragment>
    )
  }
}

export default ArtistSearch;