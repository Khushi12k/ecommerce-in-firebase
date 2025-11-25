import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../pages/Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

const cartContext = createContext();

function CartProvider({ children }) {
    const [cart, setCart] = useState(
        localStorage.getItem("storedCart") !== null
            ? JSON.parse(localStorage.getItem("storedCart"))
            : []
    );

    // Save cart to Firestore when it changes
    useEffect(() => {
        const saveCartToFirebase = async () => {
            if (auth && auth.currentUser) {
                try {
                    const userId = auth.currentUser.uid;
                    const cartDocRef = doc(db, "users", userId, "cart", "items");
                    await setDoc(cartDocRef, { items: cart }, { merge: true });
                    console.log("Cart saved to Firestore");
                } catch (error) {
                    console.log("Error saving cart to Firestore:", error);
                }
            } else {
                // If no user, save to localStorage
                localStorage.setItem("storedCart", JSON.stringify(cart));
            }
        };

        saveCartToFirebase();
    }, [cart]);

    // Load cart from Firestore when user logs in
    useEffect(() => {
        const loadCartFromFirebase = async () => {
            if (auth && auth.currentUser) {
                try {
                    const userId = auth.currentUser.uid;
                    const cartDocRef = doc(db, "users", userId, "cart", "items");
                    const cartSnapshot = await getDoc(cartDocRef);
                    
                    if (cartSnapshot.exists()) {
                        const { items } = cartSnapshot.data();
                        setCart(items || []);
                        console.log("Cart loaded from Firestore");
                    }
                } catch (error) {
                    console.log("Error loading cart from Firestore:", error);
                }
            }
        };

        loadCartFromFirebase();
    }, [auth?.currentUser?.uid]);

    return (
        <cartContext.Provider value={{ cart, setCart }}>
            {children}
        </cartContext.Provider>
    );
}

export function useCart() {
    return useContext(cartContext);
}

export default CartProvider;
