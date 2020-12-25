export const createItemAdded = (id, dataStruc) => {
  return (state, action) => {
    const index = state.findIndex(obj => obj[id] === action.payload[id]);
    if (index === -1) {
      const newData = {};
      for (const [key, value] of Object.entries(dataStruc)) {
        if (action.payload[value] === undefined) {
          return;
        }
        newData[key] = action.payload[value];
      }
      state.push(newData);
    }
  }
}

export const createItemDeleted = (id) => {
  return (state, action) => {
    const index = state.findIndex(obj => obj[id] === action.payload[id]);
    if (index !== -1) state.splice(index, 1);
  }
}

export const createItemsDeleted = (id) => {
  return (state, action) => {
    action.payload.forEach(row => {
      const index = state.findIndex(obj => obj[id] === row[id]);
      if (index !== -1) state.splice(index, 1);
    });
  }
}

export const createItemUpdated = (id) => {
  return (state, action) => {
    let update = state.find(obj => obj[id] === action.payload.old[id]);
    const index = state.findIndex(obj => obj[id] === action.payload.new[id]);
    if (index === -1 || action.payload.old[id] === action.payload.new[id]) {
      Object.keys(update).forEach(key => {
        update[key] = action.payload.new[key];
      })
    }
  }
}

export const createItemsUpdated = (id) => {
  return (state, action) => {
    state.forEach(obj => {
      const found = action.payload.find(o => o[id] === obj[id]);
      if (found) {
        Object.keys(obj).forEach(key => {
          obj[key] = found[key];
        })
      }
    });
  }
}