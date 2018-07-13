import React from 'react';
import {
    List,
    Header,
    Icon,
    Button
} from 'semantic-ui-react';

const Favorites = (props) => {
    if (props.items.length === 0) {
        return (<p>Keine Favoriten ausgewählt</p>)
    }
    const freitagFavorites = props.items.filter(item => item.day === "Freitag").sort((item1, item2) => item1.time > item2.time);
    const samstagFavorites = props.items.filter(item => item.day === "Samstag").sort((item1, item2) => item1.time > item2.time);
    return (
        <div>
            {freitagFavorites.length !== 0 ? <Header as='h2'>Freitag</Header> : "" }
            <List divided relaxed verticalAlign='middle' size="large">
                {freitagFavorites.map(timeSlot => (
                    <List.Item key={timeSlot.artist}>
                        <List.Content floated='right'>
                            <Button icon onClick={() => props.removeStarHandler(timeSlot.artist)}>
                                <Icon name="trash" />
                            </Button>
                        </List.Content>
                        <List.Content>
                            <List.Header>{timeSlot.time} {timeSlot.url !== null ? <a href={timeSlot.url}>{timeSlot.artist}</a> : timeSlot.artist}</List.Header>
                            <List.Description>{timeSlot.stage}</List.Description>
                        </List.Content>
                    </List.Item>)
                    )
                }
            </List>
            {samstagFavorites.length !== 0 ? <Header as='h2'>Samstag</Header> : "" }
            <List divided relaxed verticalAlign='middle' size="large">
                {samstagFavorites.map(timeSlot => (
                    <List.Item key={timeSlot.artist}>
                        <List.Content floated='right'>
                            <Button icon onClick={() => props.removeStarHandler(timeSlot.artist)}>
                                <Icon name="trash" />
                            </Button>
                        </List.Content>
                        <List.Content>
                            <List.Header>{timeSlot.time} {timeSlot.url !== null ? <a href={timeSlot.url}>{timeSlot.artist}</a> : timeSlot.artist}</List.Header>
                            <List.Description>{timeSlot.stage}</List.Description>
                        </List.Content>
                    </List.Item>)
                    )
                }
            </List>
        </div>
    )
};

export default Favorites
