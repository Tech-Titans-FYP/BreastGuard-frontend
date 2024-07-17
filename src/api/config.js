export const BASE_URL = "https://api.chestxpert.live";

// export const BASE_URL = "http://127.0.0.1:5000";

export const ULTRASOUND = {
  processUltrasoundImage: `${BASE_URL}/api/process-us-image`,
};

export const MRI = {
  processMRIImage: `${BASE_URL}/api/process-mri-image`,
};

export const HISTOPATHOLOGY = {
  processHistoImage: `${BASE_URL}/api/process-histo-image`,
};
