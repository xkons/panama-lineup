import React, {Fragment} from 'react';
import {
    List,
    Header
} from 'semantic-ui-react';
import LineUpItem from '../LineUpItem/LineUpItem';
import PropTypes from 'prop-types';

const Favorites = (props) => {
    if (props.items.length === 0) {
        return (<p>Keine Favoriten ausgewählt</p>)
    }
    
    const freitagFavorites = props.items
                                .filter(item => item.day === "Freitag")
                                .sort((item1, item2) => item1.time > item2.time);
    const samstagFavorites = props.items
                                .filter(item => item.day === "Samstag")
                                .sort((item1, item2) => item1.time > item2.time);

    return (
        <Fragment>
            {freitagFavorites.length ? 
                <Fragment>
                    <Header as='h2'>Freitag</Header>
                    <List divided relaxed verticalAlign='middle' size="large">
                        {freitagFavorites.map(timeSlot => (
                            <LineUpItem 
                                key={timeSlot.artist}
                                artist={timeSlot.artist}
                                starred={true}
                                url={timeSlot.url}
                                time={timeSlot.time}
                                starHandler={props.removeStarHandler}
                                stage={timeSlot.stage} />)
                            )
                        }
                    </List> 
                </Fragment>
            : '' }
            {samstagFavorites.length ? 
                <Fragment>
                    <Header as='h2'>Samstag</Header>
                    <List divided relaxed verticalAlign='middle' size="large">
                        {samstagFavorites.map(timeSlot => (
                            <LineUpItem 
                                key={timeSlot.artist}
                                artist={timeSlot.artist}
                                starred={true}
                                url={timeSlot.url}
                                time={timeSlot.time}
                                starHandler={props.removeStarHandler}
                                stage={timeSlot.stage} />)
                            )
                        }
                    </List> 
                </Fragment>
            : '' }
        </Fragment>
    )
};

Favorites.propTypes = {
    items: PropTypes.array.isRequired
};


export default Favorites
