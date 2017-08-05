import Firebase from 'firebase'
import { config } from './firebaseConfig'

const firebaseApp = Firebase.initializeApp(config)

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()
