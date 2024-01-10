import {createApp} from 'vue'
import App from './App.vue'
import './style.css';
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faGear,faPause,faXmark,faWindowMinimize,faPlay,faRotateLeft } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faGear)
library.add(faPause)
library.add(faXmark)
library.add(faWindowMinimize)
library.add(faPlay)
library.add(faRotateLeft)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
