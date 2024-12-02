"use client";

import { Upload, XCircle } from "lucide-react";
import React, { CSSProperties } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const thumbsContainer: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb: CSSProperties = {
  position: "relative",
  display: "inline-block",
  borderRadius: 4,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
};

const removeButton: CSSProperties = {
  position: "absolute",
  top: 5,
  right: 5,
  cursor: "pointer",
  color: "white",
  backgroundColor: "red",
  borderRadius: "50%",
};

interface ExtendedFile extends File {
  preview: string;
}

interface FileDropzoneProps {
  field: {
    value?: (File | ExtendedFile)[];
    onChange: (file: ExtendedFile[]) => void;
  };
}

export function FileDropzone({ field }: FileDropzoneProps) {
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    maxSize: 5242880, // 5MB
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (acceptedFiles) => {
      const filesWithPreviews = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ) as ExtendedFile[];
      field.onChange(filesWithPreviews);
    },
  });

  const handleRemoveImage = () => {
    field.onChange([]);
  };

  const thumbs = (field.value || []).map((file) => {
    const preview =
      "preview" in file ? file.preview : URL.createObjectURL(file);
    return (
      <div style={thumb} key={file.name}>
        <div style={thumbInner}>
          <Image
            src={preview}
            alt="Preview"
            width={100}
            height={100}
            objectFit="contain"
            onLoadingComplete={() => URL.revokeObjectURL(preview)}
          />
        </div>
        <XCircle
          style={removeButton}
          onClick={handleRemoveImage}
          size={20}
          aria-label="Remove Image"
        />
      </div>
    );
  });

  return (
    <section className="flex flex-col container max-h-[127px] h-full w-full self-center bg-gray-200 items-center justify-center border-[#039ADC] border-2 border-dashed cursor-pointer">
      <div
        {...getRootProps({
          className: "dropzone flex flex-col items-center justify-center",
        })}
      >
        <input {...getInputProps()} />
        {!field.value?.length && (
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
