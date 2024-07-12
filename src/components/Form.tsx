import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Box,
} from "@chakra-ui/react";

export interface QueryProps {
  lat: string;
  lon: string;
  name: string;
}

interface Props {
  dataSubmit: (data: QueryProps) => void;
}

const schema = z.object({
  lat: z.string().default("43.6532"),
  lon: z.string().default("-79.3832"),
  name: z.string(),
});
type FormType = z.infer<typeof schema>;

function Form({ dataSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ resolver: zodResolver(schema) });

  return (
    <div className="container">
      <form onSubmit={handleSubmit(dataSubmit)}>
        <Box borderRadius={25} padding={10} maxW={"300px"}>
          <FormControl isRequired>
            <FormLabel>Latitude</FormLabel>
            <Input
              {...register("lat")}
              id="lat"
              placeholder="Latitude"
              type="string"
            />
          </FormControl>
          <FormControl paddingTop={5} isRequired>
            <FormLabel>Longitude</FormLabel>
            <Input
              {...register("lon")}
              id="lon"
              name="lon"
              type="string"
              placeholder="Longitude"
            ></Input>
            <FormHelperText>Both Fields are necessary</FormHelperText>
          </FormControl>
          <button type="submit" className="btn btn-outline-danger mt-3">
            Get Info
          </button>
        </Box>

        {errors.lat && <p>{errors.lat.message}</p>}
        {errors.lon && <p>{errors.lon.message}</p>}
      </form>
    </div>
  );
}

export default Form;
