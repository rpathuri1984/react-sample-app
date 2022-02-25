import { GetRequest } from "../../services/ApiUtils";

// A mock function to mimic making an async request for data
export const fetchCount = async (amount = 1) => {
  // return new Promise<{ data: number }>((resolve) =>
  //   setTimeout(() => resolve({ data: amount }), 500)
  // );
  return await GetRequest({
    url: "https://jsonplaceholder.typicode.com/posts",
  });
};
