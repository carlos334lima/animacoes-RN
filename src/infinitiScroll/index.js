import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  ActivityIndicator,
  ActivityIndicatorBase,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const InfiniteScroll = () => {
  const baseUrl = "https://api.github.com/";
  const perPage = 20;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    asyncLoadApi();
  }, []);

  async function asyncLoadApi() {
    if (loading) return;

    setLoading(true);
    const response = await axios.get(
      `https://api.github.com/search/repositories?q=react&per_page=${perPage}&page=${page}`
    );

    setData([...data, ...response.data.items]);
    setPage(page + 1);
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <ListItem data={item} />}
        style={{ marginTop: 35 }}
        contentContainerStyle={{ marginHorizontal: 20 }}
        onEndReached={asyncLoadApi}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<LoadingComponent load={loading} />}
      />
    </View>
  );
};

const ListItem = ({ data }) => {
  return (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{data.full_name}</Text>
    </View>
  );
};

const LoadingComponent = ({ load }) => {
  if (!load) return null;
  return <View>{load && <ActivityIndicator size={25} color="#000" />}</View>;
};

export default InfiniteScroll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listItem: {
    backgroundColor: "#1212",
    padding: 25,
    marginTop: 20,
    borderRadius: 10,
  },
  listItemText: {
    fontWeight: "bold",
  },
});
