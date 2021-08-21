const httpCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const productColor = {
  WHITE: 'white',
  GRAY: 'gray',
  BLACK: 'black',
  SILVER: 'silver',
  GOLD: 'gold',
  BROWN: 'brown',
  RED: 'red',
  PINK: 'pink',
  ORANGE: 'orange',
  PURPLE: 'purple',
  BLUE: 'blue',
  GREEN: 'green',
  YELLOW: 'yellow',
  MULTICOLORED: 'multicolored',
};

module.exports = {
  httpCode,
  productColor,
};
