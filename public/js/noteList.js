import showNotes from './modules/showNotes.js'
import noteSend from './modules/sendNotes.js'
import { isAuthenticated } from './modules/auth.js'
import showCategories from './modules/showCategories.js'
import showCategoriesForm from './modules/showCategoriesForm.js'
import addMenu from './modules/menu.js'

if (await isAuthenticated()) {
  addMenu()
  noteSend()
  Promise.all([showNotes(), showCategories(), showCategoriesForm()])
} else {
  window.location.href = '/signin'
}
