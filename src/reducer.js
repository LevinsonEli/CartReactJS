export const calculateAmount = (cart) => {
  const amount = cart.reduce((prev, cur) => prev + cur.amount, 0);

  return amount < 0 ? 0 : amount;
};

export const calculateTotal = (cart) => {
  const total = Number.parseFloat(
    cart.reduce((prev, cur) => prev + cur.price * cur.amount, 0)
  ).toFixed(2);

  return total < 0 ? 0 : total;
};

const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [], total: 0, amount: 0 };
  }

  if (action.type === "DELETE") {
    const newCart = state.cart.filter((item) => item.id !== action.payload);
    const newTotal = calculateTotal(newCart);
    const newAmount = calculateAmount(newCart);

    return {
      ...state,
      cart: newCart,
      amount: newAmount,
      total: newTotal,
    };
  }

  if (action.type === "INCREASE_AMOUNT") {
    const newCart = state.cart.map((item) => {
      if (item.id === action.payload)
        return { ...item, amount: item.amount + 1 };
      else return item;
    });
    const newAmount = calculateAmount(newCart);
    const newTotal = calculateTotal(newCart);

    return {
      ...state,
      amount: newAmount,
      total: newTotal,
      cart: newCart,
    };
  }

  if (action.type === "DECREASE_AMOUNT") {
    const newCart = state.cart
      .map((item) => {
        if (item.id === action.payload)
          return { ...item, amount: item.amount <= 0 ? 0 : item.amount - 1 };
        else return item;
      })
      .filter((item) => item.amount !== 0);
    const newAmount = calculateAmount(newCart);
    const newTotal = calculateTotal(newCart);

    return {
      ...state,
      amount: newAmount,
      total: newTotal <= 0 ? 0 : newTotal,
      cart: newCart,
    };
  }

  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "DISPLAY_ITEMS") {
    return {
      ...state,
      cart: action.payload,
      total: calculateTotal(action.payload),
      amount: calculateAmount(action.payload),
      loading: false,
    };
  }

  return state;
};

export default reducer;
