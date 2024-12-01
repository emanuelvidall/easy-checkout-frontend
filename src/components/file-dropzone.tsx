import { Upload, XCircle } from "lucide-react"; // XCircle for the remove button
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  position: "relative", // Enable positioning for the remove button
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center", // Center the thumbnail
  width: "100%",
  height: "100%",
  overflow: "hidden",
  backgroundColor: "#f9f9f9", // Optional background for better contrast
};

const img = {
  maxWidth: "100%",
  maxHeight: "100%", // Ensure the image fits within the container
};

const removeButton = {
  position: "absolute",
  top: 4,
  right: 4,
  cursor: "pointer",
  color: "#f44336", // Red color for remove
  backgroundColor: "white", // Optional for better visibility
  borderRadius: "50%",
};

export function FileDropzone(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const handleRemoveImage = () => {
    // Remove all files
    files.forEach((file) => URL.revokeObjectURL(file.preview)); // Clean up URLs
    setFiles([]);
  };

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt="Uploaded preview"
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
      {/* Remove Button */}
      <XCircle
        style={removeButton}
        onClick={handleRemoveImage}
        size={20}
        title="Remove image"
      />
    </div>
  ));

  useEffect(() => {
    // Clean up URLs on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="flex flex-col container max-h-[127px] max-w-[375px] h-full w-full self-center bg-gray-200 items-center justify-center border-[#039ADC] border-2 border-dashed cursor-pointer">
      <div
        {...getRootProps({
          className: "dropzone flex flex-col items-center justify-center",
        })}
      >
        <input {...getInputProps()} />
        {!files.length && (
          <>
            <Upload stroke="#039ADC" className="select-none mt-6" />
            <p className="text-[#039ADC] select-none">Upload</p>
            <p className="text-[#039ADC] select-none">
              Arraste a imagem aqui <br /> ou clique para escolher
            </p>
          </>
        )}
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
}
