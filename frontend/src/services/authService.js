import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "@/firebase";

export const authService = {
  async register(email, password) {
    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    return userCredential.user;
  },

  async login(email, password) {
    const userCredential =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

    return userCredential.user;
  },

  async logout() {
    await signOut(auth);
  },
};