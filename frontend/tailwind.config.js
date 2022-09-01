/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

const tailwindTransforms = require('tailwindcss-transforms');
const tailwindTransitions = require('tailwindcss-transitions');

/* Helper Functions */
// IMPORTANT: if we set the html font-size to a different value update the `base` here
const pxToRem = (px, base = 16) => {
  return `${px / base}rem`;
};

/**
 * This function is very important to understand since we are using a heavily configured tailwind setup
 * The key part is to understand how the config will come out and how we can use it
 * The first param `start` is where we will start and it represents the number we will use as the key and the value in px but converted to rem
 * The second param `step` is how we will step through the `start` and `limit`.  Example a step of 4 starting a 12, 16, 20, 24, etc..
 * The third param `limit` is where we will stop stepping
 */
const buildUtilityOptions = (start = 1, step = 4, limit = 64) => {
  const values = [];
  const options = {};

  // Build values array handling start position and step
  [...Array(limit / step).keys()].forEach(value => {
    // Skip if below start
    if (start <= (value + 1) * step) {
      values.push(pxToRem((value + 1) * step));
    }
  });

  // Build options array
  values.forEach((value, key) => {
    options[key * step + start] = value;
  });

  return options;
};

/* Utility Config */
const colors = {
  transparent: 'transparent',
  black: '#000',
  white: '#FFF',
  'off-white': '#F7F7F7',
  inherit: 'inherit',
  // Grey Shades
  grey: '#828282',
  'light-grey': '#F2F2F2',
  // Theme Colors
};

const spacing = {
  0: '0',
  ...buildUtilityOptions(1, 1, 256),
};

const sizing = {
  auto: 'auto',
  ...buildUtilityOptions(1, 1, 200),
  ...buildUtilityOptions(210, 10, 1000),
};

const screens = {
  ...defaultTheme.screens,
  xxs: '420px',
  xs: '480px',
  sm: '640px',
  md: '768px',
  xmd: '992px',
  lg: '1024px',
  xl: '1200px',
  xxl: '1440px',
  xxxl: '1600px',
};

const fontFamily = {
  gelion: ['Gelion', 'sans-serif'],
};

const fontSize = {
  ...defaultTheme.fontSize,
  ...buildUtilityOptions(8, 1, 24),
  ...buildUtilityOptions(28, 4, 60),
};

const fontWeight = {
  thin: 100,
  light: 300,
  normal: 400,
  medium: 500,
  bold: 700,
  black: 900,
};

const leading = {
  ...defaultTheme.leading,
  ...fontSize,
};

const letterSpacing = {
  ...defaultTheme.letterSpacing,
  1: pxToRem(1),
  2: pxToRem(2),
  3: pxToRem(3),
  4: pxToRem(4),
};

const textColor = {
  ...colors,
};

const backgroundColor = {
  ...colors,
};

const borderWidth = {
  ...defaultTheme.borderWidth,
  0: '0',
  1: '1px',
};

const borderColor = {
  current: 'currentColor',
  ...colors,
};

const borderRadius = {
  ...defaultTheme.borderRadius,
  full: '9999px',
};

const borderStyle = {
  none: 'none',
  solid: 'solid',
};

const width = {
  ...defaultTheme.width,
  '1/2': '50%',
  '1/3': '33.33333%',
  '2/3': '66.66667%',
  '1/4': '25%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.66667%',
  '5/6': '83.33333%',
  fit: 'fit-content',
  full: '100%',
  screen: '100vw',
  1200: pxToRem(1200),
  1400: pxToRem(1400),
  1440: pxToRem(1440),
  1600: pxToRem(1600),
  1800: pxToRem(1800),
  ...sizing,
};

const height = {
  ...defaultTheme.height,
  full: '100%',
  screen: '100vh',
  '1/4': '25%',
  '1/3': '33.33%',
  '2/5': '40%',
  '1/2': '50%',
  '3/5': '60%',
  '3/4': '75%',
  ...sizing,
};

const minWidth = {
  ...defaultTheme.minWidth,
  0: '0',
  none: 'none',
  ...width,
};

const minHeight = {
  ...defaultTheme.minHeight,
  0: '0',
  none: 'none',
  ...height,
};

const maxWidth = {
  ...defaultTheme.maxHeight,
  none: 'none',
  ...width,
};

const maxHeight = {
  ...defaultTheme.maxHeight,
  none: 'none',
  ...height,
};

const padding = { ...defaultTheme.padding, ...spacing };

const negativeMargin = {
  ...defaultTheme.negativeMargin,
  ...Object.keys(spacing).forEach(key => {
    spacing[`-${key}`] = `-${spacing[key]}`;
  }),
};

const margin = {
  ...defaultTheme.margin,
  auto: 'auto',
  '-1/10': '-10%',
  ...spacing,
  ...negativeMargin,
};

const boxShadow = {
  ...defaultTheme.boxShadow,
  bottom: '',
  card: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  panel: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  pop: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
  outline: '0 0 3px rgba(0,0,0,0.2)',
  none: 'none',
};

const negativeInset = {
  ...defaultTheme.negativeInset,
  ...Object.keys(spacing).forEach(key => {
    spacing[`-${key}`] = `-${spacing[key]}`;
  }),
};

const inset = {
  ...defaultTheme.inset,
  auto: 'auto',
  0: '0',
  '-1': pxToRem(-1),
  '-48': pxToRem(-48),
  ...spacing,
  ...negativeInset,
};

const zIndex = {
  ...defaultTheme.zIndex,
  auto: 'auto',
  '-1': '-1',
  0: 0,
  1: '1',
  100: '100',
};

const opacity = {
  ...defaultTheme.opacity,
  0: '0',
  10: '0.10',
  25: '0.25',
  30: '30',
  40: '40',
  50: '0.5',
  60: '60',
  70: '70',
  75: '0.75',
  80: '80',
  90: '90',
  100: '1',
};

const outline = {
  none: 'none',
  ...colors,
};

const fill = {
  current: 'currentColor',
  ...colors,
};

const stroke = {
  current: 'currentColor',
  ...colors,
};

const transform = {
  none: 'none',
};

const translate = {
  center: ['-50%', '-50%'],
};

const scale = {
  102: '1.02',
  105: '1.05',
  110: '1.1',
};

const flex = {
  1: 1,
  2: 2,
  3: 3,
  none: 'none',
};

const allVariants = [
  'responsive',
  'group-hover',
  'focus-within',
  'first',
  'last',
  'odd',
  'even',
  'hover',
  'focus',
  'active',
  'visited',
  'disabled',
];

module.exports = {
  prefix: '', // only edit if you absolutely must
  important: false, // not recommended to use important
  separator: ':', // for variants
  mode: 'jit', // just-in-time Compiler
  media: false, // or 'darkMode' or 'class'
  content: ['./src/**/*.{js,jsx,ts,tsx}'],

  /**
   * --------------------------------------------------------------------------
   * Theme Configuration                https://tailwindcss.com/docs/theme/#app
   * --------------------------------------------------------------------------
   *
   * Theme is where you define your project's color palette, type scale, font
   * stacks, breakpoints, border radius values, and more.
   *
   */

  theme: {
    screens,
    fontSize,
    letterSpacing,
    borderWidth,
    borderRadius,
    width,
    height,
    minWidth,
    minHeight,
    maxWidth,
    maxHeight,
    margin,
    leading,
    negativeMargin,
    padding,
    boxShadow,
    negativeInset,
    inset,
    zIndex,
    opacity,

    extend: {
      backgroundColor,
      borderColor,
      borderStyle,
      colors,
      fill,
      flex,
      fontFamily,
      fontWeight,
      outline,
      scale,
      stroke,
      textColor,
      transform,
      translate,
    },
  },

  /**
   * ---------------------------------------------------------------------------
   * Core Plugins       https://tailwindcss.com/docs/configuration/#core-plugins
   * ---------------------------------------------------------------------------
   *
   * This section lets you completely disable classes that Tailwind would
   * normally generate by default if you don't need them for your project.
   *
   * If you'd like to disable a specific core plugin, add the core plugin name
   * as the key and set the value false.  All core plugins are default set to
   * true and will be enabled.
   *
   */

  corePlugins: {
    float: false,
    preflight: false, // disable tailwind's css reset.
  },

  /**
   * ----------------------------------------------------------------------------
   * Variants                   https://tailwindcss.com/docs/configuring-variants
   * ----------------------------------------------------------------------------
   *
   * This is here you control which core utility plugins should have responsive
   * variants and pseudo-class variants generated.
   *
   * NOTE: Setting variants will override the default. (i.e. provide all desired)
   *
   * Available variants (recommended to write in order listed below):
   *   - responsive
   *   - group-hover
   *   - focus-within
   *   - first
   *   - last
   *   - odd
   *   - even
   *   - hover
   *   - focus
   *   - active
   *   - visited
   *   - disabled
   *
   */

  variants: {
    backgroundColor: allVariants,
    borderColor: allVariants,
    borderRadius: allVariants,
    borderWidth: allVariants,
    boxShadow: allVariants,
    display: allVariants,
    fill: allVariants,
    flex: allVariants,
    flexbox: allVariants,
    flexDirection: allVariants,
    flexGrow: allVariants,
    flexShrink: allVariants,
    flexWrap: allVariants,
    fontFamily: allVariants,
    fontSize: allVariants,
    fontWeight: allVariants,
    height: allVariants,
    inset: allVariants,
    leading: allVariants,
    margin: allVariants,
    maxHeight: allVariants,
    maxWidth: allVariants,
    minHeight: allVariants,
    minWidth: allVariants,
    opacity: allVariants,
    outline: allVariants,
    overflow: allVariants,
    padding: allVariants,
    position: allVariants,
    scale: allVariants,
    stroke: allVariants,
    textAlign: allVariants,
    textColor: allVariants,
    transform: allVariants,
    translate: allVariants,
    transitionProperty: allVariants,
    transitionDuration: allVariants,
    transitionTimingFunction: allVariants,
    transitionDelay: allVariants,
    visibility: allVariants,
    whitespace: allVariants,
    width: allVariants,
    zIndex: allVariants,
  },

  /**
   * ----------------------------------------------------------------------------
   * Plugins                  https://tailwindcss.com/docs/configuration/#plugins
   * ----------------------------------------------------------------------------
   *
   * The plugins section allows you to register third-party plugins with Tailwind
   * that can be used to generate extra utilities, components, base styles, or
   * custom variants.
   *
   */

  plugins: [
    tailwindTransforms({
      // https://github.com/benface/tailwindcss-transforms
      '3d': false,
      backfaceVisibility: false,
      perspective: false,
      perspectiveOrigin: false,
      rotate: false,
      skew: false,
      transformBox: false,
      transformOrigin: false,
      transformStyle: false,
    }),
    tailwindTransitions(), // https://github.com/benface/tailwindcss-transitions
  ],
};
