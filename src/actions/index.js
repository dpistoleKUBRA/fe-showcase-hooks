import WidgetAPI from "../WidgetAPI";

export const loadWidgets = () => async (dispatch, getState) => {
  dispatch(loadWidgetsRequest());

  let data;

  try {
    data = await WidgetAPI.getWidgets()
    dispatch(loadWidgetsSuccess(data))
  } catch (error) {
    console.log(error);
    dispatch(loadWidgetsFailure(error))
  }

};

export const loadWidgetsRequest = () => ({
  type: 'GET_WIDGETS_REQUEST',
});

export const loadWidgetsSuccess = (data) => ({
  type: 'GET_WIDGETS_SUCCESS',
  data,
});

export const loadWidgetsFailure = (error) => ({
  type: 'GET_WIDGETS_FAILURE',
  error,
});