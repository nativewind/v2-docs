import Compatibility from "../\_compatibility.mdx"
import Usage from "../\_usage.mdx"

# Font Family

## Usage

<Usage />

React Native loads fonts slightly differently between iOS and Android. We recommend following https://github.com/jsamr/react-native-font-demo to create a consistent experience that works better with Tailwind.

### Differences on Native

React Native does not support fallback fonts. If an array of fonts are provided, NativeWind will only use the first font.

### Adding fonts to your theme

:::info

NativeWind will not load/link fonts into your app. If you have any issues with the font family or weights not rendering, please first verify it works with inline styles.

:::

```tsx title="tailwind.config.js"
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        example: ["ExampleFontFamily"],
      },
    },
  },
};
```

## Compatibility

<Compatibility
supported={[
"font-[n]",
"font-{n}",
]}
none={[
"font-sans",
"font-serif",
"font-mono",
]}
/>
