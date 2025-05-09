# Platform Differences

NativeWind aligns CSS and React Native into a common language. However the two style engines do have their differences. These are some common differences you may encounter.

## Styling per platform

Styles can be applied selectively per platform using a platform variant. Additionally the `native` variant can be used to target all platforms except for web.

Supported platform modifiers are: `ios:`, `android:`, `web:`, `windows:`, `osx:`, `native:`.

## Explicit styles

React Native has various issues when conditionally applying styles. To prevent these issues it's best to declare all styles.

For example, instead of only applying a text color for dark mode, provide both a light and dark mode text color.

```tsx
❌ <Text className="dark:text-white-500" />
✅ <Text className="text-black dark:text-red-500" />
```

## dp vs px

React Native's default unit is density-independent pixels (dp) while the web's default is pixels (px). These two units are different, however NativeWind treats them as if they are equivalent. This can cause confusion in your theme, do you use `10` or `10px`? The general rule of theme is use `10px`, and NativeWind will fix it for you.

## Flex

React Native uses a different base flex definition to the web. Generally this can be fixed by adding `flex-1` to your classes, however you may need custom styles for more complex layouts.

## Flex Direction

React Native uses a different default `flex-direction` to the web. This can be fixed by explicitly setting a `flex-direction`.

## rem sizing

React Native's `<Text />` renders with a `fontSize: 14`, while the web's default is `16px`. For consistency, NativeWind uses an `rem` value of `16` on web and `14` on native.

## Color Opacity

For performance reasons, NativeWind renders with the `corePlugins`: `textOpacity`,`borderOpacity`, `divideOpacity` and `backgroundOpacity` disabled. Theses plugin allows colors to dynamically changed via CSS variables. Instead, the opacity is set as a static value in the `color` property.

If you require this functionality, you can enable the disabled plugins in your `tailwind.config.js` file.
