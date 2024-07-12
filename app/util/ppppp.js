import ppplog from "ppplog";

if (process.env.NODE_ENV === 'production') {
  ppplog.disableppplog();
}

export { ppplog }
