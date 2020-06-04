import _ from "lodash";

export const getWidgets = state => _.get(state, ['widgetsById'], {});

export const getGetWidgetsStatus = state => _.get(state, ['getWidgetsStatus'], 'EMPTY');