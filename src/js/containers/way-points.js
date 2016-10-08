let {connect} = require('react-redux');
let Actions = require('../actions');
let WayPoints = require('../components/way-points');
let AppSelector = require('../selectors/app');

const getWayPointsToShow = (state) => {
    let activeRoute = AppSelector.activeRoute(state);
    let activeWayPointsIDs = activeRoute.wayPoints;
    let wayPoints = [];

    if (activeWayPointsIDs.size === 0) {
        return [];
    } else {
        activeWayPointsIDs.forEach((wpID) => {
            let wp = state.wayPoints.find((wp) => wp.id === wpID);
            if (wp) {
                wayPoints.push(wp);
            }
        });

        return wayPoints;
    }
}

const mapStateToProps = (state) => {
    return {
        wayPoints: getWayPointsToShow(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAdd: (id) => {
            dispatch(Actions.addWayPointRequested(id))
        },
        onRemove: (id) => {
            dispatch(Actions.removeWayPointRequested(id))
        }
    }
};

const WayPointsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(WayPoints);

module.exports = WayPointsContainer;