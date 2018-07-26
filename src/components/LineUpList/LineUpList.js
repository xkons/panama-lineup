import React from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LineUpItem from '../LineUpItem/LineUpItem';

const LineUpList = (props) => (
    <List divided relaxed verticalAlign='middle' size="large">
        {props.items.map(timeSlot => (
            <LineUpItem 
            key={timeSlot.artist}
            artist={timeSlot.artist}
            starred={props.starredArtists.includes(timeSlot.artist)}
            url={timeSlot.url}
            time={timeSlot.time}
            starHandler={props.starArtistHandler} />)
        )}
    </List>
);

LineUpList.propTypes = {
    items: PropTypes.array.isRequired,
    starArtistHandler: PropTypes.func.isRequired,
    starredArtists: PropTypes.array.isRequired
};

export default LineUpList
