<p align="center">
<img src="https://github.com/c1b3rt00lk1t/press-reader-prototype/blob/demo/images/reader_icon.png?raw=true" width="20%" height="20%" >
</p>

# Press Reader

### Basic description

PWA · JAVASCRIPT · REACT · FIREBASE · NETLIFY · CYPRESS  
Frontend mobile-first PWA to distribute tagged pdf documents across an organization.

### Available demo online

A working version of the mobile/desktop app can be found <a href="https://press-reader-demo.web.app/" target="_blank">here</a>.

### Basic usage

- To run the app in local: <code>$ npm run start</code>

### Cloc stats

![cloc stats](https://github.com/c1b3rt00lk1t/press-reader-prototype/blob/demo/images/cloc_stats.png?raw=true)

### Key technical features

The app leverages on the following technical pilars:

- The app is written in <code>Javascript</code> and <code>JSX</code> using the <code>React</code> library, initially bootstraped with create-react-app.
- The state is managed combining <code>useState</code> with <code>createContext()</code> provided with a functional component that takes <code>children</code> as props and returns the <code>context.Provider</code>.
- The resulting contexts are consumed via <code>useContext</code>.
- <code>ClipboardContext</code> is used to easily extract data from the documents and being able to paste it outside the app.
- Multilanguage is implemented with <code>LanguageContext</code>.
- Side effects are handled with <code>useEffect</code>.
- The files are <code>prefetched</code> and whole sessions or selections can also be.
- <code>useRef</code> is used to target specific DOM elements across renderings.
- Firebase is used for Hosting, Database and Storage.
- The app programatically reads and writes in the Database and the Storage bucket.
- Cors is handled with a specific file <code>cors.json</code> and <code>gsutil</code> configuration.
- Advanced ES6+ features such as <code>async/await</code> and <code>destructuring</code> are applied in the app as well as functional techniques like <code>map</code>, <code>filter</code> and <code>reduce</code> to handle arrays or <code>currying</code> to build specialized functions.
- Pagination is achieved using <code>react-router-dom</code>.
- A <code>serviceWorker</code> is implemented with <code>workbox</code> with a <code>CacheFirst</code> strategy.
- The data is persisted using an <code>indexedeDB</code> implementation based on <code>Promises</code>.

### Functional description

The app allows a given set of pdfs in a group of folders to be managed in the following ways:
