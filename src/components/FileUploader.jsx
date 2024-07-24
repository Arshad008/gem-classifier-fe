import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { useDropzone } from 'react-dropzone';

import { getConvertedJpgFile } from "../helpers";

const FileUploader = () => {
  const [isPending, setPending] = useState(false);

  const { acceptedFiles, getRootProps, getInputProps, fileRejections } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/*': []
    },
    disabled: isPending
  });
  console.log('acceptedFiles', acceptedFiles);

  const errorMessages = [];

  fileRejections.forEach((fileRejectionItem) => {
    if (fileRejectionItem.errors && fileRejectionItem.errors.length) {
      fileRejectionItem.errors.forEach((errorItem) => {
        if (errorItem.message && !errorMessages.includes(errorItem.message)) {
          errorMessages.push(errorItem.message);
        }
      });
    }
  });

  useEffect(() => {
    if (acceptedFiles.length) {
      const uploadedFile = acceptedFiles[0];

      if (uploadedFile) {
        initiateImageUpload(uploadedFile);
      }
    }
  }, [acceptedFiles]);

  const initiateImageUpload = async (file) => {
    setPending(true);
    console.log('file', file);
    const jpgFile = await getConvertedJpgFile(file);
    console.log('jpgFile', jpgFile);
  };

  return (
    <Box component="div" sx={isPending ? undefined : {
      '&:hover': {
        borderColor: '#1677ff',
        cursor: 'pointer',
      },
    }} {...getRootProps({ className: 'img-uploader' })}>
      <input {...getInputProps()} />
      <Stack textAlign="center" alignItems="center">
        <Typography variant="subtitle2" fontWeight={600} display="flex" alignItems="center">
          {isPending ? (
            <>
              <CircularProgress size={20} />&nbsp;
              Uploading, Please wait
            </>
          ) : `Drag 'n' drop some files here, or click to select files`}
        </Typography>
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
