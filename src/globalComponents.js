import Vue from 'vue'
import { VueTyper } from 'vue-typer'

Vue.component(VueTyper.name || 'vue-typer', VueTyper)

// v-select component
import vSelect from 'vue-select'

// Set the components prop default to return our fresh components
// vSelect.props.components.default = () => ({
//   Deselect: {
//     render: createElement => createElement('feather-icon', {
//       props: {
//         icon: 'XIcon',
//         svgClasses: 'w-4 h-4 mt-1'
//       }
//     })
//   },
//   OpenIndicator: {
//     render: createElement => createElement('feather-icon', {
//       props: {
//         icon: 'ChevronDownIcon',
//         svgClasses: 'w-5 h-5'
//       }
//     })
//   }
// })

Vue.component(vSelect)
