import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseAuth } from './config'

const provider = new GoogleAuthProvider()
export const singInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, provider)
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential?.accessToken
    // The signed-in user info.
    const { displayName, email, photoURL, uid } = result.user
    return {
      ok: true,
      displayName,
      email,
      photoURL,
      uid
    }
  } catch (error: any) {
    console.log(error, 'error')
    const errorCode = error.code
    const errorMessage = error.message
    // The email of the user's account used.
    const email = error.customData.email
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error)
    return {
      ok: false,
      msg: errorMessage
    }
  }
}
