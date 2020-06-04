import _ from "lodash";
import React from 'react';
import {
  connect,
} from "react-redux";
import PropTypes from "prop-types";

import {
  loadWidgets,
} from "../../actions";
import {
  getWidgets as getWidgetsSelector,
  getGetWidgetsStatus as getGetWidgetsStatusSelector,
} from '../../selectors'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedWidgetIds: []
    }

  }

  componentDidMount = () => {
    const {
      dispatch,
      getWidgetsStatus,
    } = this.props;

    if(getWidgetsStatus === 'EMPTY') {
      dispatch(loadWidgets());
    }

  }

  componentDidUpdate = (prevProps) => {
    const {
      getWidgetsStatus,
    } = this.props;

    if(prevProps.getWidgetsStatus === 'IN_PROGRESS' && getWidgetsStatus === 'DONE') {
      this.setState({
        isLoading: false,
      });
    }
  }

  handleWidgetClick = (widgetId) => {
    const {
      selectedWidgetIds,
    } = this.state;

    let nextSelectedWidgetIds;
    if(selectedWidgetIds.includes(widgetId)) {
      // remove if exists in array
      nextSelectedWidgetIds = _.filter(selectedWidgetIds, id => id !== widgetId);
    } else {
      // else add it
      nextSelectedWidgetIds = [ ...selectedWidgetIds, widgetId ];
    }

    this.setState({
      selectedWidgetIds: nextSelectedWidgetIds,
    })
  }

  render = () => {

    const {
      widgets,
    } = this.props;

    const {
      isLoading,
      selectedWidgetIds,
    } = this.state;

    return (
      <div className="widget-app">
        <h1>Widgets</h1>
        <h4>{isLoading ? 'Loading...' : 'Loaded.'}</h4>
        <div className="widget-container">
          {
            (Object.values(widgets).map(
              (widget) => (
                <div
                  key={widget.id}
                  className={`widget ${selectedWidgetIds.includes(widget.id) ? 'widget--selected': ''}`}
                  style={{ color: widget.color }}
                  onClick={() => this.handleWidgetClick(widget.id)}
                >
                  <p>{widget.id}</p>
                </div>
              )))
          }
        </div>
      </div>
    )
  }
}

App.propTypes = {
  widgets: PropTypes.shape({}),
  getWidgetsStatus: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

App.defaultProps = {
  widgets: {},
};


const mapStateToProps = (state) => ({
  widgets: getWidgetsSelector(state),
  getWidgetsStatus: getGetWidgetsStatusSelector(state),
})
export default connect(mapStateToProps)(App);
