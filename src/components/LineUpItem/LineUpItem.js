import React from 'react';
import { Button, Icon, List } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const LineUpItem = (props) => (
    <List.Item>
        <List.Content floated='right'>
            <Button icon onClick={() => props.starHandler(props.artist)}>
                <Icon name={props.starred ? "star" : "star outline"} />
            </Button>
        </List.Content>
        <List.Content>
            <List.Header>
                {props.day ? props.day : ''}{" "}
                {props.time}{" "}
                {props.url !== null ?
                    <a href={props.url}>{props.artist}</a> : 
                    props.artist
                }
            </List.Header>
            {props.stage ? <List.Description>{props.stage}</List.Description> : ''}
        </List.Content>
    </List.Item>
);

LineUpItem.propTypes = {
    time: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
    starred: PropTypes.bool.isRequired,
    starHandler: PropTypes.func.isRequired,
    day: PropTypes.string,
    stage: PropTypes.string,
    url: PropTypes.any, // null or string
};

LineUpItem.defaultProps = {
    day: null,
    url: null,
    stage: null
};

export default LineUpItem
