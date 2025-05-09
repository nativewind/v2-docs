# Quirks

NativeWind aligns CSS and React Native into a common language. However the two style engines do have their differences. We refer to these differences as quirks.

## Explicit styles

React Native has various issues when conditionally applying styles. To prevent these issues it's best to declare all styles.

For example, instead of only applying a text color for dark mode, provide both a light and dark mode text color.

## dp vs px

React Native's default unit is density-independent pixels (dp) while the web's default is pixels (px). These two units are different, however NativeWind treats them as if they are equivalent. Additionally, the NativeWind's compiler requires a unit for most numeric values forcing some styles to use a `px` unit.

## Flex

React Native uses a different base flex definition to the web. This can be fixed by adding `flex-1` to your classes, which forces the platforms to align.

## Flex Direction

React Native uses a different default `flex-direction` to the web. This can be fixed by explicitly setting a `flex-direction`
