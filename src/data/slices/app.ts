import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { videoFormat } from 'ytdl-core';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

// const [imageUrl, setImageUrl] = useState<string>('./img/hqdefault.webp');
//   const [resolutionArray, setResolutionArray] = useState<videoFormat[]>([]);
//   const [currentResolution, setCurrentResolution] = useState<videoFormat>();
//   const [videoTitle, setVideoTitle] = useState<string>('');
//   const [loadingThumbnail, setLoadingThumbnail] = useState<boolean>(false);
//   const [validUrl, setValidUrl] = useState<boolean>(false);
//   const [downloadProgress, setDownloadProgress] = useState<string>('0%');
//   const [downloaded, setDownloaded] = useState<string>('');
//   const [estimatedTime, setEstimatedTime] = useState<string>('');
//   const [downloadFolderPath, setDownloadFolderPath] = useState<string>('');
export interface AppState {
  url: string;
  imageUrl: string;
  resolutionArray: videoFormat[];
  currentResolution: videoFormat | undefined;
  videoTitle: string;
  loadingThumbnail: boolean;
  validUrl: boolean;
  downloadProgress: string;
  downloaded: string;
  estimatedTime: string;
  downloadFolderPath: string;
}

const initialState: AppState = {
  url: '',
  imageUrl: './img/hqdefault.webp',
  resolutionArray: [],
  currentResolution: undefined,
  videoTitle: '',
  loadingThumbnail: false,
  validUrl: false,
  downloadProgress: '0%',
  downloaded: '',
  estimatedTime: '',
  downloadFolderPath: '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setImageUrl: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
    },
    setResolutionArray: (state, action: PayloadAction<videoFormat[]>) => {
      state.resolutionArray = action.payload;
    },
    setCurrentResolution: (
      state,
      action: PayloadAction<videoFormat | undefined>
    ) => {
      state.currentResolution = action.payload;
    },
    setVideoTitle: (state, action: PayloadAction<string>) => {
      state.videoTitle = action.payload;
    },
    setLoadingThumbnail: (state, action: PayloadAction<boolean>) => {
      state.loadingThumbnail = action.payload;
    },
    setValidUrl: (state, action: PayloadAction<boolean>) => {
      state.validUrl = action.payload;
    },
    setDownloadProgress: (state, action: PayloadAction<string>) => {
      state.downloadProgress = action.payload;
    },
    setDownloaded: (state, action: PayloadAction<string>) => {
      state.downloaded = action.payload;
    },
    setEstimatedTime: (state, action: PayloadAction<string>) => {
      state.estimatedTime = action.payload;
    },
    setDownloadFolderPath: (state, action: PayloadAction<string>) => {
      state.downloadFolderPath = action.payload;
    },
  },
});

export const {
  setUrl,
  setCurrentResolution,
  setDownloadFolderPath,
  setDownloadProgress,
  setDownloaded,
  setEstimatedTime,
  setImageUrl,
  setLoadingThumbnail,
  setResolutionArray,
  setValidUrl,
  setVideoTitle,
} = appSlice.actions;

export const selectUrl = (state: RootState) => state.app.url;
export const selectImageUrl = (state: RootState) => state.app.imageUrl;
export const selectResolutionArray = (state: RootState) =>
  state.app.resolutionArray;
export const selectCurrentResolution = (state: RootState) =>
  state.app.currentResolution;
export const selectVideoTitle = (state: RootState) => state.app.videoTitle;
export const selectLoadingThumbnail = (state: RootState) =>
  state.app.loadingThumbnail;
export const selectValidUrl = (state: RootState) => state.app.validUrl;
export const selectDownloadProgress = (state: RootState) =>
  state.app.downloadProgress;
export const selectDownloaded = (state: RootState) => state.app.downloaded;
export const selectEstimatedTime = (state: RootState) =>
  state.app.estimatedTime;
export const selectDownloadFolderPath = (state: RootState) =>
  state.app.downloadFolderPath;

export default appSlice.reducer;
