import ppplog from "ppplog";

function createSpans() {

  ppplog('createSpans');

  // Get the dimensions of the window
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // Create 100 spans
  for (let i = 0; i < 100; i++) {
    // Create a new span element
    const span = document.createElement('span');

    // Set the text content
    span.textContent = '许可已经过期';

    // Generate random x and y positions within the window
    const x = Math.random() * windowWidth;
    const y = Math.random() * windowHeight;

    // Position the span at the random x and y coordinates
    span.style.position = 'absolute';
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    span.style.zIndex = `999999999`;

    // Append the span to the body of the document
    document.body.appendChild(span);
  }
}


export default function () {

  ppplog('generateLicense2')

  setTimeout(() => {
    createSpans();
  }, 1000)

}
