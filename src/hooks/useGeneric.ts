import apiClient from "../services/apiClient";
import { useEffect, useState } from "react";
import { AxiosRequestConfig, CanceledError } from "axios";

export interface DataProps<T> {
  list: T[] | null;
  city: { name: string } | null;
}

function useGeneric<T>(
  endpoint: string,
  request?: AxiosRequestConfig,
  dep?: any[]
) {
  const [data, setData] = useState<DataProps<T>>({} as DataProps<T>);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  useEffect(
    () => {
      const controller = new AbortController();
      setLoading(true);
      apiClient
        .get<DataProps<T>>(endpoint, {
          signal: controller.signal,
          ...request,
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          if (error instanceof CanceledError) return;
          setError(error.message);
          setLoading(false);
        });
      return () => controller.abort();
    },
    dep ? [...dep] : []
  );

  const { list } = data;
  return { data, list, error, isLoading };
}

export default useGeneric;

// import apiClient from "../services/apiClient";
// import { useEffect, useState } from "react";
// import { AppProps } from "../App";
// import { CanceledError } from "axios";

// interface Props {
//   list: ListProps[] | null;
//   city: { name: string } | null;
// }

// export interface ListProps {
//   dt: number;
//   main: MainProp;

//   weather: [WeatherProps];
// }

// interface MainProp {
//   temp: number;
//   feels_like: number;
// }

// interface WeatherProps {
//   id: number;
//   main: string;
//   description: string;
// }

// function useData(dataQuery: AppProps) {
//   const [data, setData] = useState<Props>({} as Props);
//   const [error, setError] = useState("");
//   const [isLoading, setLoading] = useState(false);
//   useEffect(() => {
//     const controller = new AbortController();
//     setLoading(true);
//     apiClient
//       .get<Props>("forecast", {
//         signal: controller.signal,
//         params: {
//           lat: dataQuery.data?.lat,
//           lon: dataQuery.data?.lon,
//           cnt: 15,
//         },
//       })
//       .then((res) => {
//         setData(res.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         if (error instanceof CanceledError) return;
//         setError(error.message);
//         setLoading(false);
//       });
//     return () => controller.abort();
//   }, [dataQuery]);
//   const { list } = data;
//   return { data, list, error, isLoading };
// }

// export default useData;
