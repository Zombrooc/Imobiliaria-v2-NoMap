"use client";
import uploadImages from "@/lib/uploadImages";
import { useForm } from "react-hook-form";

export default function TestePage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async ({ imgs }) => {
    const promises = uploadImages(imgs);
    promise.all(promises).then((tasks) => {
      console.log("tasks", tasks);
      console.log("all uploads complete");
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="file" multiple {...register("imgs")} />
        <button type="submit"> Vai lá porra </button>
      </form>
    </>
  );
}
