import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.storage = app.storage();
    this.db = app.firestore();
    this.auth = app.auth();
  }

  // AUTH ACTIONS ------------

  createAccount = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signIn = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signInWithGoogle = () =>
    this.auth.signInWithPopup(new app.auth.GoogleAuthProvider());

  signInWithFacebook = () =>
    this.auth.signInWithPopup(new app.auth.FacebookAuthProvider());

  signInWithGithub = () =>
    this.auth.signInWithPopup(new app.auth.GithubAuthProvider());

  signOut = () => this.auth.signOut();

  passwordReset = (email) => this.auth.sendPasswordResetEmail(email);

  addUser = (id, user) => this.db.collection("users").doc(id).set(user);

  getUser = (id) => this.db.collection("users").doc(id).get();

  getSetting = (id) => this.db.collection("settings").doc(id).get();

  // get Settings Reference

  docRef = () => this.db.collection("settings").doc("arXIqODlOosmcD38UHhW").get();

  docRef1 = () => this.db.collection("ingredients").doc("VD1F3HkgV9dfWrNyu8ut").get();

  updateSetting = (arXIqODlOosmcD38UHhW, updates) =>
    this.db.collection("settings").doc("arXIqODlOosmcD38UHhW").update(updates);

  // need build new document
  updateIngredient = (VD1F3HkgV9dfWrNyu8ut, updates) =>
    this.db.collection("ingredients").doc("VD1F3HkgV9dfWrNyu8ut").update(updates);

  passwordUpdate = (password) => this.auth.currentUser.updatePassword(password);

  changePassword = (currentPassword, newPassword) =>
    new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = this.auth.currentUser;
          user
            .updatePassword(newPassword)
            .then(() => {
              resolve("Password updated successfully!");
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });

  reauthenticate = (currentPassword) => {
    const user = this.auth.currentUser;
    const cred = app.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    return user.reauthenticateWithCredential(cred);
  };

  updateEmail = (currentPassword, newEmail) =>
    new Promise((resolve, reject) => {
      this.reauthenticate(currentPassword)
        .then(() => {
          const user = this.auth.currentUser;
          user
            .updateEmail(newEmail)
            .then(() => {
              resolve("Email Successfully updated");
            })
            .catch((error) => reject(error));
        })
        .catch((error) => reject(error));
    });

  updateProfile = (id, updates) =>
    this.db.collection("users").doc(id).update(updates);

  onAuthStateChanged = () =>
    new Promise((resolve, reject) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject(new Error("Auth State Changed failed"));
        }
      });
    });

  saveBasketItems = (items, userId) =>
    this.db.collection("users").doc(userId).update({ basket: items });

  clearBasket = (basket, userId) =>
    this.db.collection("users").doc(userId).delete({ basket });



  setAuthPersistence = () =>
    this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);

  // // PRODUCT ACTIONS --------------

  getSingleProduct = (id) => this.db.collection("products").doc(id).get();

  getProducts = (lastRefKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const query = this.db
              .collection("products")
              .orderBy(app.firestore.FieldPath.documentId())
              .startAfter(lastRefKey)
              .limit(12);

            const snapshot = await query.get();
            const products = [];
            snapshot.forEach((doc) =>
              products.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ products, lastKey });
          } catch (e) {
            reject(e?.message || ":( Failed to fetch products.");
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error("Request timeout, please try again"));
          }, 15000);

          try {
            const totalQuery = await this.db.collection("products").get();
            const total = totalQuery.docs.length;
            const query = this.db
              .collection("products")
              .orderBy(app.firestore.FieldPath.documentId())
              .limit(12);
            const snapshot = await query.get();

            clearTimeout(timeout);
            if (!didTimeout) {
              const products = [];
              snapshot.forEach((doc) =>
                products.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ products, lastKey, total });
            }
          } catch (e) {
            if (didTimeout) return;
            reject(e?.message || ":( Failed to fetch products.");
          }
        }
      })();
    });
  };

  searchProducts = (searchKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        const productsRef = this.db.collection("products");

        const timeout = setTimeout(() => {
          didTimeout = true;
          reject(new Error("Request timeout, please try again"));
        }, 15000);

        try {
          const searchedNameRef = productsRef
            .orderBy("name_lower")
            .where("name_lower", ">=", searchKey)
            .where("name_lower", "<=", `${searchKey}\uf8ff`)
            .limit(12);
          const searchedKeywordsRef = productsRef
            .orderBy("dateAdded", "desc")
            .where("keywords", "array-contains-any", searchKey.split(" "))
            .limit(12);

          const nameSnaps = await searchedNameRef.get();
          const keywordsSnaps = await searchedKeywordsRef.get();

          clearTimeout(timeout);
          if (!didTimeout) {
            const searchedNameProducts = [];
            const searchedKeywordsProducts = [];
            let lastKey = null;

            if (!nameSnaps.empty) {
              nameSnaps.forEach((doc) => {
                searchedNameProducts.push({ id: doc.id, ...doc.data() });
              });
              lastKey = nameSnaps.docs[nameSnaps.docs.length - 1];
            }

            if (!keywordsSnaps.empty) {
              keywordsSnaps.forEach((doc) => {
                searchedKeywordsProducts.push({ id: doc.id, ...doc.data() });
              });
            }

            // MERGE PRODUCTS
            const mergedProducts = [
              ...searchedNameProducts,
              ...searchedKeywordsProducts,
            ];
            const hash = {};

            mergedProducts.forEach((product) => {
              hash[product.id] = product;
            });

            resolve({ products: Object.values(hash), lastKey });
          }
        } catch (e) {
          if (didTimeout) return;
          reject(e);
        }
      })();
    });
  };

  getFeaturedProducts = (itemsCount = 12) =>
    this.db
      .collection("products")
      .where("isFeatured", "==", true)
      .limit(itemsCount)
      .get();

  getRecommendedProducts = (itemsCount = 12) =>
    this.db
      .collection("products")
      .where("isRecommended", "==", true)
      .limit(itemsCount)
      .get();

  addProduct = (id, product) =>
    this.db.collection("products").doc(id).set(product);

  generateKey = () => this.db.collection("products").doc().id;

  storeImage = async (id, folder, imageFile) => {
    const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
  };

  deleteImage = (id) => this.storage.ref("products").child(id).delete();

  editProduct = (id, updates) =>
    this.db.collection("products").doc(id).update(updates);

  removeProduct = (id) => this.db.collection("products").doc(id).delete();

  // // SETTING ACTIONS --------------

  getSingleSetting = (id) => this.db.collection("settings").doc(id).get();

  getSettings = (lastRefKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const query = this.db
              .collection("settings")
              .orderBy(app.firestore.FieldPath.documentId())
              .startAfter(lastRefKey)
              .limit(12);

            const snapshot = await query.get();
            const settings = [];
            snapshot.forEach((doc) =>
              settings.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ settings, lastKey });
          } catch (e) {
            reject(e?.message || ":( Failed to fetch settings.");
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error("Request timeout, please try again"));
          }, 15000);

          try {
            const totalQuery = await this.db.collection("settings").get();
            const total = totalQuery.docs.length;
            const query = this.db
              .collection("settings")
              .orderBy(app.firestore.FieldPath.documentId())
              .limit(12);
            const snapshot = await query.get();

            clearTimeout(timeout);
            if (!didTimeout) {
              const settings = [];
              snapshot.forEach((doc) =>
                settings.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ settings, lastKey, total });
            }
          } catch (e) {
            if (didTimeout) return;
            reject(e?.message || ":( Failed to fetch settings.");
          }
        }
      })();
    });
  };

  searchSettings = (searchKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        const settingsRef = this.db.collection("settings");

        const timeout = setTimeout(() => {
          didTimeout = true;
          reject(new Error("Request timeout, please try again"));
        }, 15000);

        try {
          const searchedNameRef = settingsRef
            .orderBy("name_lower")
            .where("name_lower", ">=", searchKey)
            .where("name_lower", "<=", `${searchKey}\uf8ff`)
            .limit(12);
          const searchedKeywordsRef = settingsRef
            .orderBy("dateAdded", "desc")
            .where("keywords", "array-contains-any", searchKey.split(" "))
            .limit(12);

          const nameSnaps = await searchedNameRef.get();
          const keywordsSnaps = await searchedKeywordsRef.get();

          clearTimeout(timeout);
          if (!didTimeout) {
            const searchedNameSettings = [];
            const searchedKeywordsSettings = [];
            let lastKey = null;

            if (!nameSnaps.empty) {
              nameSnaps.forEach((doc) => {
                searchedNameSettings.push({ id: doc.id, ...doc.data() });
              });
              lastKey = nameSnaps.docs[nameSnaps.docs.length - 1];
            }

            if (!keywordsSnaps.empty) {
              keywordsSnaps.forEach((doc) => {
                searchedKeywordsSettings.push({ id: doc.id, ...doc.data() });
              });
            }

            // MERGE PRODUCTS
            const mergedSettings = [
              ...searchedNameSettings,
              ...searchedKeywordsSettings,
            ];
            const hash = {};

            mergedSettings.forEach((setting) => {
              hash[setting.id] = setting;
            });

            resolve({ settings: Object.values(hash), lastKey });
          }
        } catch (e) {
          if (didTimeout) return;
          reject(e);
        }
      })();
    });
  };

  getFeaturedSettings = (itemsCount = 12) =>
    this.db
      .collection("Settings")
      .where("isFeatured", "==", true)
      .limit(itemsCount)
      .get();

  getRecommendedSettings = (itemsCount = 12) =>
    this.db
      .collection("settings")
      .where("isRecommended", "==", true)
      .limit(itemsCount)
      .get();

  generateKey = () => this.db.collection("settings").doc().id;

  storeImage = async (id, folder, imageFile) => {
    const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
  };

  deleteImage = (id) => this.storage.ref("settings").child(id).delete();

  editSetting = (id, updates) =>
    this.db.collection("settings").doc(id).update(updates);

  removeSetting = (id) => this.db.collection("settings").doc(id).delete();

  // // ORDER ACTIONS --------------

  getSingleOrder = (id) => this.db.collection("orders").doc(id).get();

  getOrders = (lastRefKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const query = this.db
              .collection("orders")
              .orderBy(app.firestore.FieldPath.documentId())
              .startAfter(lastRefKey)
              .limit(12);

            const snapshot = await query.get();
            const orders = [];
            snapshot.forEach((doc) =>
              orders.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ orders, lastKey });
          } catch (e) {
            reject(e?.message || ":( Failed to fetch orders.");
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error("Request timeout, please try again"));
          }, 15000);

          try {
            const totalQuery = await this.db.collection("orders").get();
            const total = totalQuery.docs.length;
            const query = this.db
              .collection("orders")
              .orderBy(app.firestore.FieldPath.documentId())
              .limit(12);
            const snapshot = await query.get();

            clearTimeout(timeout);
            if (!didTimeout) {
              const orders = [];
              snapshot.forEach((doc) =>
                orders.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ orders, lastKey, total });
            }
          } catch (e) {
            if (didTimeout) return;
            reject(e?.message || ":( Failed to fetch orders.");
          }
        }
      })();
    });
  };

  searchOrders = (searchKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        const ordersRef = this.db.collection("orders");

        const timeout = setTimeout(() => {
          didTimeout = true;
          reject(new Error("Request timeout, please try again"));
        }, 15000);

        try {
          const searchedNameRef = ordersRef
            .orderBy("name_lower")
            .where("name_lower", ">=", searchKey)
            .where("name_lower", "<=", `${searchKey}\uf8ff`)
            .limit(12);
          const searchedKeywordsRef = ordersRef
            .orderBy("dateAdded", "desc")
            .where("keywords", "array-contains-any", searchKey.split(" "))
            .limit(12);

          const nameSnaps = await searchedNameRef.get();
          const keywordsSnaps = await searchedKeywordsRef.get();

          clearTimeout(timeout);
          if (!didTimeout) {
            const searchedNameOrders = [];
            const searchedKeywordsOrders = [];
            let lastKey = null;

            if (!nameSnaps.empty) {
              nameSnaps.forEach((doc) => {
                searchedNameOrders.push({ id: doc.id, ...doc.data() });
              });
              lastKey = nameSnaps.docs[nameSnaps.docs.length - 1];
            }

            if (!keywordsSnaps.empty) {
              keywordsSnaps.forEach((doc) => {
                searchedKeywordsOrders.push({ id: doc.id, ...doc.data() });
              });
            }

            // MERGE ORDERS
            const mergedOrders = [
              ...searchedNameOrders,
              ...searchedKeywordsOrders,
            ];
            const hash = {};

            mergedOrders.forEach((order) => {
              hash[order.id] = order;
            });

            resolve({ orders: Object.values(hash), lastKey });
          }
        } catch (e) {
          if (didTimeout) return;
          reject(e);
        }
      })();
    });
  };

  getFeaturedOrders = (itemsCount = 12) =>
    this.db
      .collection("orders")
      .where("isFeatured", "==", true)
      .limit(itemsCount)
      .get();

  getRecommendedOrders = (itemsCount = 12) =>
    this.db
      .collection("orders")
      .where("isRecommended", "==", true)
      .limit(itemsCount)
      .get();

  addOrder = (id, order) => {
    this.db.collection("orders").doc(id).set(order);
  }

  addOrder1 = (newOrder, id) => {
    this.db.collection("orders1").doc(id).set(newOrder);
  }

  addSetting = (id, settings) =>
    this.db.collection("settings").doc(id).set(settings);

  addIngredient = (id, ingredients) =>
    this.db.collection("ingredients").doc(id).set(ingredients);

  generateKey = () => this.db.collection("orders").doc().id;

  storeImage = async (id, folder, imageFile) => {
    const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
  };

  deleteImage = (id) => this.storage.ref("orders").child(id).delete();

  editOrder = (id, updates) =>
    this.db.collection("orders").doc(id).update(updates);

  removeOrder = (id) => this.db.collection("orders").doc(id).delete();

  // // POST ACTIONS --------------

  getSinglePost = (id) => this.db.collection("posts").doc(id).get();

  getPosts = (lastRefKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const query = this.db
              .collection("posts")
              .orderBy(app.firestore.FieldPath.documentId())
              .startAfter(lastRefKey)
              .limit(12);

            const snapshot = await query.get();
            const posts = [];
            snapshot.forEach((doc) =>
              posts.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ posts, lastKey });
          } catch (e) {
            reject(e?.message || ":( Failed to fetch posts.");
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error("Request timeout, please try again"));
          }, 15000);

          try {
            const totalQuery = await this.db.collection("posts").get();
            const total = totalQuery.docs.length;
            const query = this.db
              .collection("posts")
              .orderBy(app.firestore.FieldPath.documentId())
              .limit(12);
            const snapshot = await query.get();

            clearTimeout(timeout);
            if (!didTimeout) {
              const posts = [];
              snapshot.forEach((doc) =>
                posts.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ posts, lastKey, total });
            }
          } catch (e) {
            if (didTimeout) return;
            reject(e?.message || ":( Failed to fetch posts.");
          }
        }
      })();
    });
  };

  searchPosts = (searchKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        const postsRef = this.db.collection("posts");

        const timeout = setTimeout(() => {
          didTimeout = true;
          reject(new Error("Request timeout, please try again"));
        }, 15000);

        try {
          const searchedNameRef = postsRef
            .orderBy("name_lower")
            .where("name_lower", ">=", searchKey)
            .where("name_lower", "<=", `${searchKey}\uf8ff`)
            .limit(12);
          const searchedKeywordsRef = postsRef
            .orderBy("dateAdded", "desc")
            .where("keywords", "array-contains-any", searchKey.split(" "))
            .limit(12);

          const nameSnaps = await searchedNameRef.get();
          const keywordsSnaps = await searchedKeywordsRef.get();

          clearTimeout(timeout);
          if (!didTimeout) {
            const searchedNamePosts = [];
            const searchedKeywordsPosts = [];
            let lastKey = null;

            if (!nameSnaps.empty) {
              nameSnaps.forEach((doc) => {
                searchedNamePosts.push({ id: doc.id, ...doc.data() });
              });
              lastKey = nameSnaps.docs[nameSnaps.docs.length - 1];
            }

            if (!keywordsSnaps.empty) {
              keywordsSnaps.forEach((doc) => {
                searchedKeywordsPosts.push({ id: doc.id, ...doc.data() });
              });
            }

            // MERGE POSTS
            const mergedPosts = [
              ...searchedNamePosts,
              ...searchedKeywordsPosts,
            ];
            const hash = {};

            mergedPosts.forEach((post) => {
              hash[post.id] = post;
            });

            resolve({ posts: Object.values(hash), lastKey });
          }
        } catch (e) {
          if (didTimeout) return;
          reject(e);
        }
      })();
    });
  };

  getFeaturedPosts = (itemsCount = 12) =>
    this.db
      .collection("posts")
      .where("isFeatured", "==", true)
      .limit(itemsCount)
      .get();

  getRecommendedPosts = (itemsCount = 12) =>
    this.db
      .collection("posts")
      .where("isRecommended", "==", true)
      .limit(itemsCount)
      .get();

  addPost = (id, post) =>
    this.db.collection("posts").doc(id).set(post);

  generateKey3 = () => this.db.collection("posts").doc().id;
  generateKey2 = () => this.db.collection("posts").doc().id;
  generateKey1 = () => this.db.collection("posts").doc().id;


  storeImage1 = async (id, folder, imageFile) => {
    const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
    const downloadURL1 = await snapshot.ref.getDownloadURL();
    const downloadURL2 = await snapshot.ref.getDownloadURL();
    const downloadURL3 = await snapshot.ref.getDownloadURL();


    return downloadURL1, downloadURL2, downloadURL3;
  };

  storeImage2 = async (id, folder, imageFile) => {
    const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
    const downloadURL1 = await snapshot.ref.getDownloadURL();
    const downloadURL2 = await snapshot.ref.getDownloadURL();
    const downloadURL3 = await snapshot.ref.getDownloadURL();


    return downloadURL1, downloadURL2, downloadURL3;
  };

  storeImage3 = async (id, folder, imageFile) => {
    const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
    const downloadURL1 = await snapshot.ref.getDownloadURL();
    const downloadURL2 = await snapshot.ref.getDownloadURL();
    const downloadURL3 = await snapshot.ref.getDownloadURL();

    return downloadURL1, downloadURL2, downloadURL3;
  };

  deleteImage = (id) => this.storage.ref("posts").child(id).delete();

  editPost = (id, updates) =>
    this.db.collection("posts").doc(id).update(updates);

  removePost = (id) => this.db.collection("posts").doc(id).delete();

  // // USER ACTIONS --------------

  getSingleUser = (id) => this.db.collection("users").doc(id).get();

  getUsers = (lastRefKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        if (lastRefKey) {
          try {
            const query = this.db
              .collection("users")
              .orderBy(app.firestore.FieldPath.documentId())
              .startAfter(lastRefKey)
              .limit(12);

            const snapshot = await query.get();
            const users = [];
            snapshot.forEach((doc) =>
              users.push({ id: doc.id, ...doc.data() })
            );
            const lastKey = snapshot.docs[snapshot.docs.length - 1];

            resolve({ users, lastKey });
          } catch (e) {
            reject(e?.message || ":( Failed to fetch users.");
          }
        } else {
          const timeout = setTimeout(() => {
            didTimeout = true;
            reject(new Error("Request timeout, please try again"));
          }, 15000);

          try {
            const totalQuery = await this.db.collection("users").get();
            const total = totalQuery.docs.length;
            const query = this.db
              .collection("users")
              .orderBy(app.firestore.FieldPath.documentId())
              .limit(12);
            const snapshot = await query.get();

            clearTimeout(timeout);
            if (!didTimeout) {
              const users = [];
              snapshot.forEach((doc) =>
                users.push({ id: doc.id, ...doc.data() })
              );
              const lastKey = snapshot.docs[snapshot.docs.length - 1];

              resolve({ users, lastKey, total });
            }
          } catch (e) {
            if (didTimeout) return;
            reject(e?.message || ":( Failed to fetch users.");
          }
        }
      })();
    });
  };

  searchUsers = (searchKey) => {
    let didTimeout = false;

    return new Promise((resolve, reject) => {
      (async () => {
        const usersRef = this.db.collection("users");

        const timeout = setTimeout(() => {
          didTimeout = true;
          reject(new Error("Request timeout, please try again"));
        }, 15000);

        try {
          const searchedNameRef = usersRef
            .orderBy("name_lower")
            .where("name_lower", ">=", searchKey)
            .where("name_lower", "<=", `${searchKey}\uf8ff`)
            .limit(12);
          const searchedKeywordsRef = usersRef
            .orderBy("dateAdded", "desc")
            .where("keywords", "array-contains-any", searchKey.split(" "))
            .limit(12);

          const nameSnaps = await searchedNameRef.get();
          const keywordsSnaps = await searchedKeywordsRef.get();

          clearTimeout(timeout);
          if (!didTimeout) {
            const searchedNameUsers = [];
            const searchedKeywordsUsers = [];
            let lastKey = null;

            if (!nameSnaps.empty) {
              nameSnaps.forEach((doc) => {
                searchedNameUsers.push({ id: doc.id, ...doc.data() });
              });
              lastKey = nameSnaps.docs[nameSnaps.docs.length - 1];
            }

            if (!keywordsSnaps.empty) {
              keywordsSnaps.forEach((doc) => {
                searchedKeywordsUsers.push({ id: doc.id, ...doc.data() });
              });
            }

            const mergedUsers = [
              ...searchedNameUsers,
              ...searchedKeywordsUsers,
            ];
            const hash = {};

            mergedUsers.forEach((user) => {
              hash[user.id] = user;
            });

            resolve({ users: Object.values(hash), lastKey });
          }
        } catch (e) {
          if (didTimeout) return;
          reject(e);
        }
      })();
    });
  };

  getFeaturedUsers = (itemsCount = 12) =>
    this.db
      .collection("users")
      .where("isFeatured", "==", true)
      .limit(itemsCount)
      .get();

  getRecommendedUsers = (itemsCount = 12) =>
    this.db
      .collection("users")
      .where("isRecommended", "==", true)
      .limit(itemsCount)
      .get();

  addUser = (id, user) =>
    this.db.collection("users").doc(id).set(user);

  generateKey = () => this.db.collection("users").doc().id;

  storeImage = async (id, folder, imageFile) => {
    const snapshot = await this.storage.ref(folder).child(id).put(imageFile);
    const downloadURL = await snapshot.ref.getDownloadURL();

    return downloadURL;
  };

  deleteImage = (id) => this.storage.ref("users").child(id).delete();

  editUser = (id, updates) =>
    this.db.collection("users").doc(id).update(updates);

  removeUser = (id) => this.db.collection("users").doc(id).delete();

}

const firebaseInstance = new Firebase();

export default firebaseInstance;