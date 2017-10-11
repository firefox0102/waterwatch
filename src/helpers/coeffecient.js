export const matrix = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14.1, 15.1, 16.1, 17.1, 18.1, 19.1, 20.2, 21.2, 22.2, 23.3, 24.3, 25.3, 26.4, 27.4, 28.4, 29.5, 30.5, 31.5, 32.6, 33.6, 34.7, 35.7, 36.8, 37.8, 38.9, 40, 41, 42.1, 43.1, 44.2, 45.3, 46.3, 47.4, 48.5, 49.5],
  [1, 2, 3, 4, 5, 6, 7.1, 8.1, 9.1, 10.1, 11.1, 12.1, 13.2, 14.2, 15.2, 16.2, 17.3, 18.3, 19.3, 20.4, 21.4, 22.4, 23.5, 24.5, 25.6, 26.6, 27.7, 28.7, 29.8, 30.8, 31.9, 32.9, 34, 35, 36.1, 37.2, 38.2, 39.3, 40.4, 41.4, 42.5, 43.6, 44.7, 45.7, 46.8, 47.9, 49, 50.1, 51.2],
  [2, 3, 4.1, 5.1, 6.1, 7.1, 8.1, 9.2, 10.2, 11.2, 12.2, 13.3, 14.3, 15.4, 16.4, 17.4, 18.5, 19.5, 20.6, 21.6, 22.7, 23.7, 24.8, 25.8, 26.9, 27.9, 29, 30, 31.1, 32.2, 33.2, 34.3, 35.4, 36.5, 37.5, 38.6, 39.7, 40.8, 41.9, 43, 44, 45.1, 46.2, 47.3, 48.4, 49.5, 50.6, 51.7, 52.8],
  [3.1, 4.1, 5.1, 6.1, 7.2, 8.2, 9.2, 10.3, 11.3, 12.4, 13.4, 14.5, 15.5, 16.5, 17.6, 18.6, 19.7, 20.8, 21.8, 22.9, 23.9, 25, 26.1, 27.1, 28.2, 29.3, 30.4, 31.4, 32.5, 33.6, 34.7, 35.8, 36.8, 37.9, 39, 40.1, 41.2, 42.3, 43.4, 44.5, 45.6, 46.7, 47.8, 48.9, 50, 51.2, 52.3, 53.4, 54.5],
  [4.1, 5.2, 6.2, 7.2, 8.3, 9.3, 10.4, 11.4, 12.5, 13.5, 14.6, 15.6, 16.7, 17.8, 18.8, 19.9, 21, 22, 23.1, 24.2, 25.3, 26.3, 27.4, 28.5, 29.6, 30.7, 31.8, 32.8, 33.9, 35, 36.1, 37.2, 38.3, 39.4, 40.5, 41.6, 42.8, 43.9, 45, 46.1, 47.2, 48.3, 49.5, 50.6, 51.7, 52.9, 54, 55.1, 56.3],
  [5.2, 6.3, 7.3, 8.4, 9.4, 10.5, 11.5, 12.6, 13.7, 14.7, 15.8, 16.9, 17.9, 19, 20.1, 21.2, 22.2, 23.3, 24.4, 25.5, 26.6, 27.7, 28.8, 29.9, 31, 32.1, 33.2, 34.3, 35.4, 36.5, 37.6, 38.7, 39.9, 41, 42.1, 43.2, 44.4, 45.5, 46.6, 47.7, 48.9, 50, 51.2, 52.3, 53.5, 54.6, 55.8, 56.9, 58.1],
  [6.3, 7.4, 8.4, 9.5, 10.6, 11.6, 12.7, 13.8, 14.9, 16, 17, 18.1, 19.2, 20.3, 21.4, 22.5, 23.6, 24.7, 25.8, 26.9, 28, 29.1, 30.2, 31.3, 32.4, 33.5, 34.7, 35.8, 36.9, 38, 39.2, 40.3, 41.4, 42.6, 43.7, 44.8, 46, 47.1, 48.3, 49.4, 50.6, 51.7, 52.9, 54.1, 55.2, 56.4, 57.6, 58.7, 59.9],
  [7.5, 8.5, 9.6, 10.7, 11.8, 12.8, 13.9, 15, 16.1, 17.2, 18.3, 19.4, 20.5, 21.6, 22.7, 23.8, 24.9, 26, 27.1, 28.3, 29.4, 30.5, 31.6, 32.8, 33.9, 35, 36.2, 37.3, 38.4, 39.6, 40.7, 41.9, 43, 44.2, 45.3, 46.5, 47.7, 48.8, 50, 51.2, 52.3, 53.5, 54.7, 55.9, 57.1, 58.3, 59.4, 60.6, 61.8],
  [8.6, 9.7, 10.8, 11.9, 13, 14.1, 15.2, 16.3, 17.4, 18.5, 19.6, 20.7, 21.8, 22.9, 24.1, 25.2, 26.3, 27.4, 28.6, 29.7, 30.8, 32, 33.1, 34.3, 35.4, 36.6, 37.7, 38.9, 40, 41.2, 42.3, 43.5, 44.7, 45.9, 47, 48.2, 49.4, 50.6, 51.8, 53, 54.1, 55.3, 56.5, 57.7, 59, 60.2, 61.4, 62.6, 63.8],
  [9.8, 10.9, 12, 13.1, 14.2, 15.3, 16.4, 17.6, 18.7, 19.8, 20.9, 22, 23.2, 24.3, 25.4, 26.6, 27.7, 28.9, 30, 31.2, 32.3, 33.5, 34.6, 35.8, 37, 38.1, 39.3, 40.5, 41.6, 42.8, 44, 45.2, 46.4, 47.6, 48.8, 50, 51.2, 52.4, 53.6, 54.8, 56, 57.2, 58.4, 59.7, 60.9, 62.1, 63.4, 64.6, 65.8],
  [11, 12.1, 13.2, 14.4, 15.5, 16.6, 17.7, 18.9, 20, 21.1, 22.3, 23.4, 24.6, 25.7, 26.9, 28, 29.2, 30.3, 31.5, 32.7, 33.8, 35, 36.2, 37.4, 38.6, 39.7, 40.9, 42.1, 43.3, 44.5, 45.7, 46.9, 48.1, 49.3, 50.6, 51.8, 53, 54.2, 55.5, 56.7, 57.9, 59.2, 60.4, 61.7, 62.9, 64.2, 65.4, 66.7, 67.9],
  [12.2, 13.4, 14.5, 15.6, 16.8, 17.9, 19.1, 20.2, 21.4, 22.5, 23.7, 24.8, 26, 27.2, 28.3, 29.5, 30.7, 31.9, 33, 34.2, 35.4, 36.6, 37.8, 39, 40.2, 41.4, 42.6, 43.8, 45, 46.3, 47.5, 48.7, 49.9, 51.2, 52.4, 53.7, 54.9, 56.1, 57.4, 58.6, 59.9, 61.2, 62.4, 63.7, 65, 66.3, 67.5, 68.8, 70.1],
  [13.5, 14.6, 15.8, 16.9, 18.1, 19.3, 20.4, 21.6, 22.8, 23.9, 25.1, 26.3, 27.5, 28.6, 29.8, 31, 32.2, 33.4, 34.6, 35.8, 37, 38.2, 39.5, 40.7, 41.9, 43.1, 44.3, 45.6, 46.8, 48.1, 49.3, 50.6, 51.8, 53.1, 54.3, 55.6, 56.8, 58.1, 59.4, 60.7, 62, 63.2, 64.5, 65.8, 67.1, 68.4, 69.7, 71, 72.4],
  [14.8, 16, 17.1, 18.3, 19.5, 20.6, 21.8, 23, 24.2, 25.4, 26.6, 27.8, 29, 30.2, 31.4, 32.6, 33.8, 35, 36.2, 37.5, 38.7, 39.9, 41.2, 42.4, 43.6, 44.9, 46.1, 47.4, 48.6, 49.9, 51.2, 52.5, 53.7, 55, 56.3, 57.6, 58.9, 60.2, 61.5, 62.8, 64.1, 65.4, 66.7, 68, 69.3, 70.7, 72, 73.3, 74.7],
  [16.1, 17.3, 18.5, 19.7, 20.9, 22.1, 23.3, 24.5, 25.7, 26.9, 28.1, 29.3, 30.5, 31.7, 33, 34.2, 35.4, 36.7, 37.9, 39.1, 40.4, 41.6, 42.9, 44.2, 45.4, 46.7, 48, 49.3, 50.5, 51.8, 53.1, 54.4, 55.7, 57, 58.3, 59.6, 60.9, 62.3, 63.6, 64.9, 66.3, 67.6, 68.9, 70.3, 71.6, 73, 74.4, 75.7, 77.1],
  [17.5, 18.7, 19.9, 21.1, 22.3, 23.5, 24.7, 25.9, 27.2, 28.4, 29.6, 30.9, 32.1, 33.3, 34.6, 35.8, 37.1, 38.4, 39.6, 40.9, 42.2, 43.4, 44.7, 46, 47.3, 48.6, 49.9, 51.2, 52.5, 53.8, 55.1, 56.4, 57.8, 59.1, 60.4, 61.8, 63.1, 64.5, 65.8, 67.2, 68.5, 69.9, 71.3, 72.6, 74, 75.4, 76.8, 78.2, 79.6],
  [18.9, 20.1, 21.3, 22.6, 23.8, 25, 26.2, 27.5, 28.7, 30, 31.2, 32.5, 33.7, 35, 36.3, 37.5, 38.8, 40.1, 41.4, 42.7, 44, 45.3, 46.6, 47.9, 49.2, 50.5, 51.8, 53.2, 54.5, 55.8, 57.2, 58.5, 59.9, 61.2, 62.6, 64, 65.3, 66.7, 68.1, 69.5, 70.9, 72.3, 73.7, 75.1, 76.5, 77.9, 79.3, 80.8, 82.2],
  [20.3, 21.6, 22.8, 24.1, 25.3, 26.6, 27.8, 29.1, 30.3, 31.6, 32.9, 34.1, 35.4, 36.7, 38, 39.3, 40.6, 41.9, 43.2, 44.5, 45.9, 47.2, 48.5, 49.8, 51.2, 52.5, 53.9, 55.2, 56.6, 58, 59.3, 60.7, 62.1, 63.5, 64.9, 66.3, 67.7, 69.1, 70.5, 71.9, 73.3, 74.8, 76.2, 77.6, 79.1, 80.5, 82, 83.5, 84.9],
  [21.8, 23.1, 24.3, 25.6, 26.9, 28.1, 29.4, 30.7, 32, 33.3, 34.6, 35.9, 37.2, 38.5, 39.8, 41.1, 42.4, 43.8, 45.1, 46.5, 47.8, 49.2, 50.5, 51.9, 53.2, 54.6, 56, 57.4, 58.8, 60.2, 61.6, 63, 64.4, 65.8, 67.2, 68.6, 70.1, 71.5, 73, 74.4, 75.9, 77.3, 78.8, 80.3, 81.8, 83.3, 84.8, 86.3, 87.8],
  [23.3, 24.6, 25.9, 27.2, 28.5, 29.8, 31.1, 32.4, 33.7, 35, 36.3, 37.6, 39, 40.3, 41.6, 43, 44.3, 45.7, 47.1, 48.4, 49.8, 51.2, 52.6, 54, 55.4, 56.8, 58.2, 59.6, 61, 62.4, 63.9, 65.3, 66.8, 68.2, 69.7, 71.1, 72.6, 74.1, 75.5, 77, 78.5, 80, 81.5, 83.1, 84.6, 86.1, 87.6, 89.2, 90.7],
  [24.9, 26.2, 27.5, 28.8, 30.1, 31.5, 32.8, 34.1, 35.4, 36.8, 38.1, 39.5, 40.8, 42.2, 43.6, 44.9, 46.3, 47.7, 49.1, 50.5, 51.9, 53.3, 54.7, 56.1, 57.6, 59, 60.4, 61.9, 63.3, 64.8, 66.3, 67.7, 69.2, 70.7, 72.2, 73.7, 75.2, 76.7, 78.2, 79.8, 81.3, 82.8, 84.4, 85.9, 87.5, 89.1, 90.7, 92.2, 93.8],
  [26.5, 27.9, 29.2, 30.5, 31.8, 33.2, 34.5, 35.9, 37.3, 38.6, 40, 41.4, 42.8, 44.1, 45.5, 46.9, 48.4, 49.8, 51.2, 52.6, 54.1, 55.5, 56.9, 58.4, 59.9, 61.3, 62.8, 64.3, 65.8, 67.3, 68.8, 70.3, 71.8, 73.3, 74.9, 76.4, 77.9, 79.5, 81.1, 82.6, 84.2, 85.8, 87.4, 89, 90.6, 92.2, 93.8, 95.4, 97.1],
  [28.2, 29.5, 30.9, 32.3, 33.6, 35, 36.4, 37.7, 39.1, 40.5, 41.9, 43.3, 44.8, 46.2, 47.6, 49, 50.5, 51.9, 53.4, 54.8, 56.3, 57.8, 59.3, 60.8, 62.3, 63.8, 65.3, 66.8, 68.3, 69.8, 71.4, 72.9, 74.5, 76.1, 77.6, 79.2, 80.8, 82.4, 84, 85.6, 87.2, 88.9, 90.5, 92.1, 93.8, 95.5, 97.1, 98.8, 100.5],
  [29.9, 31.3, 32.7, 34.1, 35.5, 36.8, 38.3, 39.7, 41.1, 42.5, 43.9, 45.4, 46.8, 48.3, 49.7, 51.2, 52.7, 54.2, 55.6, 57.1, 58.6, 60.2, 61.7, 63.2, 64.7, 66.3, 67.8, 69.4, 71, 72.5, 74.1, 75.7, 77.3, 78.9, 80.5, 82.2, 83.8, 85.4, 87.1, 88.7, 90.4, 92.1, 93.8, 95.5, 97.2, 98.9, 100.6, 102.4, 104.1],
  [31.7, 33.1, 34.5, 35.9, 37.3, 38.8, 40.2, 41.7, 43.1, 44.6, 46, 47.5, 49, 50.5, 52, 53.5, 55, 56.5, 58, 59.5, 61.1, 62.6, 64.2, 65.8, 67.3, 68.9, 70.5, 72.1, 73.7, 75.3, 77, 78.6, 80.3, 81.9, 83.6, 85.2, 86.9, 88.6, 90.3, 92, 93.8, 95.5, 97.2, 99, 100.7, 102.5, 104.3, 106.1, 107.9],
  [33.6, 35, 36.4, 37.9, 39.3, 40.8, 42.2, 43.7, 45.2, 46.7, 48.2, 49.7, 51.2, 52.7, 54.3, 55.8, 57.3, 58.9, 60.5, 62, 63.6, 65.2, 66.8, 68.4, 70, 71.7, 73.3, 75, 76.6, 78.3, 80, 81.7, 83.3, 85.1, 86.8, 88.5, 90.2, 92, 93.7, 95.5, 97.3, 99.1, 100.9, 102.7, 104.5, 106.3, 108.2, 110, 111.9],
  [35.5, 36.9, 38.4, 39.9, 41.4, 42.8, 44.3, 45.9, 47.4, 48.9, 50.4, 52, 53.5, 55.1, 56.7, 58.2, 59.8, 61.4, 63, 64.7, 66.3, 67.9, 69.6, 71.2, 72.9, 74.6, 76.3, 78, 79.7, 81.4, 83.1, 84.8, 86.6, 88.4, 90.1, 91.9, 93.7, 95.5, 97.3, 99.2, 101, 102.9, 104.7, 106.6, 108.5, 110.4, 112.3, 114.2, 116.2],
  [37.4, 38.9, 40.4, 42, 43.5, 45, 46.5, 48.1, 49.6, 51.2, 52.8, 54.4, 56, 57.6, 59.2, 60.8, 62.4, 64.1, 65.7, 67.4, 69.1, 70.8, 72.5, 74.2, 75.9, 77.6, 79.4, 81.1, 82.9, 84.6, 86.4, 88.2, 90, 91.9, 93.7, 95.5, 97.4, 99.3, 101.2, 103.1, 105, 106.9, 108.8, 110.8, 112.7, 114.7, 116.7, 118.7, 120.7],
  [39.5, 41, 42.6, 44.1, 45.7, 47.3, 48.8, 50.4, 52, 53.6, 55.2, 56.9, 58.5, 60.2, 61.8, 63.5, 65.2, 66.9, 68.6, 70.3, 72, 73.7, 75.5, 77.3, 79, 80.8, 82.6, 84.4, 86.3, 88.1, 89.9, 91.8, 93.7, 95.6, 97.5, 99.4, 101.3, 103.3, 105.2, 107.2, 109.2, 111.2, 113.2, 115.2, 117.3, 119.3, 121.4, 123.5, 125.6],
  [41.7, 43.2, 44.8, 46.4, 48, 49.6, 51.2, 52.8, 54.5, 56.1, 57.8, 59.5, 61.2, 62.9, 64.6, 66.3, 68, 69.8, 71.5, 73.3, 75.1, 76.9, 78.7, 80.5, 82.4, 84.2, 86.1, 87.9, 89.8, 91.7, 93.7, 95.6, 97.5, 99.5, 101.5, 103.5, 105.5, 107.5, 109.5, 111.6, 113.7, 115.7, 117.8, 120, 122.1, 124.2, 126.4, 128.6, 130.8],
  [43.9, 45.5, 47.1, 48.7, 50.4, 52, 53.7, 55.4, 57.1, 58.8, 60.5, 62.2, 64, 65.7, 67.5, 69.3, 71, 72.9, 74.7, 76.5, 78.3, 80.2, 82.1, 84, 85.9, 87.8, 89.7, 91.7, 93.6, 95.6, 97.6, 99.6, 101.6, 103.7, 105.7, 107.8, 109.9, 112, 114.2, 116.3, 118.5, 120.6, 122.8, 125.1, 127.3, 129.5, 131.8, 134.1, 136.4],
  [46.2, 47.9, 49.5, 51.2, 52.9, 54.6, 56.3, 58.1, 59.8, 61.6, 63.3, 65.1, 66.9, 68.7, 70.5, 72.4, 74.2, 76.1, 78, 79.9, 81.8, 83.7, 85.7, 87.6, 89.6, 91.6, 93.6, 95.6, 97.7, 99.7, 101.8, 103.9, 106, 108.2, 110.3, 112.5, 114.7, 116.9, 119.1, 121.4, 123.6, 125.9, 128.2, 130.5, 132.9, 135.3, 137.7, 140.1, 142.5],
  [48.7, 50.4, 52.1, 53.8, 55.6, 57.3, 59.1, 60.9, 62.7, 64.5, 66.3, 68.2, 70, 71.9, 73.8, 75.7, 77.6, 79.5, 81.5, 83.5, 85.4, 87.5, 89.5, 91.5, 93.6, 95.7, 97.8, 99.9, 102, 104.2, 106.3, 108.5, 110.7, 113, 115.2, 117.5, 119.8, 122.1, 124.5, 126.8, 129.2, 131.6, 134, 136.5, 139, 141.5, 144, 146.6, 149.1],
  [51.2, 53, 54.8, 56.5, 58.3, 60.2, 62, 63.8, 65.7, 67.6, 69.5, 71.4, 73.3, 75.2, 77.2, 79.2, 81.2, 83.2, 85.2, 87.3, 89.3, 91.4, 93.6, 95.7, 97.8, 100, 102.2, 104.4, 106.6, 108.9, 111.2, 113.5, 115.8, 118.2, 120.5, 122.9, 125.4, 127.8, 130.3, 132.8, 135.3, 137.8, 140.4, 143, 145.6, 148.3, 150.9, 153.7, 156.4],
  [53.9, 55.7, 57.6, 59.4, 61.3, 63.1, 65, 67, 68.9, 70.8, 72.8, 74.8, 76.8, 78.8, 80.8, 82.9, 85, 87.1, 89.2, 91.4, 93.5, 95.7, 97.9, 100.2, 102.4, 104.7, 107, 109.3, 111.7, 114, 116.4, 118.9, 121.3, 123.8, 126.3, 128.8, 131.4, 134, 136.6, 139.2, 141.9, 144.6, 147.4, 150.1, 152.9, 155.7, 158.6, 161.5, 164.4],
  [56.8, 58.6, 60.5, 62.4, 64.4, 66.3, 68.3, 70.3, 72.3, 74.3, 76.3, 78.4, 80.5, 82.6, 84.7, 86.9, 89.1, 91.3, 93.5, 95.7, 98, 100.3, 102.6, 105, 107.3, 109.7, 112.2, 114.6, 117.1, 119.6, 122.2, 124.7, 127.3, 129.9, 132.6, 135.3, 138, 140.8, 143.6, 146.4, 149.2, 152.1, 155, 158, 161, 164, 167.1, 170.2, 173.3],
  [59.8, 61.7, 63.7, 65.7, 67.7, 69.7, 71.7, 73.8, 75.9, 78, 80.1, 82.3, 84.5, 86.7, 88.9, 91.2, 93.5, 95.8, 98.1, 100.5, 102.9, 105.3, 107.7, 110.2, 112.7, 115.2, 117.8, 120.4, 123, 125.7, 128.4, 131.1, 133.9, 136.7, 139.5, 142.4, 145.3, 148.3, 151.3, 154.3, 157.3, 160.5, 163.6, 166.8, 170, 173.3, 176.6, 179.9, 183.3],
  [62.9, 65, 67, 69.1, 71.2, 73.3, 75.4, 77.6, 79.8, 82, 84.2, 86.5, 88.8, 91.1, 93.4, 95.8, 98.2, 100.6, 103.1, 105.6, 108.1, 110.7, 113.3, 115.9, 118.6, 121.3, 124, 126.8, 129.6, 132.4, 135.3, 138.2, 141.2, 144.2, 147.3, 150.3, 153.5, 156.7, 159.9, 163.1, 166.5, 169.8, 173.2, 176.7, 180.2, 183.7, 187.3, 191, 194.7],
  [66.3, 68.4, 70.6, 72.7, 74.9, 77.1, 79.4, 81.6, 83.9, 86.2, 88.6, 91, 93.4, 95.8, 98.3, 100.8, 103.4, 105.9, 108.6, 111.2, 113.9, 116.6, 119.4, 122.2, 125, 127.9, 130.8, 133.8, 136.8, 139.9, 143, 146.2, 149.4, 152.6, 155.9, 159.2, 162.6, 166.1, 169.6, 173.2, 176.8, 180.4, 184.2, 188, 191.8, 195.7, 199.7, 203.7, 207.7],
  [70, 72.2, 74.4, 76.7, 78.9, 81.3, 83.6, 86, 88.4, 90.9, 93.4, 95.9, 98.4, 101, 103.6, 106.3, 109, 111.8, 114.6, 117.4, 120.3, 123.2, 126.1, 129.2, 132.2, 135.3, 138.5, 141.7, 145, 148.3, 151.7, 155.1, 158.6, 162.1, 165.7, 169.4, 173.1, 176.9, 180.7, 184.7, 188.7, 192.7, 196.8, 201, 205.3, 209.6, 214, 218.5, 223],
  [73.8, 76.2, 78.5, 80.9, 83.3, 85.7, 88.2, 90.8, 93.3, 95.9, 98.5, 101.2, 103.9, 106.7, 109.5, 112.4, 115.3, 118.2, 121.2, 124.3, 127.4, 130.5, 133.7, 137, 140.3, 143.7, 147.1, 150.6, 154.2, 157.8, 161.5, 165.3, 169.1, 173, 177, 181.1, 185.2, 189.4, 193.7, 198.1, 202.5, 207.1, 211.7, 216.4, 221.1, 226, 231, 236, 241.1],
  [78, 80.5, 83, 85.5, 88, 90.6, 93.3, 95.9, 98.7, 101.4, 104.3, 107.1, 110, 113, 116, 119.1, 122.2, 125.4, 128.7, 132, 135.4, 138.8, 142.3, 145.9, 149.5, 153.2, 157, 160.9, 164.8, 168.9, 173, 177.2, 181.5, 185.8, 190.3, 194.8, 199.5, 204.2, 209.1, 214, 219.1, 224.2, 229.4, 234.8, 240.2, 245.8, 251.5, 257.2, 263.1],
  [82.6, 85.2, 87.8, 90.5, 93.2, 96, 98.8, 101.7, 104.6, 107.6, 110.6, 113.7, 116.9, 120.1, 123.4, 126.7, 130.1, 133.6, 137.2, 140.8, 144.5, 148.3, 152.2, 156.1, 160.2, 164.3, 168.6, 172.9, 177.3, 181.9, 186.5, 191.3, 196.1, 201.1, 206.2, 211.4, 216.7, 222.2, 227.7, 233.4, 239.2, 245.2, 251.3, 257.5, 263.8, 270.3, 276.9, 283.6, 290.5],
  [87.6, 90.4, 93.2, 96, 99, 101.9, 105, 108.1, 111.2, 114.5, 117.8, 121.1, 124.6, 128.1, 131.7, 135.4, 139.1, 143, 147, 151, 155.2, 159.4, 163.8, 168.2, 172.8, 177.5, 182.3, 187.3, 192.4, 197.6, 202.9, 208.4, 214, 219.8, 225.8, 231.8, 238.1, 244.5, 251, 257.7, 264.6, 271.7, 278.9, 286.3, 293.8, 301.5, 309.4, 317.4, 325.7],
  [93.1, 96.1, 99.1, 102.2, 105.4, 108.6, 111.9, 115.3, 118.7, 122.3, 125.9, 129.6, 133.4, 137.4, 141.4, 145.5, 149.7, 154.1, 158.5, 163.1, 167.9, 172.7, 177.7, 182.9, 188.2, 193.6, 199.3, 205.1, 211, 217.2, 223.5, 230, 236.7, 243.6, 250.8, 258.1, 265.6, 273.3, 281.2, 289.4, 297.8, 306.3, 315.1, 324.1, 333.3, 342.8, 352.4, 362.3, 372.4],
  [99.3, 102.5, 105.8, 109.2, 112.6, 116.2, 119.8, 123.6, 127.4, 131.4, 135.4, 139.6, 143.9, 148.3, 152.9, 157.6, 162.4, 167.4, 172.6, 178, 183.5, 189.2, 195.1, 201.2, 207.5, 214.1, 220.9, 227.9, 235.2, 242.7, 250.4, 258.4, 266.7, 275.3, 284.1, 293.3, 302.6, 312.3, 322.3, 332.5, 343, 353.8, 364.9, 376.2, 387.9, 399.8, 412, 424.5, 437.4],
  [106.3, 109.8, 113.4, 117.2, 121, 125, 129.1, 133.3, 137.6, 142.1, 146.7, 151.5, 156.5, 161.6, 167, 172.5, 178.2, 184.2, 190.4, 196.8, 203.5, 210.5, 217.8, 225.4, 233.3, 241.5, 250, 258.9, 268.2, 277.8, 287.8, 298.1, 308.8, 319.9, 331.4, 343.3, 355.5, 368.1, 381.1, 394.5, 408.3, 422.5, 437.1, 452, 467.4, 483.3, 499.6, 516.3, 533.5],
  [114.3, 118.3, 122.4, 126.6, 130.9, 135.4, 140.1, 145, 150, 155.3, 160.7, 166.4, 172.3, 178.5, 185, 191.8, 198.9, 206.4, 214.2, 222.4, 231, 240, 249.5, 259.5, 270, 280.9, 292.4, 304.4, 316.9, 330, 343.6, 357.8, 372.5, 387.7, 403.4, 419.8, 436.6, 454.1, 472.1, 490.7, 509.9, 529.8, 550.4, 571.7, 593.8, 616.7, 640.5, 665.3, 691],
  [123.9, 128.4, 133.1, 137.9, 143, 148.3, 153.9, 159.7, 165.8, 172.2, 178.9, 186, 193.5, 201.4, 209.8, 218.7, 228.2, 238.2, 248.9, 260.3, 272.3, 285.1, 298.7, 313, 328.2, 344.1, 360.9, 378.4, 396.8, 416, 436, 456.9, 478.6, 501.2, 524.7, 549.3, 574.8, 601.5, 629.4, 658.6, 689.3, 721.5, 755.6, 791.5, 829.7, 870.4, 913.9, 960.6, 1011.2],
  [135.5, 140.8, 146.4, 152.3, 158.5, 165, 172, 179.3, 187.2, 195.6, 204.6, 214.3, 224.7, 235.9, 248.1, 261.3, 275.5, 290.9, 307.6, 325.5, 344.8, 365.4, 387.3, 410.6, 435.2, 461.1, 488.4, 517.2, 547.5, 579.4, 613.1, 648.8, 686.7, 727, 770.1, 816.4, 866.4, 920.8, 980.4, 1046.2, 1119.9, 1203.3, 1299.7, 1413.6, 1553.1, 1732.9, 1986.3, 2419.6, 2420]
]