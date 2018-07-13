import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Search } from 'semantic-ui-react';

const resultRenderer = ({ day, time, artist, stage }) => <p key={artist}>{day} {time} {artist} {stage}</p>

resultRenderer.propTypes = {
  day: PropTypes.string,
  artist: PropTypes.string,
  stage: PropTypes.string,
  url: PropTypes.string,
  time: PropTypes.string,
}

class ArtistSearch extends Component {

  componentWillMount() {
    this.resetComponent()
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
        results: _.filter(this.props.source, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Search
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
        results={results}
        value={value}
        resultRenderer={resultRenderer}
        {...this.props}
      />
    )
  }
}

export default ArtistSearch;