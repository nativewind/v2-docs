# Built on Tailwind CSS

NativeWind is built upon the Tailwind CSS style language. As such the core-concepts of Tailwind CSS apply to NativeWind. Recommend you read their guides on:

- [Utility-First Fundamentals](https://tailwindcss.com/docs/utility-first)
- [Reusing Styles](https://tailwindcss.com/docs/reusing-styles)
- [Adding Custom Styles](https://tailwindcss.com/docs/adding-custom-styles)

It is also important to understand that since CSS styles are generated via the Tailwind CLI, the entire Tailwind CSS language & compiler options are available for web.

This documentation only documents whats is universally compatible, but you can always use a platform prefix to apply styles that are only support on web.

# Supporting React Native

NativeWind works in a similar manner to CSS, it can accept all classes but will only apply the styles that it support. For example, if you use `grid`, this will work on web but not on native.

Please read the [quirks](./quirks) guide for more information.
