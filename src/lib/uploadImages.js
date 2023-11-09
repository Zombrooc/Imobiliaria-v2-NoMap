export default function uploadImages(files) {
  let promises = [];

  files.foreach((file) => {
    const extension = file.type.split("/")[1];

    const uploadRef = ref(
      storage,
      `uploads/${user.uid}/${Date.now()}.${extension}`
    );

    const uploadTask = uploadBytesResumable(uploadRef, file);

    promises.push(uploadtask);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const pct = (
          (snapshot.bytesTransferred / snapshot.totalBytes) *
          100
        ).toFixed(0);
        setUploadProgress(pct);
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            alert("Não autorizado!");
            break;
          case "storage/canceled":
            alert("Upload cancelado!");
            break;

          case "storage/unknown":
            alert("Erro desconhecido!");
            break;
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          return url;
        });
      }
    );
  });

  return promises;
}
