// "use client";
// import { Provider } from "react-redux";
// import { createStore } from "@/store/store";
// import { useRef } from "react";

// function StoreProvider({ children }) {
//   const storeRef = useRef(null);
//   if (!storeRef.current) {
//     storeRef.current = createStore();
    
//   }
//   return <Provider store={storeRef.current}>{children}</Provider>;
// }

// export default StoreProvider

// "use client";
// import { Provider } from "react-redux";
// import { createStore } from "@/store/store";
// import { useRef ,useMemo } from "react";

// function StoreProvider({ children }) {
//   const storeRef = useRef(null);

//   const store = useMemo(() => {
//     if (!storeRef.current) {
//       storeRef.current = createStore();
//     }
//     return storeRef.current;
//   }, []);

//   return <Provider store={store}>{children}</Provider>;
// }

// export default StoreProvider;
