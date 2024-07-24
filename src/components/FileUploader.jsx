import React, { useContext, useEffect, useState } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useDropzone } from 'react-dropzone';

import { getConvertedJpgFile } from "../helpers";
import { StoreContext } from "../store";

const FileUploader = () => {
  // State
  const [isPending, setPending] = useState(false);
  const [file, setFile] = useState(undefined);
  const [errorMessages, setErrorMessages] = useState([]);

  // Hooks
  const { store, setStore } = useContext(StoreContext);

  // const initiateImageUpload = async (file) => {
  //   updateStore({
  //     isLoading: true,
  //   });
  //   console.log('file', file);
  //   const jpgFile = await getConvertedJpgFile(file);
  //   console.log('jpgFile', jpgFile);
  //   setFile(jpgFile);
  // };

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
          if (errorItem.message && !_newErrorMessages.includes(errorItem.message)) {
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

    const _newErrorMessages = ['Error reading file'];

    setErrorMessages(_newErrorMessages);
  };

  const renderFileUploaderContent = () => {
    if (isPending) {
      return (
        <Typography variant="subtitle2" fontWeight={600} display="flex" alignItems="center">
          <CircularProgress size={20} />&nbsp;
          Uploading, Please wait
        </Typography>
      );
    }

    return (
      <Typography variant="subtitle2" fontWeight={600} display="flex" alignItems="center">
        Drag 'n' drop some files here, or click to select files
      </Typography>
    )
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/*': []
    },
    disabled: isPending,
    onDrop,
    onError,
    onDropRejected,
  });

  return (

    <Box
      {...getRootProps({ className: 'img-uploader' })}
      component="div"
      sx={isPending ? undefined : {
        '&:hover': {
          borderColor: '#1677ff',
          cursor: 'pointer',
        },
      }}
    >
      <input {...getInputProps()} />
      <Stack textAlign="center" alignItems="center">
        {renderFileUploaderContent()}
        {errorMessages.length ? (
          <Typography variant="subtitle2" fontWeight={600}>
            Upload Failed:
            &nbsp;
            {errorMessages.length ? errorMessages.map((errorMessage, index) => {
              const isLastItem = errorMessages.length - 1 === index;

              return (
                <Typography
                  key={`li-${index}`}
                  variant="caption"
                  color="error"
                >
                  {errorMessage}{isLastItem ? null : ', '}
                </Typography>
              )
            }) : null}
          </Typography>
        ) : null}
      </Stack>
    </Box >
  );
};

export default FileUploader;
