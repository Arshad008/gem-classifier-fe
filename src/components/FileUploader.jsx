import React, { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useSnackbar } from "notistack";

import { StoreContext } from "../store";
import { uploadFile } from "../apis";
import { getConvertedJpgFile } from "../helpers";

const FileUploader = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { store, setStore } = useContext(StoreContext);

  // State
  const [isPending, setPending] = useState(false);
  const [thumbFile, setThumbFile] = useState(undefined);
  const [errorMessages, setErrorMessages] = useState([]);
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    return () => {
      if (thumbFile) {
        URL.revokeObjectURL(thumbFile.preview);
      }
    };
  }, []);

  const updateStore = (attributes = {}) => {
    setStore((prevState) => ({
      ...prevState,
      ...attributes,
    }));
  };

  const onDrop = async (acceptedFiles) => {
    // Reset States
    setErrorMessages([]);

    if (acceptedFiles.length) {
      // Turn on loaders
      setPending(true);
      updateStore({
        isLoading: true,
      });

      const convertedFile = await getConvertedJpgFile(acceptedFiles[0]);

      setThumbFile(
        Object.assign(convertedFile, {
          preview: URL.createObjectURL(convertedFile),
        })
      );

      const form = new FormData();
      form.append("file", convertedFile);

      // API CALL
      await uploadFile(form)
        .then((res) => {
          if (res.success && res.data) {
            enqueueSnackbar("Prediction completed successfully!", {
              variant: "success",
            });
          } else {
            enqueueSnackbar("Prediction failed!", {
              variant: "error",
            });
          }
        })
        .catch(() => {
          enqueueSnackbar("Prediction failed!", {
            variant: "error",
          });
        });

      // Turn on loaders
      updateStore({
        isLoading: false,
      });

      setPending(false);
    }
  };

  const onDropRejected = (fileRejections) => {
    setPending(false);
    updateStore({
      isLoading: false,
    });

    const _newErrorMessages = [];

    fileRejections.forEach((fileRejectionItem) => {
      if (fileRejectionItem.errors && fileRejectionItem.errors.length) {
        fileRejectionItem.errors.forEach((errorItem) => {
          if (
            errorItem.message &&
            !_newErrorMessages.includes(errorItem.message)
          ) {
            _newErrorMessages.push(errorItem.message);
          }
        });
      }
    });

    setErrorMessages(_newErrorMessages);
  };

  const onError = (err) => {
    setPending(false);
    updateStore({
      isLoading: false,
    });

    const _newErrorMessages = ["Error reading file"];

    setErrorMessages(_newErrorMessages);
  };

  const renderFileUploaderContent = () => {
    if (isPending) {
      return (
        <>
          {thumbFile ? (
            <img
              src={thumbFile.preview}
              alt="upload-thumb"
              onLoad={() => {
                URL.revokeObjectURL(thumbFile.preview);
              }}
              style={{
                borderRadius: "4px",
                maxWidth: "100px",
                marginBottom: "15px",
              }}
            />
          ) : null}
          <Typography
            variant="subtitle2"
            fontWeight={600}
            display="flex"
            alignItems="center"
          >
            <CircularProgress size={20} />
            &nbsp; Processing, Please wait
          </Typography>
        </>
      );
    }

    return (
      <>
        <img
          src="/images/default-upload.png"
          alt="default-upload"
          style={{
            borderRadius: "4px",
            maxWidth: "100px",
            marginBottom: "30px",
          }}
        />
        <Typography
          variant="subtitle2"
          fontWeight={600}
          display="flex"
          alignItems="center"
        >
          Choose a file or drag & drop here.
        </Typography>
        <Typography variant="caption">JPEG, PNG , Max 5 MB </Typography>
      </>
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/*": [],
    },
    disabled: isPending,
    onDrop,
    onError,
    onDropRejected,
  });

  return (
    <Box
      {...getRootProps({ className: "img-uploader" })}
      component="div"
      sx={
        isPending
          ? undefined
          : {
              "&:hover": {
                borderColor: "#1677ff",
                cursor: "pointer",
              },
            }
      }
    >
      <input {...getInputProps()} />
      <Stack textAlign="center" alignItems="center">
        {renderFileUploaderContent()}
        {errorMessages.length ? (
          <Typography variant="subtitle2" fontWeight={600}>
            Upload Failed: &nbsp;
            {errorMessages.length
              ? errorMessages.map((errorMessage, index) => {
                  const isLastItem = errorMessages.length - 1 === index;

                  return (
                    <Typography
                      key={`li-${index}`}
                      variant="caption"
                      color="error"
                    >
                      {errorMessage}
                      {isLastItem ? null : ", "}
                    </Typography>
                  );
                })
              : null}
          </Typography>
        ) : null}
      </Stack>
    </Box>
  );
};

export default FileUploader;
