import React, { useState } from "react";
import { FlatList } from "react-native";

import firestore from "@react-native-firebase/firestore";
import { styles } from "./styles";
import { Product, ProductProps } from "../Product";

import { useEffect } from "react";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection("products")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];
        setProducts(data);
      });

    return () => subscribe();
  }, []);

  // useEffect(() => {
  //   firestore()
  //     .collection("products")
  //     .doc("my-custom-id")
  //     .get()
  //     .then((response) =>
  //       console.log({
  //         ...response.data(),
  //         id: response.id,
  //       })
  //     );
  // }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
