import { firebase, firestore } from "../../config/firebase";
import { IUserModel } from "../../models";

export async function createUser(
  user: Omit<IUserModel, "id">,
  password: string
) {
  const usernameValidate = await getUserByUsername(user.username);
  if (usernameValidate) {
    throw new Error("Username is exist! please create another one!");
  }
  const newUser = await firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, password)
    .then(async (userCredential) => {
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      const newData = await firestore.collection("users").add(user);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const updateDocId = await firestore
        .collection("users")
        .doc(newData.id)
        .update({ ...user, id: newData.id });
      return newData.get();
    })
    .catch((error) => {
      throw new Error(error.message);
    });
  // tra ve docId cua doc chua user
  return newUser.data() as IUserModel;
}

export async function getUserByEmail(
  email: string | null | undefined
): Promise<IUserModel | null> {
  if (email) {
    const user = await firestore
      .collection("users")
      .where("email", "==", email)
      .get();
    if (user.docs.map((item) => ({ ...item.data() }))[0]) {
      return user.docs.map((item) => ({ ...item.data() }))[0] as IUserModel;
    }
  }
  return null;
}
export async function getUserByUsername(username: string | null | undefined) {
  if (username) {
    const user = await firestore
      .collection("users")
      .where("username", "==", username)
      .get();
    return user.docs.map((item) => ({ ...item.data() }))[0];
  }
}

export async function getUserByDocId(docId: string) {
  const data = await firestore.collection("users").doc(docId).get();
  return data.data() as IUserModel;
}

// login thanh cong se tra ve user, neu fail thi bao loi
export async function login(email: string, password: string) {
  const loggedIn = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      return await getUserByEmail(userCredential.user?.email);
    })
    .catch((error) => {
      throw new Error(error.message);
    });
  return loggedIn as IUserModel;
}

export async function Logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      localStorage.removeItem("user");
      //cho nay them code set lai cai context chua user
    })
    .catch((error) => {
      // An error happened.
      console.error(error);
    });
}
