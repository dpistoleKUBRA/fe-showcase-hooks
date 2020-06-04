const getWidgets = () => new Promise(resolve => setTimeout(() => {
  resolve({
    "wid-1": {
      id: "wid-1",
      color: "red",
    },
    "wid-2": {
      id: "wid-2",
      color: "blue",
    },
    "wid-3": {
      id: "wid-3",
      color: "green"
    }
  });
}, 3000));

export default {
  getWidgets,
};