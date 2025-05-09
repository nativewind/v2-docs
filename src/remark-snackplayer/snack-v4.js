const {
  version: nativewindVersion,
} = require("../../../../packages/nativewind/package.json");
const {
  version: interopVersion,
} = require("../../../../packages/react-native-css-interop/package.json");

const expoCode = `
import { useState, useEffect, Fragment, createElement } from "react";
import RN, { Platform } from "react-native";
const { StyleSheet, cssInterop } = require("react-native-css-interop");
const jsx = require("@nativewind/jsx-runtime");
const originalJSX = require("react/jsx-runtime");

Object.assign(originalJSX, jsx);

export const View = cssInterop(RN.View, { className: "style" });
export const Text = cssInterop(RN.Text, { className: "style" });

const isOk = (response) => {
  return response.ok ? response.json() : Promise.reject(response);
};

const alreadyProcessed = new Set();
let fetchUrl = "https://nativewind.dev/api/compile";

function fetchStyle(className) {
  className = className
    .split(" ")
    .filter((c) => !alreadyProcessed.has(c))
    .join(" ");
  if (!className) return;
  fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: \`{"content":"\${className}"}\`,
  })
    .then(isOk)
    .then((body) => {
      className.split(" ").forEach((c) => alreadyProcessed.add(c));
      StyleSheet.registerCompiled(body);
    })
    .catch(() => {
      console.error("Error connecting to NativeWind snack server");
    });
}

StyleSheet.unstable_hook_onClassName(fetchStyle);

var tailwindScript;
let tailwindScriptLoaded = Platform.OS === "web" ? !!window.tailwind : true;
if (!tailwindScriptLoaded) {
  tailwindScript = document.createElement("script");
  tailwindScript.addEventListener("load", () => {
    tailwindScriptLoaded = true;
  });
  tailwindScript.id = "tailwindscript";
  tailwindScript.setAttribute("src", "https://cdn.tailwindcss.com");
  document.body.appendChild(tailwindScript);
}

export function withExpoSnack(
  Component,
  apiUrl = "https://nativewind.dev/api/compile",
) {
  fetchUrl = apiUrl;
  return function WithExpoSnackLoader() {
    const [loaded, setLoaded] = useState(tailwindScriptLoaded);
    useEffect(() => {
      return tailwindScript?.addEventListener("load", () => setLoaded(true));
    }, []);

    return tailwindScriptLoaded
      ? createElement(Component)
      : createElement(Fragment);
  };
}

`;

const parseParams = (paramString = "") => {
  const params = Object.fromEntries(new URLSearchParams(paramString));

  if (!params.platform) {
    params.platform = "web";
  }

  return params;
};

function attr(name, value) {
  return {
    type: "mdxJsxAttribute",
    name,
    value,
  };
}

async function toJsxNode(node) {
  const params = parseParams(node.meta);

  // Gather necessary Params
  const name = params.name ? decodeURIComponent(params.name) : "Example";
  const description = params.description
    ? decodeURIComponent(params.description)
    : "Example usage";
  const ext = params.ext ? decodeURIComponent(params.ext) : "js";

  if (!node.value.startsWith("import")) {
    node.value = `\n${node.value}`;
  }

  const appCode = `/** jsxImportSource @nativewind */
import { withExpoSnack } from "./expo-snack";
import { View, Text } from "react-native"
${node.value}

/*
This Snack is for demonstrative purposes only and contains code to allow NativeWind to work in this limited environment.
Please ignore:
 - any warnings about peerDependencies.
 - any flashes of unstyled content.
 - performance issues due to external compilation.
 - the use of withExpoSnack
Please see the documentation for proper setup application.
*/
export default withExpoSnack(App);`;

  const files = encodeURIComponent(
    JSON.stringify({
      [`App.${ext}`]: {
        type: "CODE",
        contents: appCode,
      },
      [`expo-snack.js`]: {
        type: "CODE",
        contents: expoCode,
      },
    }),
  );
  const platform = params.platform || "web";
  const supportedPlatforms = params.supportedPlatforms || "ios,android,web";
  const theme = params.theme || "light";
  const preview = params.preview || "true";
  const loading = params.loading || "lazy";
  const deviceAndroid = params.deviceAndroid || "pixel4";
  const deviceIos = params.deviceIos || "iphone12";
  const dependencies =
    params.dependencies ||
    `react,react-native,react-native-reanimated@~3.3.0,nativewind@${nativewindVersion},react-native-css-interop@${interopVersion}`;

  // Need help constructing this AST node?
  // Use the MDX Playground and explore what your output mdast should look like
  // https://mdxjs.com/playground/
  const jsxNode = {
    type: "mdxJsxTextElement",
    name: "div",
    attributes: [
      attr("className", "snack-player"),
      attr("data-snack-sdkversion", "49.0.0"),
      attr("data-snack-name", name),
      attr("data-snack-description", description),
      attr("data-snack-files", files),
      attr("data-snack-dependencies", dependencies),
      attr("data-snack-platform", platform),
      attr("data-snack-supported-platforms", supportedPlatforms),
      attr("data-snack-theme", theme),
      attr("data-snack-preview", preview),
      attr("data-snack-loading", loading),
      attr("data-snack-device-android", deviceAndroid),
      attr("data-snack-device-ios", deviceIos),
    ],
    children: [],
  };

  // We "replace" the current node by a JSX node
  Object.keys(node).forEach((key) => delete node[key]);
  Object.keys(jsxNode).forEach((key) => (node[key] = jsxNode[key]));
}

module.exports = toJsxNode;
