function trigger(name) {
  return {
    address: "/s_new",
    args: [
      {
        type: "s",
        value: name,
      },
      {
        type: "i",
        value: -1,
      },
      {
        type: "i",
        value: 0,
      },
      {
        type: "i",
        value: 0,
      },
    ],
  };
}

export { trigger };
