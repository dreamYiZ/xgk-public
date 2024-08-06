import * as React from 'react';
import ppplog from "ppplog";

export default function ({ box, sub }) {



  return (
    <iframe
      src={sub.src}
      width={sub.width || "100%"}
      height={sub.height || "100%"}
      style={{ border: "none" }}
      title="iframe content"
    />
  );
}
