import React, { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

import { getConvertedJpgFile } from "../helpers";
import { StoreContext } from "../store";

const FileUploader = () => {
  // State
  const [isPending, setPending] = useState(false);
  const [thumbFile, setThumbFile] = useState(undefined);
  const [errorMessages, setErrorMessages] = useState([]);

  // Hooks
  const { store, setStore } = useContext(StoreContext);

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

      const fileToBeUploaded = await getConvertedJpgFile(acceptedFiles[0]);
      setThumbFile(
        Object.assign(fileToBeUploaded, {
          preview: URL.createObjectURL(fileToBeUploaded),
        })
      );
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
            &nbsp; Uploading, Please wait
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
