<p align="center">
<img src="https://github.com/c1b3rt00lk1t/press-reader-prototype/blob/demo/images/reader_icon.png?raw=true" width="20%" height="20%" >
</p>

# Press Reader

### Basic description

PWA · JAVASCRIPT · REACT · FIREBASE · NETLIFY · CYPRESS  
Frontend mobile-first PWA to distribute tagged pdf documents across an organization.

### Available demo online

A working version of the mobile/desktop app can be found <a href="https://press-reader-demo.web.app/" target="_blank">here</a>. Check it in your mobile device scanning the QR code:

<p align="center">
<img src="https://github.com/c1b3rt00lk1t/press-reader-prototype/blob/demo/images/qrcode_press_reader.png?raw=true" width="15%" height="15%" >
</p>

### Basic usage

- To run the app in local: <code>$ npm run start</code>
- To run the e2e test in local: <code>$ npm run cypress:open</code>

### Cloc stats

<p align="center">
<img src="https://github.com/c1b3rt00lk1t/press-reader-prototype/blob/demo/images/cloc_stats.png?raw=true" width="75%" >
</p>

### Lighthouse score

<p align="center">
<img src="https://github.com/c1b3rt00lk1t/press-reader-prototype/blob/demo/images/lighthouse_stats.png?raw=true" width="75%" >
</p>

### Key technical features

The app leverages on the following technical pillars:

- The app is written in <code>Javascript</code> and <code>JSX</code> using the <code>React</code> library, initially bootstraped with <code>create-react-app</code>.
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
- The pdfs are rendered as images using the <code>react-pdf</code> library.
- Static check with <code>eslint</code> and prop validation with <code>prop-types</code>
- End-to-end testing is done with Cypress, using <code>intercept</code> and <code>stub</code> to mock requests and function calls.
- Pdfs are downloaded from primary or secondary Firebase projects depending on the size, on the prefetch context and on the availability of the projects, in order to balance the load and remain in the free tier.

### Code coverage

A +97% of code coverage is achieved by using an E2E test strategy with Cypress. This is combined with some specific components test with Cypress as well.

<p align="center">
<img src="https://github.com/c1b3rt00lk1t/press-reader-prototype/blob/demo/images/specs_execution.png?raw=true" width="75%" >
</p>
<p align="center">
<img src="https://github.com/c1b3rt00lk1t/press-reader-prototype/blob/demo/images/current_code_coverage.png?raw=true" width="75%" >
</p>

### Functional description

The app allows a user to access a set of pdfs tagged using <a href="https://github.com/c1b3rt00lk1t/press-uploader-prototype/">Press Uploader</a>:

- The documents can be searched and filtered by session, date range, zone, sector, tag or free text with inclusive of exclusive filters.
- The result of the search is displayed in a row, the user being able to go back and forward to the list and through the pdfs.
- The display includes the tags and the pdf is rendered as an image.
- In each display, an url icon allows the user to access the source pdf.
- In each display, the basic data of the pdf (title and url) is copied to the clipboard to make it straightforward to paste this info outside the app at any point in time.
- The app or a specific pdf document can be shared via other platforms such as Telegram or Whatsapp.
- In the desktop set up, the app can work with the local files without connecting.
- In the mobile set up, the app can still work offline with the prefetched data.
- The level of prefetch can be adjusted in the Settings page.
- The language of the app can also be adjusted in the Settings page.
  <br></br>
  <br></br>

<p align="center">
<img src="https://github.com/c1b3rt00lk1t/press-reader-prototype/blob/demo/images/reader_flow.gif?raw=true" width="50%" >
</p>
