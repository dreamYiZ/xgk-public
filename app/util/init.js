
const loadConfig = (config) => {
  // Parse the config string back into an object
  const parsedConfig = JSON.parse(config);

  // Iterate over each key-value pair in the config object
  for (let key in parsedConfig) {
    // Store each key-value pair in localStorage
    localStorage.setItem(key, parsedConfig[key]);
  }
};

export const loadInitConfig = () => {
  fetch("config.txt")
    .then((res) => res.text())
    .then((text) => {

        loadConfig(text);

      // do something with "text"
    })
    .catch((e) => console.error(e));
};
