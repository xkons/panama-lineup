import React, { Fragment } from 'react';
import { Button, Divider } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Navigation = (props) => (
    <Fragment>
        <Button.Group widths='3'>
            {props.days.map(day =>
            <Button 
                key={day} 
                onClick={() => props.changeDayHandler(day)}
                active={props.activeDay === day && !props.favoritesViewIsActive}
                className="panama-button">
                {day}
            </Button>)}
            <Button 
                active={props.favoritesViewIsActive} 
                onClick={props.showFavorites} 
                className="panama-button">
                Favoriten
            </Button>
        </Button.Group>
        <Divider hidden />
        {!props.favoritesViewIsActive ? 
        <Button.Group widths='2' vertical  className="stageButtons">
            {props.stages.map(stage => (
                <Button 
                    key={stage} 
                    onClick={() => props.changeStageHandler(stage)} 
                    active={props.activeStage === stage && !props.favoritesViewIsActive}
                    className="panama-button">
                {stage}
                </Button>
            ))}
        </Button.Group> : ''}
    </Fragment>
);

Navigation.propTypes = {
    days: PropTypes.array.isRequired,
    stages: PropTypes.array.isRequired,
    activeDay: PropTypes.string.isRequired,
    activeStage: PropTypes.string.isRequired,
    favoritesViewIsActive: PropTypes.bool.isRequired,
    changeDayHandler: PropTypes.func.isRequired,
    changeStageHandler: PropTypes.func.isRequired,
    showFavorites: PropTypes.func.isRequired
};

export default Navigation
