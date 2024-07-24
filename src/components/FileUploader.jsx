import React, { useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useDropzone } from 'react-dropzone';

const FileUploader = () => {
  const { acceptedFiles, getRootProps, getInputProps, fileRejections } = useDropzone({
    maxFiles: 1
  });

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

  return (
    <div {...getRootProps({ className: 'img-uploader' })}>
      <input {...getInputProps()} />
      <Stack>
        <Typography variant="subtitle2" fontWeight={600}>
          Drag 'n' drop some files here, or click to select files
        </Typography>
        {errorMessages.length ? <Typography>
          Upload Failed: 
        </Typography> : null}
        {errorMessages.length ? (
          <Box component="ul" style={{ margin: 0, padding: 0 }}>
            {errorMessages.map((errorMessage, index) => (
              <Typography component="li" variant="caption" color="error" key={`li-${index}`}>{errorMessage}</Typography>
            ))}
          </Box>
        ) : null}
      </Stack>
    </div>
  );
};

export default FileUploader;
