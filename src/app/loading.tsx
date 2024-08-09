import React from "react";

export default function Loading() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div
        className="spinner-grow"
        role="status"
        style={{ backgroundColor: "var(--bs-primary)" }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
