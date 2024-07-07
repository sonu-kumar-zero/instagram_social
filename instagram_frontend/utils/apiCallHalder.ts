import { UserType } from "@/types/modelsTypes";
import { Property } from "@/types/uploadTypes";
import axios from "axios";
import React from "react";

interface ArrayOfUrlObjects {
  idx: number;
  url: string;
  type: string;
}

interface handlePostUploadProps {
  user: UserType;
  files: File[];
  propertyList: Property[];
  postDescription: string;
  setIsUploadingStart: React.Dispatch<React.SetStateAction<boolean>>;
  setUploadBoxEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const handlePostUpload = async ({
  user,
  files,
  propertyList,
  postDescription,
  setIsUploadingStart,
  setUploadBoxEnabled
}: handlePostUploadProps) => {
  try {
    setIsUploadingStart(true);
    if (!user) return;
    if (files.length === 0) return;
    const typeOfMedia: string[] = propertyList.map((fileProperty) => {
      return fileProperty.type;
    });
    if (files.length === 0) return;
    const postGenerationResponse = await axios.post(
      `http://localhost:4000/api/upload/post/${user.id}`,
      {
        numberOfPost: files.length,
        description: postDescription,
        typeOfPost: propertyList[0].type,
        typeOfMedia: typeOfMedia
      }
    );
    console.log(postGenerationResponse.data);
    if (postGenerationResponse.status === 200) {
      const ArrayOfUrl: ArrayOfUrlObjects[] =
        postGenerationResponse.data.ArrayOfUrl;

      if (ArrayOfUrl.length < 1) return;
      ArrayOfUrl.sort((a, b) => a.idx - b.idx);
      console.log(ArrayOfUrl);

      const canvas = document.createElement("canvas");
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      for (let i = 0; i < files.length; i++) {
        if (ArrayOfUrl[i].type === "IMAGE") {
          const img = new Image();
          const UrlThatWillBeDrawn = URL.createObjectURL(files[i]);
          img.src = UrlThatWillBeDrawn;
          console.log(UrlThatWillBeDrawn);

          await new Promise<void>((resolve) => {
            img.onload = () => {
              const canvasAspectRatio = canvas.width / canvas.height;
              const imageAspectRatio = img.width / img.height;

              let drawWidth, drawHeight, offsetX, offsetY;
              const scale = propertyList[i].scale;

              if (canvasAspectRatio > imageAspectRatio) {
                drawWidth = canvas.width * scale;
                drawHeight = drawWidth / imageAspectRatio;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = (canvas.height - drawHeight) / 2;
              } else {
                drawHeight = canvas.height * scale;
                drawWidth = drawHeight * imageAspectRatio;
                offsetX = (canvas.width - drawWidth) / 2;
                offsetY = (canvas.height - drawHeight) / 2;
              }

              const filters = propertyList[i].DEFAULT_OPTIONS.map((option) => {
                if (option.name === "Vignette") return "";
                return `${option.property}(${option.value}${option.unit})`;
              });

              const filter = filters.join(" ");

              const radialGradient = ctx.createRadialGradient(
                canvas.width / 2,
                canvas.height / 2,
                0,
                canvas.width / 2,
                canvas.height / 2,
                Math.abs(Math.max(canvas.width, canvas.height) / 2)
              );

              radialGradient.addColorStop(0, "rgba(0, 0, 0, 0)");
              radialGradient.addColorStop(
                1,
                `rgba(0, 0, 0, ${
                  propertyList[i].DEFAULT_OPTIONS[7].value / 100
                })`
              );

              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.filter = filter;
              ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

              ctx.fillStyle = radialGradient;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
              URL.revokeObjectURL(UrlThatWillBeDrawn);

              canvas.toBlob(async (blob) => {
                if (blob) {
                  const formData = new FormData();
                  formData.append("file", blob);
                  formData.append("fileId", ArrayOfUrl[i].url);
                  const imageUploadingResponse = await axios.post(
                    `http://localhost:8000/api/upload/post`,
                    formData
                  );
                  if (imageUploadingResponse.status === 200) {
                    console.log(imageUploadingResponse);
                  }
                }
                resolve();
              }, "image/png");
            };
          });
        } else if (ArrayOfUrl[i].type === "VIDEO") {
          await new Promise<void>(async (resolve) => {
            const formData = new FormData();
            // fileId, muted, startTime, endTime
            formData.append("file", files[i]);
            formData.append(
              "muted",
              propertyList[i].VIDEO_DEFAULT_OPTIONS.videoMuted
                ? "true"
                : "false"
            );
            formData.append(
              "startTime",
              `${propertyList[i].VIDEO_DEFAULT_OPTIONS.startTime}`
            );
            formData.append(
              "endTime",
              `${propertyList[i].VIDEO_DEFAULT_OPTIONS.endTime}`
            );
            formData.append("fileId", ArrayOfUrl[i].url);
            const reelUploadingResponse = await axios.post(
              `http://localhost:8000/api/upload/reel`,
              formData
            );

            if (reelUploadingResponse.status === 200) {
              console.log("Reel Uploaded Successfully.");

              if (propertyList[i].VIDEO_DEFAULT_OPTIONS.imageUrl !== "") {
                const img = new Image();
                img.src = propertyList[i].VIDEO_DEFAULT_OPTIONS.imageUrl;
                img.onload = () => {
                  canvas.width = 1080;
                  canvas.height = 1920;
                  ctx.clearRect(0, 0, canvas.width, canvas.height);
                  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                  canvas.toBlob(async (blob) => {
                    if (blob) {
                      const thumbnailForm = new FormData();
                      thumbnailForm.append("file", blob);
                      thumbnailForm.append("fileId", ArrayOfUrl[i].url);
                      const thumbnailUploadingResponse = await axios.post(
                        `http://localhost:8000/api/upload/thumbnail`,
                        thumbnailForm
                      );
                      if (thumbnailUploadingResponse.status === 200) {
                        console.log("Thumbnail Uploaded Successfully");
                      }
                    }
                    resolve();
                  }, "image/png");
                };
              }
              resolve();
            }
          });
        }
      }
    }
  } catch (error: any) {
    console.log(error.message);
  } finally {
    setIsUploadingStart(false);
    setUploadBoxEnabled(false);
  }
};
