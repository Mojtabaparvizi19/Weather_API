import { AppProps } from "../App";
import useGeneric from "./useGeneric";

// interface Props {
//   list: ListProps[] | null;
//   city: { name: string } | null;
// }
export interface ListProps {
  dt: number;
  main: MainProp;
  weather: [WeatherProps];
}
interface MainProp {
  temp: number;
  feels_like: number;
}
interface WeatherProps {
  id: number;
  main: string;
  description: string;
}

function useData(dataQuery: AppProps) {
  const { list, data, error, isLoading } = useGeneric<ListProps>(
    "forecast",
    {
      params: {
        lat: dataQuery.data?.lat,
        lon: dataQuery.data?.lon,
        cnt: 10,
      },
    },
    [dataQuery]
  );
  return { data, list, error, isLoading };
}

export default useData;

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
