import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, SafeAreaView, ScrollView, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }), false);

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
  
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10, minHeight: "100%" }}
      >
     <Image source={icons.logo} className="w-12 h10 mt-20 mb-5 mx-auto " />
        {moviesLoading ? (
          <ActivityIndicator
            color="#ab8bff"
            size="large"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text className="text-white text-center mt-10">
            {moviesError.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              onPress={() => router.push("/search")}
              placeholder="Search Movie"
            />
            <>
              <Text className="text-white text-2xl font-semibold mb-3 mt-5">
                Latest Movies..
              </Text>
              
              <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View className="mb-3">
                    <Text className="text-white text-base">{item.title}</Text>
                  </View>
                )}  
              
              />

            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

// ---
