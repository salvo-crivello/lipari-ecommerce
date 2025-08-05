# Frontend guidelines

- [Frontend guidelines](#frontend-guidelines)
  - [VSCode setup :memo:](#vscode-setup-memo)
    - [Extension :electric\_plug:](#extension-electric_plug)
    - [Settings :wrench:](#settings-wrench)
  - [Project setup :triangular\_ruler:](#project-setup-triangular_ruler)
    - [Installed dependencies overview](#installed-dependencies-overview)
  - [Code structure and development :open\_file\_folder:](#code-structure-and-development-open_file_folder)
    - [Main folders structure :pushpin:](#main-folders-structure-pushpin)
    - [Svelte component structure :pushpin:](#svelte-component-structure-pushpin)
    - [How to use fetcher](#how-to-use-fetcher)
      - [General use :gear:](#general-use-gear)
        - [Usage example](#usage-example)
        - [Interface customization :wrench:](#interface-customization-wrench)
    - [General code structure :straight\_ruler:](#general-code-structure-straight_ruler)
      - [i18n :globe\_with\_meridians:](#i18n-globe_with_meridians)
      - [Early `return` :no\_entry\_sign:](#early-return-no_entry_sign)
      - [Helper functions :open\_hands:](#helper-functions-open_hands)
      - [Magic numbers :crystal\_ball:](#magic-numbers-crystal_ball)
      - [CSS Units :art:](#css-units-art)

## VSCode setup :memo:

### Extension :electric_plug:

Lis of the most useful extensions that you will need while working on our projects

- Fundamental :key:
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Code formatting consistency
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Code styles and rules
  - [Auto Complete Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag) - HTML developing tools
  - [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode) - Svelte language support
  - [HTML CSS Support](https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css) - CSS and class intellisense
  - [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) - Tailwind classes intellisense
  - [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens) - Better git integration
  - [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) - Visual rappresentation of git branches and their status
  
- Extra :sparkles:
  - [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens) - Display inline errors
  - [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost) - Display imported package size
  - [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) - Intellisense for filesystem paths
  - [Color Highlight](https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight) - Colors preview directly on the code

### Settings :wrench:

In this section, you can find all the essential settings you need to change to have the optimal developer experience.

1. Press <kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> to open the VSCode command palette
2. Search for `Preferences: Open Settings (UI)` and press <kbd>Enter</kbd>
3. In the settings search bar search for `Prettier`[^1] and change the following parameters: 
   - `Prettier: Print Width` : ~~80~~  &rarr; `120`
   - `Prettier: Single Quote`: `true`
   - `Prettier: Use Tabs`: `true`
4. In the settings search bar search for `Editor: Default formatter` and select `Prettier - Code formatter`
5. In the settings search bar search for `Editor: Format on save` and set it to `true`

[^1]: The project will probably already have a `.prettierrc` config for Prettier rules

For more advanced settings you'll need to change the values from the `JSON` settings format:

1. Press <kbd>Control</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd> to open the VSCode command palette
2. Search for `Preferences: Open User Settings (JSON)` and press <kbd>Enter</kbd>
3. Add the following lines to enable formatting in `.svelte` files

```json
"[svelte]": {
  "editor.defaultFormatter": "svelte.svelte-vscode",
  "editor.formatOnSave": true
}
```

4. Add the following lines to enable linting in `.svelte` files

```json
"eslint.validate": ["javascript", "svelte", "typescript"],
```

## Project setup :triangular_ruler:

This monorepo uses `yarn` as a package manager, to install `yarn` do the following:
  
1. Open a terminal
2. Make sure you have Node version `>= 16.10` by using

  ```bash
  node -v
  ```

3. Run

```bash
corepack enable
```

if you don't have `corepack` run

```bash
npm i --global corepack
```

4. Install the yarn `LTS` version via

```bash
corepack prepare yarn@stable --activate
```

This project template provides a monorepo startup with the 3 default following packages:

- `fe`: Host the Fronted of the project ([SvelteKit](https://kit.svelte.dev/))
- `ui`: Contain the UI library used on the project
- `fetcher`: Fully typed HTTP client
- `tailwind-config`: Single source of truth for tailwind configuration

When first cloning the project all workspaces will be identified by `@project/<package_name>`, this can be changed via the  `package.json` of each workspace.

### Installed dependencies overview

Short summary of the pre-installed dependencies (**NOT** divided by workspace):

- [Tailwindcss](https://tailwindcss.com/docs/utility-first) - CSS framework
- [clsx](https://github.com/lukeed/clsx) - Conditional classnames
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Resolve tailwind classes conflicts
- [class-variance-authority](https://cva.style/docs/api-reference) - Components variant composition library
- [dayjs](https://day.js.org/en/) - Date manipulation library
- [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n) - Internationalization library
- [Zod](https://zod.dev/) - Schema validation library
- [eslint + plugins](https://eslint.org/) - Code quality checking
- [prettier](https://prettier.io/) - Code formatting and style consistency
- [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks) - Run scripts on specific git commands

## Code structure and development :open_file_folder:

In order to keep projects and code structure consistent and maintainable we'll list some of the best practices during **SvelteKit**[^2] code development with examples of [**DO**] and [**DON'T**].
Some of these practices are also applicable to `JS/TS` in general so keep them in mind.

[^2]: SvelteKit specific practices will be noted with the :pushpin: symbol while the more generic ones will be noted by :straight_ruler: symbol

### Main folders structure :pushpin:

[**DO**] When developing a web application with SvelteKit the best way to organize the `components` and the `routes` folders in the `fe` package is the following:
  
- `routes`: Will contain just the specific [SvelteKit routing](https://kit.svelte.dev/docs/routing) files and folders such as :

  - `+layout.server.js/ts`
  - `+layout.client.js/ts`
  - `+layout.js/ts`
  - `+page.server.js/ts`
  - `+page.client.js/ts`
  - `+page.js/ts`
  - `+layout.svelte`
  - `+page.svelte`

- `components`: Will contain at least 2 sub-folders:

  - `common`: Here you will add all the sheared components that are not page specific (i.g: `ContentCard.svelte`, `Section.svelte` etc... )
  - `routes-components`: This folder will reflect the `routes` folder structure

The ideal folder structure of your project should look something like this:

```tree
.
└── src
    ├── components
    │   ├── common
    │   │   └── ...
    │   └── routes-component
    │       ├── root
    │       │   ├── RootComponent1.svelte
    │       │   ├── RootComponent2.svelte
    │       │   └── ...
    │       ├── home
    │       │   ├── HomeComponent1.svelte
    │       │   ├── HomeComponent2.svelte
    │       │   └── ...
    │       └── dashboard
    │           ├── DashboardComponent1.svelte
    │           ├── DashboardComponent2.svelte
    │           ├── ...
    │           └── [private]
    │               ├── PrivateComponent1.svelte
    │               ├── PrivateComponent2.svelte
    │               └── ...
    └── routes
        ├── +layout.ts
        ├── +layout.svelte
        ├── +page.ts
        ├── +page.svelte
        ├── home
        │   ├── +layout.ts
        │   ├── +layout.svelte
        │   ├── +page.ts
        │   └── +page.svelte  
        ├── dashboard
        │   ├── +layout.ts
        │   ├── +layout.svelte
        │   ├── +page.ts
        │   ├── +page.svelte  
        │   └── [private]
        │       ├── +layout.ts
        │       ├── +layout.svelte
        │       ├── +page.ts
        │       └── +page.svelte  
        └── ...
```

[**DO**] It is also a good practice to keep `routes-components` folders organized in different sub-folders logically sorted for example

```tree
.
└── src
    └── components
        └── routes-component
            ├── ...
            ├── home
            │   ├── table
            │   │   ├── HomeTable.svelte
            │   │   ├── TableColumn1.svelte
            │   │   ├── TableColumn2.svelte
            │   │   └── ...
            │   ├── HomeComponent1.svelte
            │   └── HomeComponent2.svelte
            └── dashboard
                ├── popups
                │   ├── DashboardPopup1.svelte
                │   ├── DashboardPopup2.svelte
                │   └── ...
                ├── DashboardComponent1.svelte
                └── DashboardComponent2.svelte
```

[**DON'T**] Never put `.svelte` files directly on:

- `components`
- `components/routes-components`
- `components/common`

```tree
.
└── src
    └── components
        ├── common
        │   ├── Component1.svelte
        │   ├── Component2.svelte
        │   └── ...
        └── routes-component
            ├── ...
            ├── ComponentA.svelte
            └── ComponentB.svelte
```

[**DO**] Always keep components inside folders (even if is just one file)

```tree
.
└── src
    └── components
        ├── common
        │   ├── popup
        │   │   └── Popup.svelte
        │   ├── toast
        │   │   └── Toast.svelte
        │   └── ...
        └── routes-component
            ├── ...
            └── home
                ├── HomeComponentA.svelte
                ├── HomeComponentB.svelte
                └── ...
```

Apply these same principles for the `ui` package to keep everything consistent.

[**DO**] Another important folder for the `fe` package is the `lib` folder which is organized as the following:

- `i18n`: This folder will contain all the Internationalization stuff
- `utils`: This folder will contain all the `JS/TS` utility functions that will be available globally on the project (i.g `formatNumber`, `sleep` etc...)
- `hooks`: This folder will store all the `use` directives developed for the project, each directive will have a different `.js/ts` file

Ideally the `lib` folder should look something like this:

```tree
.
└── src
    └── lib
        ├── i18n
        │   ├── en
        │   │   └── index.js/ts
        │   ├── it
        │   │   └── index.js/ts
        │   ├── (Other supported languages)
        │   ├── ...
        │   └── (All the i18n generated utils)
        ├── utils
        │   ├── utility1.js/ts
        │   ├── utility2.js/ts
        │   └── ...
        └── hooks
            ├── useHook1.js/ts
            ├── useHook2.js/ts
            └── ...
```

[**DO**] Always prefix `hooks` files with the word `use` to reflect the `use:` Svelte syntax

[**DON'T**] Never put files directly in the `lib` folder

[**DO**] If you need globally available constant (i.g routes string, socials links etc...) create `.js/ts` files in `lib/utils` folder and group them as you like.

The `services` folder is where all the APIs are stored, for this specific folder the structure will always be something like this:

```tree
.
└── src
    └── services
        ├── service1.js/ts
        ├── service2.js/ts
        └── ...
```

All the `serviceX` will group APIs logically (i.g `auth.js/ts` will contain authentication APIs etc...)

[**DO**] Organizing services is not always straightforward as for other files/folders so try to keep them consistent :muscle:.

[**DO**] :straight_ruler: :

- _Folders_ name should **always** be in `lower-kebab-case`
- _Components_  name should **always** be in `PascalCase`
- All the `.js/ts` files should **always** be in `camelCase`

### Svelte component structure :pushpin:

While writing a Svelte component keep in mind the following structure:

- `<script>`: Always on top of the file
- `<html>`: HTML template of your component
- `<style>`: Scoped styles for your component

[**DO**] While the `html` and the `style` can be organized as you like[^3], for the `script` there is some kind of structure to follow to keep the code readable and consistent:

[^3]: For the `html` try your best to follow [_Semantic HTML_](https://web.dev/learn/html/semantic-html/)

1. Always put the `import` statements at the top
2. If you are using `typescript` always put the `types` and the `interfaces` right under the `imports`
3. If you use the `createEventDispatcher` from `svelte` put its declaration after the `imports` or `interfaces/types` if using `typescript`
4. All the components props via the `$props()` syntax, remember to always specify a **meaningful** `default value(s)`
5. All the component internal variables and constant
6. All the `functions` that the component needs
7. Component life cycle methods such as `onMount` and `onDestroy`
8. All the reactive statements used by the component via the `$effect` syntax
9. DOM property/element bindings variables

Ideally your svelte component should look something like this:

```svelte
<!-- MyComponent.svelte -->
<script lang="ts">
  import { A } from "A";
  import { B } from "B";
  import { onMount, onDestroy, type Snippet } from 'svelte';

  type B = string | undefined;

  interface A {
    a: string;
    b: number;
  }

  interface Props {
    propA: 'Hello' | 'World' | '!';
    probB: number;
    propC: string;
    children: Snippet;
    customEventHandler: (param: string) => void;
  }

  let {
    propA = 'Hello',
    probB = 5,
    propC = $bindable(),
    children,
    customEventHandler
  }: Props = $props();

  let reactiveVariableA: number = $state(0);
  let reactiveVariableB: number = $derived(reactiveVariableA + 1);
  let internalVariable = 'World';

  const functionA = () => {};
  const functionB = () => {};

  onMount(() => {});
  onDestroy(() => {});

  $effect(() => {
    reactiveVariableA = Number(internalVariable);
  });

  let divRef;
  let windowWidth: number | undefined = $state();
</script>
```

[**DON'T**] Never put `if` statements directly in the `script`, there is 100% a better way to handle that condition

```svelte
<!-- MyComponent.svelte -->
<script lang="ts">
...

  // WRONG
  if(condition1 && condition2) {
    // DO SOME STUFF
  }

...
</script>
```

```svelte
<!-- MyComponent.svelte -->
<script lang="ts">
...

  // CORRECT
    let internalVariable = $state(checkCondition());

  onMount(() => {
    checkCondition();
  })

...
</script>
```

[**DON'T**] Never call a function directly on the `script` unless it's used for a variable initialization

```svelte
<!-- MyComponent.svelte -->
<script lang="ts">
...

  // WRONG
  doStuff()

...
</script>
```

```svelte
<!-- MyComponent.svelte -->
<script lang="ts">
...

  // CORRECT
  let variable = doStuff();

  onMount(() => {
    doOtherStuff();
  })

...
</script>
```

[**DON'T**] :exclamation: Never overuse the `$:` syntax, if you are coming from [React](https://react.dev/) you probably know how you should be careful when using the `useEffect` hook, the same is for the `$:` in Svelte, if in your component you are modifying state just with the `$:` you are probably doing something wrong.

[**DO**] To overcome the `$:` spam try to refactor your code and substitute the reactive statements with functions triggered by some event, in the long term this approach will lead to a more predictable behavior of your components.

[**DON'T**] Some times the design of a UI component differs too much between the various viewports and you could think that doing something like this could be right

```svelte
<!-- MyComponent.svelte -->
<script lang="ts">
...
  // MY COMPONENT SCRIPT
...

let innerWidth;
</script>

<svelte:window bind:innerWidth/>

<!-- MOBILE -->
{#if innerWidth <= MOBILE_BREAK_POINT}
  <!-- MOBILE DESIGN -->
{:else if innerWidth > MOBILE_BREAK_POINT && innerWidth <= TABLET_BREAK_POINT}
  <!-- TABLET DESIGN -->
{:else}
  <!-- DESKTOP DESIGN -->
{/if}
```

Even tho you can collapse `{#if}` blocks in VSCode this approach will lead to big `.svelte` files which are difficult to maintain and modify in the future.

[**DO**] To prevent this problem split your component in the following parts:

- `ComponentWrapper.svelte` : Will contain all the logic and the state of that component
- `ComponentViewport.svelte`: Will contain the `HTML` for one specific viewport and interact with the state via `props` and `events`

Because the behavior of the component should be the same even at different screen sizes we can use the `<svelte:component />` tag

```svelte
<!-- MyComponentWrapper.svelte -->
<script lang="ts">
  import MyComponentMobile from './MyComponentMobile.svelte';
  import MyComponentTablet from './MyComponentTablet.svelte';
  import MyComponentDesktop from './MyComponentDesktop.svelte';
...
  // MY COMPONENT SCRIPT
...

  let innerWidth: number = $state(0);

  const Component = $derived(
    innerWidth <= MOBILE_BREAK_POINT
      ? MyComponentMobile
      : innerWidth <= TABLET_BREAK_POINT
        ? MyComponentTablet
        : MyComponentDesktop
  );
</script>

<svelte:window bind:innerWidth/>

<Component
  {prop1}
  {prop2}
  {onevent1}
  {onevent2}
/>
```

[**DON'T**] When creating components you must avoid excessive bindings `bind:` and _prop drilling_

```svelte
<!-- MyComponent.svelte -->
<script lang="ts">
  import MyComponentChild from './MyComponentChild.svelte';
...
  // MY COMPONENT SCRIPT

  let state = 'state';
...

</script>

<MyComponentChild bind:state>

<!-- MyComponentChild.svelte -->
<script lang="ts">
  import MyComponentChildLonger from './MyComponentChildLonger.svelte';
...
  // MY COMPONENT CHILD SCRIPT

  let { state: 'state' } = $props();
...

</script>

<MyComponentChildLonger bind:state>
```

By doing so tracking who and how changed the `state` will be more complicated and will lead to more bugs as you will have more complex components.

[**DO**] To solve _prop drilling_ and excessive `bind:` you can use the context API in combination with the store API both provided by Svelte

1. State is reactive thanks to the `$state`
2. Only the components that needs to use the state will have access to it

```svelte
<!-- MyComponent.svelte -->
<script lang="ts">
  import { setContext } from 'svelte';
  import MyComponentChild from './MyComponentChild.svelte';
...
  // MY COMPONENT SCRIPT

  let state = $state('state');
  setContext('sharedState', state);
...

</script>

<MyComponentChild >

<!-- MyComponentChild.svelte -->
<script lang="ts">
  import MyComponentChildLonger from './MyComponentChildLonger.svelte';
...
  // MY COMPONENT SCRIPT
...
</script>

<MyComponentChildLonger />

<!-- MyComponentChildLonger.svelte -->
<script lang="ts">
  import { getContext } from 'svelte';
  import MyComponentChildLonger from './MyComponentChildLonger.svelte';
...
  // MY COMPONENT SCRIPT
  const state = getContext('sharedState');
...
</script>

```

### How to use fetcher

#### General use :gear:

First run the script to generate all endpoints types

```bash
yarn workspace @project/fe ot:dev
```

Remember to update the `ot:dev` script with the project specific endpoint

Then prepare you project client in the `fetcherBuilder.ts` file by adding:

1. Project BE ENDPOINT :exclamation:
2. Fetcher adapter :electric_plug:

##### Usage example

```svelte
<script lang="ts">
 import { http } from '$lib/api/fetcherBuilder';

  const handleAPI = async () => {
    const { data, error, statusCode} = await http.<METHOD>(<ENDPOINT>, <Typed args>);

    if(error) {
      // HANDLE ERROR
      return;
    }

    // DO STUFF WITH TYPED data
  }

</script>
```

##### Interface customization :wrench:

To customize the fetcher interface, i.g handling auth, JWT, cookies etc. , follow the example in the `localStorageFetcher.ts` file and update the interface as needed for the specific project.

### General code structure :straight_ruler:

#### i18n :globe_with_meridians:

Organizing the `i18n` dictionaries is always a nightmare, to keep them as tidy as possible try following these steps:

1. Group keys by routes
2. Group keys based on their location in the UI
3. Put generics words always at the end of the file

[**DO**] Even tho this approach could lead to some key repetition it guarantees a consistent structure to your dictionary

```jsonc
{
  // ROUTES
  "home": {
    "key1": "key1",
    "key2": "key2",
    ...
    // UI COMPONENT
    "table": {
      "tableKey1": "tableKey1",
      ...
    }
  },
  "login" {
    ...
    "login_popup": {
      ...
    }
  },
  // GENERIC WORDS
  "next": "Next",
  "generic_errors": {
    "something_wrong": "Something went wrong",
    "session_expired": "Session expired",
    ...
  }
  ...
}
```

#### Early `return` :no_entry_sign:

[**DON'T**] When writing functions avoid excessive `nesting` otherwise your code will be less readable and difficult to debug

```js
function myFunction() {
  // DO STUFF
  if(condition1) {
    // DO MORE STUFF

    if(condition2) {
      // MORE STUFF TO DO
    } else {
      // ELSE STUFF TO DO

      if(condition3) {
        // THIS LOOKS BAD
      }
    }
  }
}
```

[**DO**] To avoid `nesting` try to refactor your code by inverting condition and adding `return` statements

```js
function myFunction() {
  // DO STUFF

  if(!condition1) return;

  // DO MORE STUFF

  if(condition2) {

    // MORE STUFF TO DO

    return;
  }

  if(!condition3) return;

  // THIS IS MORE READABLE
}
```

#### Helper functions :open_hands:

[**DON'T**] Try to avoid long function bodies, the longer your function is the harder it will be to debug

```js
function myFunction() {
  // A LOT OF STUFF TO DO

  let myVariable;

  if(condition) {
    // MANIPULATING DATA





    myVariable = someStuff;
  } else {

    // OTHER WAY TO MANIPULATE THE DATA




    myVariable = someOtherStuff;
  }


  // CHANGING VARIABLES




  // DOING MORE STUFF




  // LAST CHECK TO DO




  // FINALLY THE RESULTS
  return results
}
```

[**DO**] Try to refactor your code by creating some helper functions (even inside the scope of the main function itself)

```js

function myFunction() {
  const helperFun = (...args) => {

    if(someCondition){
      // I'LL DO SOME STUFF
    } else {
      // I'LL DO OTHER STUFF
    }


    return result
  }

  const helperFun2 = (...args) => {
    // DO SOME CHECKS

    // CHANGE SOME STATE

    return;
  }


  let myVariable = helperFun(arg1,arg2,...);

  const results = helperFun2(myVariable,arg3,arg4,...);


  return results;
}
```

By using helper function you can spot bug more efficiently, also if you are sure that the helper function is doing what it is supposed to you can collapse its body in VSCode.

[**DO**] Remember to use **meaningful** names.

#### Magic numbers :crystal_ball:

[**DON'T**] When writing code try to avoid the use of ***magic numbers***

```js
const urlSlice = url.split('/').slice(14, 26) // BAD
```

[**DO**] If you need to use specific numbers put them in constant with a **meaningful** name

```js
const FIRST_STATIC_URL_CHAR = 14;
const LAST_STATIC_URL_CHAR = 26;

const arrSlice = url.split('/').slice(FIRST_STATIC_URL_CHAR, LAST_STATIC_URL_CHAR);
```

#### CSS Units :art:

[**DON'T**] When writing your components styles, either with CSS/SCSS or Tailiwnd, remember to **always** use _relative units_ instead of the _pixel_ unit

```css
  /* BAD */
 .myClass {
  width: 100px;
  height: 200px;
 }
```

```css
  /* GOOD */
 .myClass {
  width: 6.25rem;
  height: 12.5rem;
 }
```

[**DO**] Always convert `px` to `rem` via the formula:

$$
\begin{align}
16px : 1rem = [value]px : Xrem
\\ \Rightarrow Xrem = {[value]px * 1rem \over 16px}
\\ \Rightarrow Xrem = {[value]px \over 16px}
\end{align}
$$

In some specific cases you can use the `px` unit for example:

- Shadows
- Borders
- `1px` spacings

In general you should **always** use one unit between:

- `rem`
- `vw/vh`
- `%`
