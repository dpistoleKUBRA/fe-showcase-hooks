import _ from "lodash";
import React, {
  useState,
  useEffect,
} from 'react';
import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  loadWidgets,
} from "../../actions";
import {
  getWidgets as getWidgetsSelector,
  getGetWidgetsStatus as getGetWidgetsStatusSelector,
} from '../../selectors'



const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedWidgetIds, setSelectedWidgetIds] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadWidgets());
  }, [dispatch]);

  const widgets = useSelector(getWidgetsSelector);
  const getWidgetsStatus = useSelector(getGetWidgetsStatusSelector);

  useEffect(() => {
    if(getWidgetsStatus === 'DONE') {
      setIsLoading(false);
    }
  }, [getWidgetsStatus])

  const handleWidgetClick = (widgetId) => {
    let nextSelectedWidgetIds;
    if(selectedWidgetIds.includes(widgetId)) {
      // remove if exists in array
      nextSelectedWidgetIds = _.filter(selectedWidgetIds, id => id !== widgetId);
    } else {
      // else add it
      nextSelectedWidgetIds = [ ...selectedWidgetIds, widgetId ];
    }

    setSelectedWidgetIds(nextSelectedWidgetIds);
  }

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
                onClick={() => handleWidgetClick(widget.id)}
              >
                <p>{widget.id}</p>
              </div>
            )))
        }
      </div>
    </div>
  )
};

export default App;